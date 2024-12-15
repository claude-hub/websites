import { gameList } from '@games/puppeteer';
import { RoundImage } from '@mono/components';
import { cn } from '@mono/utils';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="p-4">
			<div className="grid grid-cols-4 md:grid-cols-10 gap-2 max-w-screen-2xl">
				<Link href="/">
					<Image src="logo.svg" width={20} height={20} alt="logo" className="w-full h-full" />
				</Link>

				{gameList.map((item, index) => {
					const { name, url, google_detail } = item;
					if (isEmpty(google_detail)) return null;
					const { logo } = google_detail;
					const { width = 0, height = 0, url: logoUrl = '' } = logo || {};
					console.log(index);
					return (
						<RoundImage
							className={cn({
								'col-span-2 row-span-2': index === 5
							})}
							key={item.name}
							url={url}
							src={logoUrl}
							alt={name}
							width={width}
							height={height}
						/>
					);
				})}
			</div>
		</div>
	);
}
