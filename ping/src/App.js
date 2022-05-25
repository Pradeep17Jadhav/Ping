import React, { useRef } from "react";
import './App.css';
import ChatWindow  from './components/ChatWindow';

function App() {
	const uId = useRef("UID-" + new Date().getTime());
	return (
		<div className="App">
			<ChatWindow userId={uId.current} />
		</div>
	);
}
export default App;
