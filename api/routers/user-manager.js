const Router = require('express').Router()


const userController = require('../controller/User/user.controller')

const { userSchema } = require('../models/user/user.validator')
const validatorMid = require('../helper/data-validator')



Router.post('/',
    validatorMid(userSchema),
    userController.createUser
)

Router.get('/',
    userController.getSelfInfo
)

Router.get('/:id',
    userController.getUser
)

Router.post('/login',
    userController.loginUser
)


module.exports = Router;