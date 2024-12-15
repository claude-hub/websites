'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

const Track = () => {
	useEffect(() => {
		console.log('track');
		const isVisited = localStorage.getItem('visited');
		if (isVisited !== null) {
			return;
		}
		localStorage.setItem('visited', 'true');
		// 发送 gtm 事件
		// @ts-ignore
		(window.dataLayer || []).push({
			event: 'first_start_loading',
			time: new Date().getTime(),
			is_loaded: true
		});

		// 发送 GA 事件
		sendGAEvent('event', 'is_click', { value: 'claude' });
	}, []);

	return null;
};

export default Track;
