class IDHandler {
    constructor() {
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    } 
    
    getUniqueUserID() {
        return new Date().getTime() + "-" + this.s4() + "-" + this.s4();
    };

    getUniqueRoomID() {
        return this.s4() + "-" + this.s4() + "-" + this.s4();
    };
}
module.exports = IDHandler;
