


module.exports = (schema) => {
    return (req, res, next) => {
        schema.validateAsync(req.body)
            .then(data => {
                next()
            })
            .catch(err => { 
                next({
                    message: err.details[0].message,
                    status: 400
                })
            })
    }
}