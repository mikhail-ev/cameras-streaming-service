const http = require('http');
const path = require('path')
const fs = require('fs');

const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'))

function staticAssetsServer() {
    return http.createServer((request, response) => {
        response.end(index)
    })
}

module.exports = {staticAssetsServer}
