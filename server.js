const express = require('express'); // importing express
const validateToken = require('./middlewares/auth');
const morgan = require('morgan');
const cors = require('cors');
const app = express(); // creating instance
const cookieParser = require('cookie-parser');
const cool = require('cool-ascii-faces');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/db', async(req, res)=> {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = {'results': (result) ? result.rows: null};
        res.json({results});
        client.release();
    }catch(err){
        console.log(err);
        res.send('Error '+err);
    }
})

//Import Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const statusRouter = require('./routes/status');
const { sequelize } = require('./models');

//Middlewares
app.use(express.json());
app.get('/cool', (req, res) => res.send(cool()));
app.use(morgan('dev'));
app.use(cors({credentials: true, origin: true}));
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
    res.status(404).json({
        errors: {
            global: 'Algo salió mal'
        }
    })
});

module.exports = app;