


module.exports = (schema) => {
    return (req, res, next) => {
        schema.validateAsync(req.body)
            .then(data => {
                next()
            })
            .catch(err => {
                console.log('Data validator')
                console.log(err)
                next({
                    message: err.details[0].message,
                    type: err.details.type,
                    status: 400
                })
            })
    }
}