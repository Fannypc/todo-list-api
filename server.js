const express = require('express'); // importing express
const validateToken = require('./middlewares/auth');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); // creating instance
const cookieParser = require('cookie-parser');

//Import Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const statusRouter = require('./routes/status');

//CORS middleware
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     next();
// }

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({credentials: true, origin: true}));
// app.use(allowCrossDomain);
app.use(cookieParser());

//Rutas de autenticación
app.use(authRouter);
//Proteger todas las rutas que estén después de este middleware
app.use(validateToken); 
app.use(userRouter); 
app.use(taskRouter);
app.use(statusRouter);

app.get('/', (request, response)=>{
    response.send("Hola mundo");
});

// Middleware that acts over any HTTP petition (GET, POST, DELETE, PUT)
app.use((req, res)=>{
    res.send('<h1>404</h1>')
});

module.exports = app;