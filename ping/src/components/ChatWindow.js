import React, { useState, useRef, useEffect } from "react";
// import './ChatWindow.css';
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
            timestamp: new Date().getTime()
        }
        wsc.current.sendMessage(JSON.stringify(obj));
    }

    return (
        <div className="chat-window">
            <MessageBoard messages={arrMessages}/>
            <Editor onSubmit={onSubmit}></Editor>
        </div>
    );
}

export default ChatWindow;