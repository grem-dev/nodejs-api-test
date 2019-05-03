
const express = require('express');

class Server {
    constructor({ port }) {
        this.analitics = new Function()
        this.port = port;
        this.app = express();
    }

    static init({ port }) {
        return new Server({ port });
    }

    setRouter({ prefix = '', routes = [] }) {
        routes.forEach(item => {
            let aux = [...item]
            if (new RegExp('^/[a-zA-Z-/]*[a-z][0-9]*$').test(prefix)) aux[0] = (prefix + item[0])
            // console.log(aux)
            this.app.use(...aux)
        })
        return this
    }

    setMiddleware(midle) {
        this.app.use(midle)
        return this
    }

    async start() {
        this.app.listen(this.port, err => {
            if (err) throw err
            console.log('Server listening on port ' + this.port)
        })
        return this
    }

    setAnalitics(fn) {
        this.analitics = fn;
    }
}

module.exports = Server;