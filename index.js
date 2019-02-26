'use strict';

const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const server = http.createServer(function (req, res) {
    let fileName = null;
    let fileType = null;

    if (req.url == '/browser-client.js') {
        fileName = 'browser-client.js';
        fileType = 'text/javascript'
    } else {
        fileName = 'browser-client.html';
        fileType = 'text/html'
    }

    fs.readFile(fileName, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write("not found");
        } else {
            res.writeHead(200, {'Content-Type': fileType});
            res.write(data);
        }
        res.end();
    });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received', message);
        handleClientMessage(JSON.parse(message), ws);
    });

    ws.on('close', function onclose(event) {
        console.log('onclose', event);
        // handle "user disconnected"
    });

    ws.on('error', function onerror(event) {
        console.log('onerror', event);
    })

    ws.send(JSON.stringify( { id : 'hello' }));
});

server.listen(8001);

function handleClientMessage(msg, ws) {
    if (msg.messageID === 'new-connection') {
        // handle "new User"

        // NOTE: to identify connections, either:
        // (a) array of connection-related info, with some unique key like the username,
        //     (perhaps requiring each message to include the username), or
        // (b) add the username as a property to the ws object
        // 
        // getUserSocket below helps with approach (a)

        // example response below
        let someObject = { messageID : 'new-connection-response', data : msg.user };
        ws.send(JSON.stringify(someObject))
    } else if (msg.messageID === 'something-else') {
        // handle message 'something-else'
    }
    // etc
}

function getUserSocket(userName) {
    let userSocket = null;
    wss.clients.forEach(ws => {
        if (ws.userName === userName) {
            userSocket = ws;
        }
    });
    return userSocket;
}

function broadcast(data) {
    let someObject = { messageID : 'some-broadcast', data : data };
    let jsonData = JSON.stringify(someObject);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(jsonData);
        }
    });
}