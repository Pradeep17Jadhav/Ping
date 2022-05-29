import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateRoom.css';
import axios from "axios";

const CreateRoom = props => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const [password, setPassword] = useState("");

    const roomIdInputHandler = evt => {
        setRoomId(evt.target.value);
    }

    const passwordInputHandler = evt => {
        setPassword(evt.target.value);
    }

    const joinRoomHandler = evt => {
        evt.preventDefault();

        if (roomId == "") {
            //create new room
            axios.post("/createRoom", {}, {
                auth: {
                    username: "newRoom",
                    password: password
                }
            }).then((response) => {
                props.setUserId(response.data.userId);
                navigate(`/${response.data.roomId}`);
            });
        } else {
            //join room
            axios.post("/joinRoom", {}, {
                auth: {
                    username: roomId,
                    password: password
                }
            }).then((response) => {
                props.setUserId(response.data.userId);
                navigate(`/${response.data.roomId}`);
            });
        }
    }

    return (
        <Fragment>
            <form onSubmit={joinRoomHandler} >
                <h3>Join a room</h3>
                <input type="text" value={roomId} onInput={roomIdInputHandler} placeholder="Enter room ID..." />
                <input type="password" value={password} onInput={passwordInputHandler} />

                <h3>Create a new room</h3>
                <input type="password" value={password} onInput={passwordInputHandler} />

                <button type="submit">Join</button>
            </form>
        </Fragment>
    );
}

export default CreateRoom;