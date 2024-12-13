'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { sendGAEvent } from '@next/third-parties/google';

export default function TestGA() {
	const handleClick = () => {
		console.log('click');
		sendGTMEvent({ event: 'buttonClicked', value: 'xyz' });
	};

	const sendGA = () => {
		console.log('click');
		sendGAEvent('event', 'is_click', { value: 'claude' });
	};

	return (
		<div>
			<button onClick={handleClick}>Send GTM Event</button>
			<br />
			<br />
			<br />
			<div>
				<button onClick={sendGA}>Send GA Event</button>
			</div>
			<br />
			<br />
		</div>
	);
}
