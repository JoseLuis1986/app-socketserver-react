

class Sockets {

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {

        //On connection
        this.io.on('connection', (socket) => {

            // socket.emit('mensaje-bienvenida', 'Bienvenido al server'); emitir el evento
            // socket.emit('mensaje-bienvenida', {
            //     msg: 'Bienvenido al server',
            //     fecha: new Date()
            // });
            // console.log(socket.id);

            //escuchar el evento: message-to-server
            socket.on('message-to-server', (data) => {
                console.log(data);

                this.io.emit('emit-from-server', data);
            });
        });

    }

}

module.exports = Sockets;