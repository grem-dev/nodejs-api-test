

module.exports = function (request) {
    return Object.freeze({
        body: request.body,
        headers: request.headers,
        params: request.params,
        query: request.query,
    })
}