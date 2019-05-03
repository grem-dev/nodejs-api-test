


module.exports = (schema) => {
    return (req, res, next) => {
        schema.validateAsync(req.body)
            .then(data => {
                next()
            })
            .catch(err => {
                res.json(err).end()
            })
    }
}