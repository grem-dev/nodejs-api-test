const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// Importing user services
const UserServices = require('../../services/UserServices')


/**
 * 
 * @param {UserInfo} data 
 */
function createUser(req, res, next) {

    UserServices.createNewUser(req.body)
        .then(payload => {
            res.json(payload)
        })
        .catch(err => next(err))
}


function getUser(req, res, next) {

    UserServices.getOne({ ...req.params })
        .then(userDate => {
            res.json(userDate).end()
        })
        .catch(err => {
            next({ message: 'User not exist', status: 404 })
        })

}

/**
 * Create a new user Session or validate one
 */
function loginUser(req, res, next) {

    console.log('Ando acá')
    console.log(req.headers)
    console.log(req.body)

    if (req.headers.validate) {
        UserServices.validateSesion({ token: req.headers.token })
            .then(sesion => {
                res.json({ ...sesion, valid: true }).end()
            })
            .catch(err => {
                next({ message: 'Invalid credentials', valid: false, status: 400 })
            })
    } else {
        UserServices.login({ email: req.body.email, password: req.body.password })
            .then(result => {
                res.json({ ...result, status: 200 }).end()
            })
            .catch(err => {
                next({ message: 'Invalid credentials', status: 400 })
            })
    }
}


function getSelfInfo(req, res, next) {
    const token = req.headers.token;
    if (!token) return next({ status: 400, message: 'Token not provided' })
    UserServices.getSelfInfo(token)
        .then(data => res.status(200).json(data).end())
        .catch(err => next({ message: err.message, status: 400 }))
}


module.exports = {
    createUser,
    getUser,
    loginUser,
    getSelfInfo
};