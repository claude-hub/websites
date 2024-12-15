const fs = require('fs');

const gamesFile = fs.readFileSync('games.json', 'utf8');

const games = JSON.parse(gamesFile);

const newGames = games.map((item) => {
	return {
		origin_url: item.url,
		...item
	};
});

// fs.writeFileSync('games.json', JSON.stringify(newGames, null, '\t'));

console.log(games);
