const jwt = require('jsonwebtoken');

// validate user token
const validateToken = (request, response, next) => {

    const token = request.cookies.access_token;
    console.log(token);
    if(token){
        try {
            request['token'] = token;
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            request['decoded'] = decoded;
            // if token can be decoded then user is valid
            if(decoded){
                next();
            }
        } catch(err) {
            console.log(err);
            response.status(401).json({message: "El token es invalido"})
        }
    }else{
        response.status(401).json({message: "El token es invalido"})
    }
}

module.exports = validateToken;