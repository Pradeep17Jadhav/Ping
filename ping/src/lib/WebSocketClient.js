export class WebSocketClient {
    constructor()
    {
        this.ws = null;
        this.createWebSocket();
    }

    createWebSocket() {
        this.ws = new WebSocket('ws://localhost:4000/');
        this.ws.onopen = (evt) => {
            this.onOpen(evt);
        }
        this.ws.onmessage = (evt) => {
            this.onMessage(evt);
        }
    }

    onOpen(evt) { 
        console.log('WebSocket Client Connected');
        this.ws.send('Hi this is web client.');
    }

    onMessage(evt) {
        console.log("Received: '" + evt.data + "'");
    }
}