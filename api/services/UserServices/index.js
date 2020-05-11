const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../../../config')

// const NoteModel = mongoose.model('Note')
const UserModel = require('../../models/user/user.model')



/**
 * Create a new user and save onto the database.
 * Then return the user data and a new token to login 
 * @param Username The user name for the account
 * @param Password Original password to be hased
 * @param Email A valid email 
 */
const createNewUser = ({ username, password, email }) => new Promise((resolve, reject) => {
    const newUser = new UserModel();

    newUser.username = username;
    newUser.email = email;

    bcrypt.hash(password, 10).then((pass) => {
        newUser.password = pass;
        UserModel.findOne({ email }, (err, user) => {
            if (err) reject(err)
            if (user) reject({ message: 'Email already in use' })

            newUser.save().then(() => {
                // We generate a new token to login the user automatically
                const token = jwt.sign({ ...newUser.toJSON(), sessionDate: new Date() }, config.SECRET_TOKEN, { expiresIn: '30d' });
                resolve({ ...(newUser.toJSON()), token })
            }).catch(err => {
                reject(err)
            })
        }) // End find one method
    })
})



const getOne = ({ id }) => new Promise((resolve, reject) => {
    UserModel.findById(id)
        .then(data => resolve(data))
        .catch(err => {
            reject(null)
        })
})



const getSelfInfo = (token) => new Promise(async (resolve, reject) => {

    UserModel.findById(token._id, (err, user) => {
        if (err) reject({ message: 'User not exist' });
        if (user == null) reject({ message: 'User not exist' });
        resolve({ ...user.toJSON() })
    })
})


const login = ({ email, password }) => new Promise(async (resolve, reject) => {

    UserModel.findOne({ email }, async (err, user) => {
        if (err) return reject(err)

        if (!user) return reject(new Error('Invalid credentials'))

        const res = await bcrypt.compareSync(password, user.password)
        if (res === false) reject(new Error('Invalid credentials'))

        // Then all is correct, we return a new token
        const token = jwt.sign({ ...user.toSignToken() }, config.SECRET_TOKEN, { expiresIn: '30d' })
        resolve({ token, ...user.toJSON() })
    })
})


const validateSesion = ({ token }) => new Promise((resolve, reject) => {
    const payload = jwt.decode(token, config.SECRET_TOKEN)
    UserModel.findById(payload._id, (err, user) => {
        if (err) return reject(false)
        if (!user) return reject(new Error('Invalid credentials'))

        return resolve({ ...payload, token })
    }).catch(err => reject(err))
})

module.exports = {
    createNewUser,
    getOne,
    login,
    getSelfInfo,
    validateSesion
}