
const userManager = require('./routers/user-manager')
const notesManager = require('./routers/notes-manager')

//Example ['/admin', adminEndPoint]
module.exports = [
    ['/user-manager', userManager],
    ['/', notesManager]
]