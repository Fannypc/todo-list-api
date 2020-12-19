const express = require('express');
const {readStatus} = require('../controllers/status');

const router = express.Router();

router.get('/api/v1/status', readStatus)

//export default
module.exports = router;