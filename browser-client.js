'use strict';

let socket = null;
let userName = null;

function connectToWebsocketServer() {
    userName = document.getElementById("name").value.trim();

    socket = new WebSocket('ws://' + window.location.host);

    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify( { messageID : 'new-connection', user : userName }));
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server', event.data);
        document.getElementById("serverResponse").value = event.data;
        handleServerMessage(JSON.parse(event.data));
    });

    document.getElementById("connectToServer").style.display = "none";
    document.getElementById("sendMessage").style.display = "inline";
}

function handleServerMessage(data) {
    if (data.id === 'new-connection-response') {
        document.getElementById('serverResponse').value = data;
    }
}

function sendSocketMessage() {
    let msgID = document.getElementById("msg_id").value.trim();
    let msgData = document.getElementById("msg_data").value;

    if (msgID.length == 0) return;

    socket.send(JSON.stringify({
        messageID : msgID,
        data : msgData
    }));
}