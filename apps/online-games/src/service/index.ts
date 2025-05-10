import gamesData from './games.json';

export const categories = [...new Set(gamesData.map((game) => game.category))];
// export const games = [...gamesData].sort(() => 0.5 - Math.random());

export const games = gamesData;

export const popularGames = [...gamesData].sort(() => 0.5 - Math.random()).slice(0, 50);
