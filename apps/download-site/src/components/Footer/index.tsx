const Footer = () => {
	return (
		<footer className="pb-2 pt-8 text-sm">
			{/* <div className="flex gap-6 justify-center mb-8 uppercase">
				<Link href="/" className="underline hover:opacity-70">
					Home
				</Link>
				<Link href="/privacy-policy" className="underline hover:opacity-70">
					PRIVACY POLICY
				</Link>
				<Link
					prefetch={false}
					target="_blank"
					className="underline hover:opacity-70"
					href="https://github.com/claude-hub"
				>
					About Me
				</Link>
			</div> */}
			<div className="text-center">
				Copyright © {new Date().getFullYear()} claude-hub.cn All Rights Reserved.
			</div>
		</footer>
	);
};

export default Footer;
