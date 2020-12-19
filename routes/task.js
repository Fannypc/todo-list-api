const express = require('express');
const { readTasks, readTaskById } = require('../controllers/task')

const router = express.Router();

router.get('/api/v1/tasks', readTasks);
router.get('/api/v1/tasks/:id', readTaskById);

//export default
module.exports = router;