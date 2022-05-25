const http = require('http');
const express = require("express");
const WebSocketServer = require("./lib/WebSocketServer");

//initialize a simple http server
const server = http.createServer();
const port =  process.env.PORT || 4000;
server.listen(port, () => console.log(`Server Started at port ${port}`));

const wss = new WebSocketServer(server);