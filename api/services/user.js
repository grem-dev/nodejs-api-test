const userModel = require('../models/user.model');

function makeCreateNewUser({ bcrypt }) {
    return function ({ username, password, email }) {
        return new Promise((resolve, reject) => {
            console.log({ username, password, email })
            bcrypt.hash(password, 10, (err, newPassword) => {
                if (err) reject(err)

                userModel.findOne({ email }, (err, user) => {
                    if (user) reject(new Error('Email already registered'))
                    const newUser = new userModel({ username, password: newPassword, email })
                    newUser.save()
                        .then(user => {
                            let toResolve = { ...user._doc };
                            delete toResolve.password;
                            resolve(toResolve)
                        })
                        .catch(err => {
                            reject(err)
                        })
                });

            })
        })
    }
}


module.exports = {
    makeCreateNewUser
}