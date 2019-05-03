
const userManager = require('./routers/user-manager')
const notesManager = require('./routers/notes-manager')

//Example ['/admin', middleware? ,adminEndPoint]
module.exports = [
    ['/user-manager', userManager],
    ['/notes-manager', notesManager]
]