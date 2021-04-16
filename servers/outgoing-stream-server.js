const http = require('http');
const rxjs = require('rxjs');
const operators = require('rxjs/operators');
const utils = require('../utils')

function outgoingStreamServer(streamsMap) {
    return http.createServer(function(request, response) {
        if (!utils.authenticated(request.headers.authorization)) {
            response.writeHead(401, {
                'WWW-Authenticate': 'Basic'
            })
            return response.end();
        }

        if (!streamsMap[request.url]) {
            response.statusCode = 404
            return response.end()
        }
        const subject = streamsMap[request.url]

        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'multipart/x-mixed-replace; boundary=myboundary',
            'Cache-Control': 'no-cache',
            'Connection': 'close',
            'Pragma': 'no-cache'
        });

        // For some reason mjpeg needs to be sent twice initially in order to display first frame
        const subscription = rxjs.concat(subject.pipe(operators.first()), subject).subscribe((buffer) => {
            response.write("--myboundary\r\n");
            response.write("Content-Type: image/jpeg\r\n");
            response.write("Content-Length: " + buffer.length + "\r\n");
            response.write("\r\n");
            response.write(buffer, 'binary');
            response.write("\r\n");
        })
        request.on("close", function() {
            subscription.unsubscribe();
            response.end();
        });

        request.on("end", function() {
            subscription.unsubscribe();
            response.end();
        });
    })
}

module.exports = { outgoingStreamServer }
