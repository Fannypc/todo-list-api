const {Task} = require('../models');

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

module.exports = {
    readTasks,
    readTaskById
}