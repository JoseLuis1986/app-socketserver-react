//Servidor de Express
const express = require('express');
//Servidor de Sockets
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Http Server
        this.server = http.createServer(this.app);

        //Configuraciones de Socket
        this.io = socketIo(this.server, { /*  */ });
    }

    middlewares() {
        //Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public' )) );

        //CORS
        this.app.use( cors() );

    }

    configureSockets() {
    
        new Sockets( this.io );
    }

    execute() {
        //inicializar middlewares
        this.middlewares();

        this.configureSockets();

        //iniciar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto', this.port);
        });
    }
}


module.exports = Server;