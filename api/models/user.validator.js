const Joi = require('@hapi/joi')

const userSchema = Joi.object({
    username: Joi.string().min(5).max(35).required(),
    password: Joi.string().min(5).max(35).required(),
    email: Joi.string().email().required(),
})


module.exports = {
    userSchema
}