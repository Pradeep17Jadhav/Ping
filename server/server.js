const http = require('http');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const WebSocketServer = require("./lib/WebSocketServer");

//initialize a simple http server
const server = http.createServer();
const port =  process.env.PORT || 4000;
server.listen(port, () => console.log(`Server Started at port ${port}`));
const wss = new WebSocketServer(server);

// support parsing of application/json type post data
app.use(bodyParser.json());

// //support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4001, () => console.log(`HTTP Server Started at port 4001`));
app.use(cors());
app.post("/createRoom", async (req, res) => {
    try {
        console.log("Create room req received", req);
        // const user = await upComingTreks.find({ id : req.params.id});
        // res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/joinRoom", async (req, res) => {
    try {
        console.log("Join room req received", req);
        // const user = await upComingTreks.find({ id : req.params.id});
        // res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});