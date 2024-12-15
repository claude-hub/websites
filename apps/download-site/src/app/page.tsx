import { gameList } from '@games/puppeteer';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="p-4">
			<div className="grid grid-cols-4 md:grid-cols-10 gap-2 max-w-screen-2xl">
				{gameList.map((item) => {
					const { name, url, google_detail } = item;
					if (isEmpty(google_detail)) return null;
					const { logo } = google_detail;
					const { width = 0, height = 0, url: logoUrl = '' } = logo || {};
					return (
						<div key={item.name}>
							<Link href={url}>
								<Image
									className="rounded-md"
									src={logoUrl}
									alt={name}
									width={width}
									height={height}
								/>
							</Link>
						</div>
					);
				})}
			</div>

			<div className="flex flex-col items-center mt-4">
				<div className="w-4/5 aspect-video">
					<iframe
						className="w-full h-full"
						src="https://games.crazygames.com/en_US/racing-builder/index.html?v=1.314"
					/>
				</div>
			</div>
		</div>
	);
}
