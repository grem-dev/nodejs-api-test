const { makeCreateNewUser } = require('./user')
const bcrypt = require('bcrypt')


const createNewUser = makeCreateNewUser({ bcrypt })



module.exports = {
    createNewUser
}