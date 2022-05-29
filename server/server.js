const http = require('http');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const WebSocketServer = require("./lib/WebSocketServer");
const IDHandler = require("./lib/IDHandler");
const Rooms = require("./Rooms");

//initialize a simple http server
const server = http.createServer();
const port =  process.env.PORT || 4000;
server.listen(port, () => console.log(`Server Started at port ${port}`));
const idHandler = new IDHandler();
const rooms = new Rooms(idHandler);
const wss = new WebSocketServer(server, rooms);

// support parsing of application/json type post data
app.use(bodyParser.json());

// //support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4001, () => console.log(`HTTP Server Started at port 4001`));
app.use(cors());

//create new room request
app.post("/createRoom", async (req, res) => {
    try {
        console.log("Create room req received");
        const password = Buffer.from((req.headers.authorization.split(" ")[1]), 'base64').toString('ascii').split(":")[1];
        const userId = idHandler.getUniqueUserID();
        const roomId = idHandler.getUniqueRoomID();
        rooms.createRoom(password, roomId, userId);
        res.json({
            roomId: roomId,
            userId: userId
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//join existing room request
app.post("/joinRoom", async (req, res) => {
    try {
        console.log("Join room req received");
        const data = Buffer.from((req.headers.authorization.split(" ")[1]), 'base64').toString('ascii');
        const roomId = data.split(":")[0];
        const password = data.split(":")[1];
        const userId = idHandler.getUniqueUserID();
        const oRetData = rooms.joinRoom(password, roomId, userId);
        if(oRetData.statusCode == 200) //success
            res.json(oRetData);
        else {
            const error = new Error(oRetData.message);
            error.code = oRetData.statusCode;
            throw error;
        }
    } catch (err) {
        const statusCode = err.statusCode ? err.statusCode : 500;
        res.status(statusCode).json({ message: err.message });
    }
});