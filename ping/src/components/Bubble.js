// import './Bubble.css';

export default function Bubble(props) {
	return (
		<div className="bubble">
			{props.message.message} - {props.message.senderId}
		</div>
	);
}
