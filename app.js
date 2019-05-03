const Server = require('./api/architecture/express.server');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
/**It is important to call this after run dotenv.config()
 * otherwise the enviroment vars will not be available to use
 * when we call this configuration file
 */
const config = require('./config');


// Starting a new server instance
const app = new Server({ port: config.port })

app.setMiddleware(bodyParser.json());
app.setMiddleware(bodyParser.urlencoded({ extended: true }));

// Setting the router
app.setRouter({ prefix: '/api/v0', routes: require('./api/router.js') })

/**
 * TODO: I need to configure a handler that only return a file
 * in this case an html - > I will call this a file provider 
 * this will server the public files, like htlm, css, javacript, imagens, etc.
 */

// Setting the Public views Router
// app.setRouter({ prefix: '/', routes: require('./public/router') })

module.exports = app;