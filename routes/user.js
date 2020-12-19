const express = require('express');
const {
    readUsers,
    readUserById,
    userTasks,
    updateUser,
    deleteUser} = require('../controllers/user');
const router = express.Router();


router.get('/api/v1/users', readUsers);
router.get('/api/v1/users/:id', readUserById);
router.get('/api/v1/users/:id/tasks', userTasks);
router.put('/api/v1/users/:id', updateUser);
router.delete('/api/v1/users/:id', deleteUser);

//export default
module.exports = router;