const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            // Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands() );

            //Votar por la banda
            socket.on( 'vote-band', ( id ) => {
                //Incrementa los votos
                this.bandList.increaseVotes( id );
                //Emite nuevamente las bandas
                this.io.emit('current-bands', this.bandList.getBands() );
            });
        
            //Borrar la banda
            socket.on( 'remove-band', ( id ) => {
                //Borra la banda
                this.bandList.removeBand( id );
                //Emite nuevamente las bandas
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            //Cambiar el nombre de la banda
            socket.on( 'change-name', ({ id, name }) => {
                //Cambia el nombre
                this.bandList.changeName( id, name );
                //Emite nuevamente las bandas
                this.io.emit('current-bands', this.bandList.getBands() );
            });

            //Añade nueva banda
            socket.on( 'new-band', ({ name }) => {
                //Añade la banda
                this.bandList.addBand( name );
                //Emite nuevamente las bandas
                this.io.emit('current-bands', this.bandList.getBands() );
            });
            
        
        });
    }


}


module.exports = Sockets;