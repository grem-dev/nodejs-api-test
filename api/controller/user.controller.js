const { createNewUser } = require('../services/index')

function createUser(data) {
    return new Promise((resolve, reject) => {
        if (!data.body.username) reject(new Error('No hay username'))

        // Llamo al servicio de usuario para crear uno nuevo|
        createNewUser(data.body)
            .then(user => {
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    }) // Termina la decaración de la promesa
}


module.exports = {
    createUser
};