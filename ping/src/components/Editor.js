import { useState } from "react";

export default function Editor(props) {    
    const [message, setMessage] = useState("");

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }	

	return (
        <div className="editor">
                <input type="text" value={message} onChange={onMessageChange} />
            <button onClick={() => props.onSubmit(message)}>Send</button>
        </div>
	);
};
