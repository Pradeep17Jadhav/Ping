import React, { useState, useRef, useEffect } from "react";
import './ChatWindow.css';
import MessageBoard from './MessageBoard';
import Editor from './Editor';
import { WebSocketClient } from "../lib/WebSocketClient";

const ChatWindow = props => {
    const [arrMessages, setArrMessages] = useState([]);
    
    const onMessage = (oMessage) => {
        setArrMessages((prevArrMessages) => {
            return prevArrMessages.concat(oMessage);
        });
    }
    let wsc = useRef();
    useEffect(() => {
        wsc.current = new WebSocketClient(onMessage);
    }, []);


    const onSubmit = (message) => {
        const obj = {
            senderId: props.userId,
            message: message,
            timestamp: new Date().getTime(),
            senderName: "Pradeep"
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