import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ChatWindow.css';
import MessageBoard from './../components/MessageBoard';
import Editor from './../components/Editor';
import { WebSocketClient } from "./../lib/WebSocketClient";

const ChatWindow = props => {
    const navigate = useNavigate();
    const [arrMessages, setArrMessages] = useState([]);
    const roomId = useParams().roomId;
    const userId = props.userId;
    
    const onMessage = (oMessage) => {
        setArrMessages((prevArrMessages) => {
            return prevArrMessages.concat(oMessage);
        });
    };

    let wsc = useRef();
    useEffect(() => {
        if(userId == "") {
            navigate("/");
        }
        else
            wsc.current = new WebSocketClient(onMessage, roomId, userId);
    }, []);


    const onSubmit = (message) => {
        const obj = {
            message: message,
            timestamp: new Date().getTime(),
        }
        wsc.current.sendMessage(JSON.stringify(obj));
    }


    return (
        <div className="chat-window">
            <MessageBoard messages={arrMessages} userId={props.userId}/>
            <Editor onSubmit={onSubmit}></Editor>
        </div>
    );
}

export default ChatWindow;