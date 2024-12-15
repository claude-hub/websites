import { isDev } from '@mono/utils';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Game Search And Download',
	description: 'search and download games'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ''; // 从环境变量中获取GTM ID

	return (
		<html lang="en">
			{!isDev && (
				<head>
					<GoogleTagManager gtmId={gtmId} />
				</head>
			)}

			<body>
				<div className="flex flex-col min-h-screen">{children}</div>
			</body>
		</html>
	);
}
