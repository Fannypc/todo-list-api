const express = require('express');
const { createTask, readTasks, readTaskById, updateTask, deleteTask } = require('../controllers/task')

const router = express.Router();

router.post('/api/v1/tasks', createTask);
router.get('/api/v1/tasks', readTasks);
router.get('/api/v1/tasks/:id', readTaskById);
router.put('/api/v1/tasks/:id', updateTask);
router.delete('/api/v1/tasks/:id', deleteTask);

//export default
module.exports = router;