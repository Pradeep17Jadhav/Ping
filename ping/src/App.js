import React, { useRef } from "react";
import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import './App.css';
import ChatWindow  from './pages/ChatWindow';
import CreateRoom  from './pages/CreateRoom.js';

function App() {
	const userId = useRef("UID-" + new Date().getTime());
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" exact element = {
						<CreateRoom userId={userId.current} />
					} />
					<Route path="/:roomId" exact element = {
						<ChatWindow userId={userId.current} />
					} />
					<Route path="*" element = {
						<Navigate to="/" replace />
					} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
