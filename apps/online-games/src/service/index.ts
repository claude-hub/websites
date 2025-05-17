import data from './games.json';
import data1 from './games1.json';
import data2 from './games2.json';

const gamesData = [...data, ...data1, ...data2];

export const originGames = [...new Map(gamesData.map((game) => [game.id, game])).values()];

export const categories = [...new Set(originGames.map((game) => game.category))];
export const games = [...originGames].sort(() => 0.5 - Math.random());

// export const games = gamesData;

export const popularGames = [...originGames].sort(() => 0.5 - Math.random()).slice(0, 50);
