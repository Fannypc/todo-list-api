const {Task, Status} = require('../models');


const createTask = async(request, response)=> {
    let {content, due_date, user_id, status_id} = request.body;

    try{
        const task = await Task.create(
            {
                content,
                due_date,
                user_id,
                status_id,
                created_at: new Date(),
                updated_at: new Date()
            }
        );
        task.setDataValue('status', await task.getStatus());
        response.json({task});
    }catch(error){
        console.log(error);
        response.status(400).json({message:'Error'});
    }
}

const readTasks = async(request, response)=> {
    const tasks = await Task.findAll();
    response.json(tasks);
}

const readTaskById = async(request, response)=> {
    const taskId = request.params.id;

    const task = await Task.findOne(
        {
            where: {
                id: taskId
            }
        });
    
    if(task){
        response.json(task);
    }else{
        response.status(400).json({message:'Error'});
    }
}

const updateTask = async(request, response)=>{
    let taskId = request.params.id;
    let {content, due_date, status_id, user_id} = request.body;
    try{
        const tasks = await Task.update({
            content,
            due_date,
            status_id,
            user_id,
            updated_at: new Date()
        }, { returning: true, plain: true, where: {id: taskId} });

        const task = await Task.findOne(
            {
                where: {
                    id: tasks[1].dataValues.id
                },
                include: [{
                    model: Status,
                    as: 'status',
                    required: false,
                    attributes: ['id', 'name']
                }]
            });
        response.json(task);
    }catch(error){
        console.log(error);
        response.status(400).json({message:'Error'});
    }
}

const deleteTask = async(request, response)=>{
    taskId = request.params.id;

    try{
        let task = await Task.findOne({
            where: {
                id: taskId
            }
        });

        if (task){
            await Task.destroy({
                where: {
                    id: taskId
                } 
            });
            response.json({message: "Se ha eliminado la tarea", task});
        }else{
            response.status(400).json({message: "No se ha podido eliminar la tarea"});
        }
    }catch (error){
        response.status(400).json({message: "No se ha podido eliminar la tarea"});
    }
}

module.exports = {
    createTask,
    readTasks,
    readTaskById,
    updateTask,
    deleteTask
}