const fs = require('fs');
const cheerio = require('cheerio');
const { getGoogleDetail } = require('./detail/google');
const { getAppleDetail } = require('./detail/apple');
const { isEmpty } = require('lodash');

const original = 'https://poki.com';
// https://www.crazygames.com/

const gamesFileName = 'games.json';

const getPoKiDeveloper = async (url) => {
	const res = await fetch(url);
	const html = await res.text();
	const $ = cheerio.load(html);
	const name = $('.pyOBngxafEnwWKrr93IQ').text().trim();
	console.log(name.replace('by ', ''));
	return name.replace('by ', '');
};

// const updateFileData = async () => {
// 	const gamesFile = fs.readFileSync(gamesFileName, 'utf8');
// 	const games = JSON.parse(gamesFile);

// 	for (let i = 0; i < games.length; i++) {
// 		const game = games[i];
// 		if (!game.developer) {
// 			game.developer = await getPoKiDeveloper(game.url);
// 		}
// 	}
// 	console.log('====');
// 	// const newGames = games.map((item) => {
// 	// 	return {
// 	// 		origin_url: item.origin_url,
// 	// 		name: item.text,
// 	// 		developer: item.developer
// 	// 	};
// 	// });
// 	fs.writeFileSync(gamesFileName, JSON.stringify(games, null, '\t'));
// };

const getOriginGameList = async () => {
	fs.existsSync(gamesFileName) || fs.writeFileSync(gamesFileName, '[]');

	const gamesFile = fs.readFileSync(gamesFileName, 'utf8');

	const games = JSON.parse(gamesFile);
	let hasChange = false;

	const res = await fetch(original + '/en');
	const html = await res.text();
	const $ = cheerio.load(html);
	const a = $('.vtbwTfQNi80Hes0DzmGs:first a');
	for (let i = 0; i < a.length; i++) {
		const element = a[i];
		const gameName = $(element).text().trim();
		const text = $(element).attr('href');
		// poki 的 url 有前缀
		const url = text.replace('/en/g', '');
		const gameUrl = original + url;

		// 如果游戏列表中没有这个游戏，则添加
		if (games.every((g) => g.url !== url)) {
			hasChange = true;
			const developer = await getPoKiDeveloper(gameUrl);
			games.unshift({
				url,
				origin_url: gameUrl,
				name: gameName,
				developer
			});
		}
	}

	if (hasChange) {
		console.log('==游戏有更新==');
		fs.writeFileSync(gamesFileName, JSON.stringify(games, null, '\t'));
	}

	return games;
};

const searchGames = async () => {
	const games = await getOriginGameList();

	for (let i = 0; i < games.length; i++) {
		let game = games[i];

		if (isEmpty(game.google_detail)) {
			const google_search_url = `https://play.google.com/store/search?q=` + game.name + '&hl=en';
			game.google_search_url = google_search_url;
			game.google_detail = await getGoogleDetail(game);
		}

		if (isEmpty(game.app_detail)) {
			const apple_search_url = `https://www.apple.com/us/search/${game.name}?src=serp`;
			game.apple_search_url = apple_search_url;
			game.app_detail = await getAppleDetail(game);
		}

		games[i] = game;

		fs.writeFileSync(gamesFileName, JSON.stringify(games, null, '\t'));
	}
};

module.exports = { searchGames };
