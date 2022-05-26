import React, { Component } from "react";
import './MessageBoard.css';
import Bubble from './../components/Bubble';

const MessageBoard = props => {

    return (
        <div className="message-board">
            {(props.messages.length > 0) ? 
                props.messages.map((msg, index) => {
                    return <Bubble 
                            key={index} 
                            message={msg}
                            userId = {props.userId}>
                        </Bubble>
                }) : "No New Messages"}
            </div>
        );
};

export default MessageBoard;