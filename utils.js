const rxjs = require('rxjs');
const fs = require('fs')

const DEFAULT_FRAME = fs.readFileSync('./placeholder.jpg')

function createSubject() {
    return new rxjs.BehaviorSubject(DEFAULT_FRAME)
}

module.exports = { createSubject, DEFAULT_FRAME }
