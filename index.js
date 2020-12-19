const server = require('./server');

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => { // creating server in port 8000
    console.log("server iniciado en el puerto "+PORT);
})
