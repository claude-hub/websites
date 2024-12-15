import { gameList } from '@games/puppeteer';
import { RoundImage } from '@mono/components';
import { isEmpty } from 'lodash';
import { House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const RecommendGames = () => {
	return (
		<div className="w-[11.35rem] flex flex-col gap-4">
			{gameList.slice(0, 10).map((item) => {
				const { url, name } = item;
				if (isEmpty(item.google_detail)) return null;
				return (
					<RoundImage
						key={url}
						url={url}
						alt={name}
						width={160}
						height={160}
						src={item.google_detail?.logo?.url || ''}
					/>
				);
			})}
		</div>
	);
};

const GameDetail = async ({ params }: { params: Promise<{ name: string }> }) => {
	const { name } = await params;
	const game = gameList.find((item) => item.url === `/${name}`);
	if (!game) {
		return notFound();
	}
	const { google_detail } = game;
	return (
		<>
			<div className="flex bg-bgBlack relative">
				<div className="py-10 pl-16 z-10 min-h-screen">
					<div className="flex items-center gap-2">
						<Link href="/" className="hover:opacity-75">
							<House size={32} className="text-primary" strokeWidth={2} absoluteStrokeWidth />
						</Link>
						/<div>{game.name}</div>
					</div>

					<div className={'w-48 h-48 mt-10'}>
						<RoundImage
							url=""
							src={google_detail?.logo?.url || ''}
							width={200}
							height={200}
							alt="logo"
						/>
					</div>

					<h1 className="text-5xl font-semibold my-10">{game.name}</h1>
					<div>
						<div>{google_detail?.developer?.name}</div>
						<div className="flex mt-2 gap-y-4 gap-x-3">
							{google_detail?.types?.map((item) => {
								return (
									<div
										key={item.name}
										className="bg-white rounded-3xl border px-4 py-1 text-sm text-[#5f6368]"
									>
										{item.name}
									</div>
								);
							})}
						</div>
					</div>
					<div className="grid grid-cols-4 my-10 text-center divide-x text-sm">
						<div>
							<div>{google_detail?.score}</div>
							<div className="text-xs mt-1">{google_detail?.reviews}</div>
						</div>
						<div>
							<div>{google_detail?.download_count}+</div>
							<div className="text-xs mt-1">Downloads</div>
						</div>
						<div>
							<div>{google_detail?.up_time?.str}</div>
							<div className="text-xs mt-1">Updated on</div>
						</div>

						<div>
							<div>{google_detail?.version}</div>
							<div className="text-xs mt-1">Version</div>
						</div>
					</div>

					<div className="flex gap-4 justify-between text-center">
						<a href="#play" className="bg-primary w-52 py-3 rounded-3xl hover:opacity-75">
							Play
						</a>
						<a href="#download" className="bg-primary w-52 py-3 rounded-3xl hover:opacity-75">
							Download
						</a>
					</div>
				</div>
				<div className="absolute right-0 top-0 bottom-0">
					{google_detail?.video ? (
						<video className="h-full" preload="auto" muted autoPlay tabIndex={-1} loop>
							<source src={google_detail.video || ''} type="video/mp4" />
						</video>
					) : (
						<RoundImage
							url=""
							src={google_detail?.logo?.url || ''}
							width={200}
							height={200}
							alt="logo"
						/>
					)}
					<div className="video absolute top-0 left-0 w-full h-full" />
				</div>
			</div>

			<div id="play" className="flex gap-4 p-6">
				<RecommendGames />

				<div className="flex-1 flex flex-col gap-6">
					<div className="aspect-video">
						<iframe
							className="w-full h-full"
							src="https://games.crazygames.com/en_US/racing-builder/index.html?v=1.314"
						/>
					</div>

					<div className="card">
						<h2 className="card-title">Screenshots</h2>
						<div className="px-4">
							<div className="overflow-y-auto flex gap-3 h-72">
								{google_detail?.images?.map((item) => {
									return (
										<Image
											key={item.url}
											src={item.url}
											width={512}
											height={288}
											className="w-full h-full rounded-md"
											alt="Screenshot image"
										/>
									);
								})}
							</div>
						</div>
					</div>

					<div className="card">
						<h2 className="card-title">Description</h2>
						<p
							className="max-h-60 overflow-y-auto break-words px-4 text-sm"
							dangerouslySetInnerHTML={{ __html: google_detail?.description?.en || '' }}
						/>
					</div>

					<div id="download" className="card">
						<h2 className="card-title">Download</h2>

						<div className="flex gap-8 justify-center text-center my-10 text-xl font-bold">
							{game.app_detail?.apple_url && (
								<Link
									target="_blank"
									href={game.app_detail.apple_url}
									prefetch={false}
									className="bg-primary px-16 py-5 rounded-[3rem] hover:opacity-75"
								>
									Form Apple Store
								</Link>
							)}
							{game.google_detail?.google_url && (
								<Link
									target="_blank"
									href={game.google_detail.google_url}
									prefetch={false}
									className="bg-primary px-16 py-5 rounded-[3rem] hover:opacity-75"
								>
									Form Google Play
								</Link>
							)}
						</div>
					</div>

					<div className="grid grid-cols-8 gap-2">
						{gameList.map((item) => {
							const { url, name } = item;
							if (isEmpty(item.google_detail)) return null;
							return (
								<RoundImage
									key={url}
									url={url}
									alt={name}
									width={192}
									height={192}
									src={item.google_detail?.logo?.url || ''}
								/>
							);
						})}
					</div>
				</div>

				<RecommendGames />
			</div>
		</>
	);
};

export default GameDetail;
