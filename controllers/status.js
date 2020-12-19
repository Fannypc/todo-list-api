const {Status} = require('../models');

const readStatus = async(request, response)=> {
    const status = await Status.findAll();
    response.json(status);
}


module.exports = {
    readStatus
}