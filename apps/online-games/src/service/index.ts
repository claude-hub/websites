import gamesData from './games.json';

export const originGames = [...new Map(gamesData.map((game) => [game.id, game])).values()];

export const categories = [...new Set(originGames.map((game) => game.category))];
export const games = [...originGames].sort(() => 0.5 - Math.random());

// export const games = gamesData;

export const popularGames = [...originGames].sort(() => 0.5 - Math.random()).slice(0, 50);
