const rxjs = require('rxjs');
const fs = require('fs')

const DEFAULT_FRAME = fs.readFileSync('./placeholder.jpg')

function createSubject() {
    return new rxjs.BehaviorSubject(DEFAULT_FRAME)
}


function authenticated(authHeaderString) {
    if (!authHeaderString) {
        return false
    }
    const [login, password] = new Buffer(authHeaderString.split(' ')[1], 'base64').toString().split(':')

    return login === process.env.AUTH_LOGIN && password === process.env.AUTH_PASSWORD
}

module.exports = { createSubject, authenticated, DEFAULT_FRAME }
