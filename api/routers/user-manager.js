const Router = require('express').Router()


const userController = require('../controller/User/user.controller')

const { userSchema } = require('../models/user/user.validator')
const validatorMid = require('../helper/data-validator')
const { isAuth } = require('../middleware')

/**
 * To create a new user account
 */
Router.post('/',
    validatorMid(userSchema),
    userController.createUser
)

/**
 * Get self info account via using the token payload
 */
Router.get('/',
    isAuth,
    userController.getSelfInfo
)

/**
 * Get an specific user
 */
Router.get('/:id',
    userController.getUser
)

Router.post('/login',
    userController.loginUser
)


module.exports = Router;