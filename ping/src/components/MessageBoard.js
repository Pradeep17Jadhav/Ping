import React, { Component } from "react";
// import './MessageBoard.css';
import Bubble from './../components/Bubble';

const MessageBoard = props => {

    if(props.messages.length > 0) {
        return (
            <div className="message-board">
                {props.messages.map((msg, index) => {
                    return <Bubble key={index} message = {msg}></Bubble>
                })}
            </div>
        );
    }
    else {
        return <div>No New Messages</div>
    }
};

export default MessageBoard;