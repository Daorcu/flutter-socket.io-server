const { io } = require('../index');
const Band = require('../models/band');

const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'ACDC') );
bands.addBand( new Band( 'Queen') );
bands.addBand( new Band( 'Enrique Bunbury') );
bands.addBand( new Band( 'Muse') );
bands.addBand( new Band( 'Bon Jovi') );
bands.addBand( new Band( 'Roxete') );



// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    });

    client.on('vote-band', ( payload ) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', ( payload ) => {
        const newBand = new Band( payload.name);
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', ( payload ) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', ( payload ) => {
    //     console.log(payload)
    //     // Emitir a todos los clientes
    //     // io.emit('nuevo-mensaje', payload );
    //     // Emitir a todos los clientes menos al que emitió el mensaje
    //     client.broadcast.emit('nuevo-mensaje', payload );
    // })
});
