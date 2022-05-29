import React, { useState } from "react";
import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import './App.css';
import ChatWindow  from './pages/ChatWindow';
import CreateRoom  from './pages/CreateRoom.js';

function App() {
	const [userId, setUserId] = useState("");
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" exact element = {
						<CreateRoom setUserId={setUserId} />
					} />
					<Route path="/:roomId" exact element = {
						<ChatWindow userId={userId} />
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
