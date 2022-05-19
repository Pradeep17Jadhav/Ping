const websocket = require('websocket').server;

class WebSocketServer {
    constructor(server) {
        this.wss = new websocket({
            httpServer: server
        });

        this.conn = null;

        this.addListeners();
    }

    /**
     * Adds event listeners to the wss
     * @returns {void}
     */
    addListeners() {
        const self = this;
        this.wss.on("request", function(request) {
            self.conn = request.accept(null, request.origin);

            self.conn.on("message", (message)  => {
                self.onMessage(message);
            });

            self.conn.on("close", (reasonCode, description) => {
                self.onClose(reasonCode, description);
            });
        });
    }

    /**
     * Handle msgs from wss connection
     * @returns {void}
     */
    onMessage(message) {
        console.log("Received Message:", message.utf8Data);
        this.conn.sendUTF("Hi this is WebSocket server!");
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