const EventEmitter = require('events');

//creamos instancia de eventEmitter
const emitter = new EventEmitter();

emitter.on('mensajeLog', (arg) => {
    const { id, url } = arg;
    //console.log('Listener llamado ID:', arg);
    console.log('Listener llamado ID:'+ id + ' URL:' + url);
});


const parameter = { id: 1, url: 'http://www.google.com' };


//emitter.emit('mensajeLog', { id: 1, url: 'http://www.google.com' });
emitter.emit('mensajeLog', parameter);  //pasamos el objeto como parametro





