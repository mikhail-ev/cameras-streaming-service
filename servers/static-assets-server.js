const http = require('http');
const path = require('path')
const fs = require('fs');

const index = fs.readFileSync(path.join(__dirname, '..', 'index.html')).toString()

function staticAssetsServer(steamsMap) {
    return http.createServer((request, response) => {
        response.end(index.replace(
            '%STREAMS%',
            Object.keys(steamsMap).map((key) => `'${key}'`).join(', ')
        ))
    })
}

module.exports = {staticAssetsServer}
