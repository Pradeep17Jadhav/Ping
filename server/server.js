const http = require('http');
const express = require("express");
const WebSocketServer = require("./lib/WebSocketServer");

//initialize a simple http server
const server = http.createServer();
const port =  process.env.PORT || 4000;
server.listen(port, () => console.log(`Server Started at port ${port}`));

const wss = new WebSocketServer(server);



// const app = express();

// const server = http.createServer(app);
// server.listen(port);
// // app.listen(port, () => console.log(`Server Started at port ${port}`));
// // app.use(cors());

// app.get("/", (req, res) => {
//     res.json("Welcome");
// });

// const wss = new WebSocketServer({
//     httpServer: server
// });

// wss.on("connection", function (request) {
//     console.log("connection receieved");
// });

// wss.on("request", function (request) {
//     console.log("Request receieved");
//     const connection = request.accept(null, request.origin);

//     connection.on("message", function (message) {
//         console.log("Received Message:", message.utf8Data);
//         connection.sendUTF("Hi this is WebSocket server!");
//     });
//     connection.on("close", function (reasonCode, description) {
//         console.log("Client has disconnected.");
//     });
// });

// wss.on("message", function (request) {
//     console.log("Message receieved");
//     const connection = request.accept(null, request.origin);

//     connection.on("message", function (message) {
//         console.log("Received Message:", message.utf8Data);
//         connection.sendUTF("Hi this is WebSocket server!");
//     });
//     connection.on("close", function (reasonCode, description) {
//         console.log("Client has disconnected.");
//     });
// });