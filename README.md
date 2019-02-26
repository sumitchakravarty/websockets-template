# WebSockets Template

Template for an app using the WebSocket API package 'ws' for client-server communication.

# Requirements

## node.js

The example is based on node.js, so install that.
The instructions below assume you've started a Node.js CLI (aka Command Prompt).

## ws.js (WebSocket)
global install:
```
> npm install -g ws
```
local install:
```
> npm install ws
```

# Message structure

The messages used in the example are objects:
```
{
    messageID: some-id-string,
    ...data payload... 
}
```
Messages are sent as JSON strings, and are packed and unpacked using JSON.stringify and JSON.parse respectively.

# Try it out

## 1. start the server
From a node.js command prompt:
```
> node index.js
```

## 2. start the client

Start your browser (or a new tab in your browser), and navigate to http://localhost:8001

## 3. from the client, connect to the server

Type some name in the text box labelled Name, then click on the "Connect To..." button.

This sends a 'new-connection' message. Go back to the server you started earlier - it should show the received message.

In response, the server sends a message ('new-connection-response'), which in turn should show up on the web page.

Now, you can send messages from the web page; the server will log each received message.
