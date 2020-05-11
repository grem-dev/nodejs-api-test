const jwt = require('jsonwebtoken')
const config = require('../../config')

const isAuth = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send(null)
    }

    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.decode(token, config.SECRET_TOKEN)

    if (payload) {
        req.headers.token = payload
        return next()
    }
    return res.status(401).send(null)
}


module.exports = {
    isAuth
}