import React, { useRef } from "react";
import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import './App.css';
import ChatWindow  from './components/ChatWindow';

function App() {
	const userId = useRef("UID-" + new Date().getTime());
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" exact element = {
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
