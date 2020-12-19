const express = require('express');
const {login, logout, register} = require('../controllers/auth');

const router = express.Router();

router.post('/api/v1/login', login);
router.post('/api/v1/logout', logout);
router.post('/api/v1/register', register)

//export default
module.exports = router;