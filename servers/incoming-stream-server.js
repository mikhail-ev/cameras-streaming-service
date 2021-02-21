const http = require('http');
const utils = require('../utils')

function log(...args) {
    console.log(`[${new Date().toLocaleTimeString()}]:`, ...args)
}

const BOUNDARY = 'FRAME-BOUNDARY-123';
const BOUNDARY_BUFFER = Buffer.from(BOUNDARY);
const BOUNDARY_LENGTH = BOUNDARY_BUFFER.length

function cameraIncomingStreamHandlerBuilder(subject) {
    let body = [];
    return function cameraIncomingStreamHandler(chunk) {
        const boundaryIndex = chunk.indexOf(BOUNDARY_BUFFER)
        const includesBoundary = boundaryIndex !== -1;
        if (includesBoundary) {
            const lastPart = chunk.slice(0, boundaryIndex);

            if (lastPart.length) {
                body.push(lastPart);
            }

            subject.next(Buffer.concat(body))
            body = [];

            const nextPart = chunk.slice(boundaryIndex + BOUNDARY_LENGTH)

            if (nextPart.length) {
                body.push(nextPart)
            }
        } else {
            body.push(chunk)
        }
    }
}

function incomingStreamServer(streamsMap) {
    const handlersMap = {}
    return http.createServer((request) => {
        request.on('error', (err) => {
            log('error;', err)
        }).on('data', (chunk) => {
            log(`Got frame for subject ${request.path}`)
            if (!streamsMap[request.path]) {
                streamsMap[request.path] = utils.createSubject()
            }
            if (!handlersMap[request.path]) {
                handlersMap[request.path] = cameraIncomingStreamHandlerBuilder(streamsMap[request.path])
            }
            handlersMap[request.path](chunk)
        });
    })
}

module.exports = { incomingStreamServer }
