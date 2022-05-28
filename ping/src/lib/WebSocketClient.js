export class WebSocketClient {
    /**
     * 
     * @param {function} onMessageHandler 
     * @param {string} roomId 
     */
    constructor(onMessageHandler, roomId)
    {
        this.onMessageHandler = onMessageHandler;
        this.ws = null;
        this.createWebSocket(roomId);
    }

    /**
     * Create new web socket connection
     * @param {string}
     * @returns {void}
     */
    createWebSocket(roomId) {
        this.ws = new WebSocket(`ws://localhost:4000/?roomId=${roomId}`);
        this.ws.onopen = (evt) => {
            this.onOpen(evt);
        }
        this.ws.onmessage = (evt) => {
            this.onMessage(evt);
        }        
        this.ws.onclose = (evt) => {
            this.onClose(evt);
        }
    }

    /**
     * Handles new connection opened
     * @returns {void}
     */
    onOpen(evt) { 
        console.log('WebSocket Client Connected');
    }

    /**
     * Handles disconnetion to the web socket
     * @returns {void}
     */
    onClose(evt) { 
        console.log('WebSocket Client Disconnected');
    }

    /**
     * Handles messages from the web socket
     * @returns {void}
     */
    onMessage(evt) {
        console.log("Received: '" + evt.data + "'");
        this.onMessageHandler(JSON.parse(evt.data));
    }

    sendMessage(msg) {
        this.ws.send(msg);
    }
}