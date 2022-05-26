import './Bubble.css';

export default function Bubble(props) {
	const bSelfMessage = props.message.senderId == props.userId;
	return (
		<div className={"bubble" + (bSelfMessage ? " self" : "")}>
			<div className={"bubble-body"}>
				{!bSelfMessage && <h4 className="bubble-sender">
					{props.message.senderName}
				</h4>}
				<div className="bubble-message">
					{props.message.message}
				</div>
			</div>
		</div>
	);
}
