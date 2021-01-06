const {User, Task, Status} = require('../models');
const bcrypt = require('bcryptjs');

const readUsers = async(request, response)=> {
    const users = await User.findAll();
    response.json(users);
}

const readUserById = async(request, response)=> {
    const userId = request.params.id;

    const user = await User.findOne(
        {
            where: {
                id: userId
            }
        });
    
    if(user){
        response.json(user);
    }else{
        response.status(400).json({message:'Error'});
    }
}

const userTasks = async(request, response) => {
    const userId = request.params.id;
    const users = await User.findOne({
        where: {
            id: userId, 
        },
        order: [[{model: Task, as: 'tasks'},'due_date', 'ASC']],
        attributes: ['first_name'],
        /*
            you can also include or exclude in attributes
            attributes: {
                include: [],
                exclude: []
            } 
        */
        include: [{
            model: Task,
            as: 'tasks',
            required: false,
            // attributes: ['id', 'content', 'due_date'],
            include: [{
                model: Status,
                as: 'status',
                required: false,
                attributes: ['id', 'name']
            }]
        }],
    });

    if(users){
        /* to return just tasks 
            console.log(users.dataValues.tasks);
        */
        response.json({ user: users })
    }else{
        response.status(400).json({message:'Error'});
    }

}


const updateUser = async(request, response)=>{
    let userId = request.params.id;
    let {first_name, last_name, email, password, active, token} = request.body;
    try{
        const users = await User.update({
            first_name,
            last_name,
            email,
            password,
            active,
            token,
            updated_at: new Date()
        }, { returning: true, where: {id: userId} });
        const user = users[1][0].dataValues;
        response.json(user);
    }catch(error){
        response.status(400).json({message:'Error'});
    }
}

const deleteUser = async(request, response)=>{
    let userId = request.params.id;
    let decoded = request.decoded;

    try {
        let user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (decoded.id !== Number(userId) && user){
            await User.update({
                active: false
            }, { 
                where: {
                    id: userId
                } 
            });
            response.json({message: "La cuenta ha sido desactivada"});
        }else{
            response.status(400).json({message: "No se ha podido desactivar la cuenta"});
        }
    }catch (error){
        response.status(400).json({message: "No se ha podido desactivar la cuenta"});
    }
}

module.exports = {
    readUsers,
    readUserById,
    userTasks,
    updateUser,
    deleteUser
}