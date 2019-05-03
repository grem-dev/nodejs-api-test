/**
 * Configuration file holding the basic configuration about global enviroment
 * to run the app
 */


module.exports = {
    port: process.env.PORT || 3001,
    db1: process.env.MONGODB_URI || 'mongodb://localhost:27017/test2',
    SECRET_TOKEN: 'claveMasComplejaParaCifradoDelToken'
}