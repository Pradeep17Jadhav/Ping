export class WebSocketClient {
    constructor(onMessageHandler)
    {
        this.onMessageHandler = onMessageHandler;
        this.ws = null;
        this.createWebSocket();
    }

    /**
     * Create new web socket connection
     * @returns {void}
     */
    createWebSocket() {
        this.ws = new WebSocket('ws://localhost:4000/');
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