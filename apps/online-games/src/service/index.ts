import page1 from './page1.json';

export interface Game {
	id: string;
	title: string;
	description: string;
	instructions: string;
	url: string;
	category: string;
	tags: string;
	thumb: string;
	width: string;
	height: string;
}

const gamesData = ([...page1] as Game[]).map((item) => {
	if (!item.category) {
		return {
			...item,
			category: 'Puzzle'
		};
	}
	return item;
});

export const originGames = [...new Map(gamesData.map((game) => [game.id, game])).values()];

export const categories = [...new Set(originGames.map((game) => game.category))];
export const games = [...originGames].sort(() => 0.5 - Math.random());

// export const games = gamesData;

export const popularGames = [...originGames].sort(() => 0.5 - Math.random()).slice(0, 50);
