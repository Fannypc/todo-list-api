const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async(request, response)=>{
    const {errors, isValid} = validate(request.body);


    if (isValid){
        const {email, password} = request.body;
        let user = await User.findOne({where: {email}});
    
        if(!user){
            response.status(401).json({errors: {message: "Credenciales incorrectas"}});
        }

        // compare passwords
        const correct = await bcrypt.compare(password, user.password);
        if (!correct){
            response.status(401).json({errors: {message: "Credenciales incorrectas"}});
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
                    // expiresIn:'1h'
                    expiresIn:'365d'
                }
            );
            response.json({message: "Has iniciado sesion correctamente", user, token});
        }
    }else{
        response.status(400).json({errors});
    }
}

const logout = (req, res) => {
    res
        .json({message: "Cerrando sesión..."});
}

const register = async(request, response)=>{
    let {first_name, last_name, email, password} = request.body;
    // encrypt the password with bcryptjs
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
        );
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
                // expiresIn:'365d'
            }
        );
        response.json({message:'Usuario creado', user, token});
    }catch(error){
        console.log(error);
        response.status(400).json({errors: {message:'Error al intentar crear el usuario'}});
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

function validate(data){
    let errors={};
        if (data.email === '') errors.email = "Informar campo"
        if (data.password === '') errors.password = "Informar campo"
        const isValid = Object.keys(errors).length === 0
        return {errors, isValid};
}


module.exports = {
    login,
    logout,
    register
}