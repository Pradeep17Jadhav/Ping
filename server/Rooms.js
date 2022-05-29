class Rooms {
    /**
     * 
     * @param {IDHandler} idHandler 
     */
    constructor(idHandler) {
        this.idHandler = idHandler;
        this.arrRooms = [];
    }

    createRoom(password, roomId, userId) {
        this.arrRooms.push({
            roomId: roomId,
            password: password,
            users: []
        });
        this.addUserToRoom(roomId, userId);
        return roomId;
    }

    /**
     * 
     * @param {string} password 
     * @param {string} roomId 
     * @param {string} userId 
     * @returns 
     */
    joinRoom(password, roomId, userId) {
        let oRetData = {
            statusCode: 200
        };

        const room = this.arrRooms.find(room => {
            return room.roomId == roomId;
        });

        if(room) {
            if(room.password == password) {
                this.addUserToRoom(roomId, userId);
                oRetData.userId = userId;
                oRetData.roomId = roomId;
            }
            else {
                oRetData.statusCode = 401;
                oRetData.message = "Incorrect password";
            }
        } else {
            oRetData.statusCode = 404;
            oRetData.message = "Requested room not found";
        }
        return oRetData;
    }

    /**
     * 
     * @param {string} roomId 
     * @param {string} userId 
     */
    addUserToRoom(roomId, userId) {
        const room = this.arrRooms.find(room => {
            return room.roomId == roomId;
        });

        if(room) {
            room.users.push(userId);
        }
    }

    /**
     * Validates if the requested room is authenticated for current user
     * @param {string} roomId 
     * @param {string} userId 
     * @returns 
     */
    validateLogin(roomId, userId) {
        const room = this.arrRooms.find(room => {
            return room.roomId == roomId;
        });

        if(room) {
            for(let i = 0; i < room.users.length; i++) {
                if(room.users[i] == userId)
                    return true;
            }
        }
        return false;
    }
}

module.exports = Rooms;
