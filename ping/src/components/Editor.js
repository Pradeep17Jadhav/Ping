import { useState } from "react";
import "./Editor.css";

export default function Editor(props) {    
    const [message, setMessage] = useState("");

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }	

    const onSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(message);
        setMessage("");
    }	

	return (
        <div className="editor">
            <form className="editor-form" onSubmit={onSubmit}>
                <input type="text" value={message} onChange={onMessageChange} placeholder="Type a message..."/>
                <button type="submit" className="editor-btn_submit">
                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form>
        </div>
	);
};
