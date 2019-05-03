const Server = require('./app')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.db1, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) {
        return console.log(`\n\nError al intentar conectarse a la base de datos:\n\n${err}`)
    }
    console.debug('Conectado correctamente a la base de datos')
    Server.start()
})
