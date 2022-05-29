const websocket = require('websocket').server;

class WebSocketServer {
    constructor(server, rooms) {
        /** @type {Array<Object>} */
        this.arrRooms = [];

        /** @type {Rooms} */
        this.rooms = rooms;

        this.wss = new websocket({
            httpServer: server
        });

        setInterval(() => {
            console.log(this.wss.connections.length, "clients connected");
        }, 3000);

        this.addListeners();
    }

    /**
     * Adds event listeners to the wss
     * @returns {void}
     */
    addListeners() {
        const self = this;
        this.wss.on("request", function(req, res) {
            if(!req || !req.origin || !req.resourceURL || !req.resourceURL.query) {
                req.reject(102, "Invalid request");
                return;
            }

            const roomId = req.resourceURL.query.roomId;
            const userId = req.resourceURL.query.userId;
            
            if(!self.rooms.validateLogin(roomId, userId)) {
                req.reject(102, "Not authorized");
                return;
            }

            const conn = req.accept(null, req.origin);

            //find room in arrRooms using roomId
            let room = self.arrRooms.find(room => {
                return room.roomId === roomId;
            });

            //if room already exists, add the current user in it
            //else create a new room and add current user in it
            if(room) {
                room.connections.push({
                    userId: userId,
                    conn: conn
                });
            } else {
                self.arrRooms.push({
                    roomId: roomId,
                    connections: [{
                        userId: userId,
                        conn: conn
                    }]
                });
            }

            conn.on("message", (message)  => {
                self.onMessage(message, userId, roomId);
            });

            conn.on("close", (reasonCode, description) => {
                self.onClose(reasonCode, description);
            });
        });
    }

    /**
     * Handle msgs from wss connection
     * @returns {void}
     */
    onMessage(message, userId, roomId) {
        let obj = JSON.parse(message.utf8Data);
        obj.senderId = userId;
        const broadCastMessage = JSON.stringify(obj);

        this.arrRooms.forEach(room => {
            if(room.roomId == roomId) {
                room.connections.forEach(connection => {
                    connection.conn.sendUTF(broadCastMessage);
                })
            }
        });
    }

    /**
     * Handle disconnection of client from wss connection
     * @returns {void}
     */
    onClose(reasonCode, description) {
        console.log("Client has disconnected. Reason: ", description);
    }
}

module.exports = WebSocketServer;