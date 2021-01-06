const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');


const login = async(request, response)=>{
    const {email, password} = request.body;
    let user = await User.findOne({where: {email}});
    // user exists
    if (user){
        // compare passwords
        bcrypt.compare(password, user.password, function(err,res){
            if(err || res === false ){
                response.status(401).json({message: "Credenciales incorrectas"});
            }else{
                const token = jwt.sign(
                    {
                        id: user.id, 
                        email: user.email, 
                        first_name: user.first_name,
                        last_name: user.last_name
                    }, 
                        process.env.JWT_SECRET, 
                    {
                        // expiresIn:'10m'
                        expiresIn:'1h'
                    }
                );
                response.cookie('access_token', token, {
                    expires: new Date(Date.now()+ 1 * 3600000), 
                    httpOnly:false
                }).json({message: "Has iniciado sesion correctamente", user});
            }
        });
    }else{
        response.status(401).json({message: "Credenciales incorrectas"});
    }
}

const logout = (req, res) => {
    res
        .clearCookie('access_token', {path: '/'})
        .json({message: "Cerrando sesión..."});
}

const register = async(request, response)=>{
    let {first_name, last_name, email, password} = request.body;
    /* encrypt the password with bcryptjs */
    const passwordEncrypted = bcrypt.hashSync(password, 10);

    try{
        const user = await User.create(
            {
                first_name,
                last_name,
                email,
                password: passwordEncrypted,
                active: true,
                token: generateToken(25),
                created_at: new Date(),
                updated_at: new Date()
            }   
        )
        response.json({message:'Usuario creado'});
    }catch(error){
        response.status(400).json({message:'Error'});
    }
}

const generateToken = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = {
    login,
    logout,
    register
}