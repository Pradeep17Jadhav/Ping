const websocket = require('websocket').server;

class WebSocketServer {
    constructor(server) {
        this.clients = [];

        this.wss = new websocket({
            httpServer: server
        });

        setInterval(() => {
            console.log(this.wss.connections.length);
        }, 5000);

        this.addListeners();
    }

    /**
     * Adds event listeners to the wss
     * @returns {void}
     */
    addListeners() {
        const self = this;
        this.wss.on("request", function(request) {
            const conn = request.accept(null, request.origin);
            const userId = self.getUniqueID();
            self.clients.push({
                userId: userId,
                conn: conn
            });

            console.log(self.clients);
            conn.on("message", (message)  => {
                self.onMessage(message, conn);
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
    onMessage(message, sender) {
        const obj = JSON.parse(message.utf8Data);
        console.log("Received Message:", obj.message, "from", obj.senderId);
        this.wss.connections.forEach((conn) => {
            if(conn != sender)
                conn.sendUTF(message.utf8Data);
        })
    }

    /**
     * Handle disconnection of client from wss connection
     * @returns {void}
     */
    onClose(reasonCode, description) {
        console.log("Client has disconnected. Reason: ", description);
    }

    getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return new Date().getTime() + '-' + s4() + '-' + s4();
    };
}

module.exports = WebSocketServer;