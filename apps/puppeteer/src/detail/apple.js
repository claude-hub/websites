const cheerio = require('cheerio');

const searchGame = async (name) => {
	const searchUrl = `https://www.apple.com/us/search/${name}?src=serp`;
	console.log('====apple search url====', searchUrl);

	const res = await fetch(searchUrl);
	const html = await res.text();
	const $ = cheerio.load(html);
	const list = $('.rf-serp-curated-product');

	for (let i = 0; i < list.length; i++) {
		const item = list[i];
		const currentName = $(item).find('.rf-serp-productname').text().trim() || '';
		// 名称相等
		if (currentName === name) {
			const url = $(item).find('a').attr('href');
			return url;
		}
	}
	console.error('No search result');

	return '';
};

const appleDetail = async (url = '', game) => {
	if (!url) return {};

	const res = await fetch(url);
	const html = await res.text();
	const $ = cheerio.load(html);

	const list = $('.information-list .information-list__item');
	const link = $('.product-header__identity a');
	const developer = link.text().trim();

	if (developer !== game.developer) {
		console.error('developer is not match');
		return {};
	}

	const detail = {
		apple_url: url,
		size: '',
		price: '',
		in_app_purchase: '',
		developer: {
			name: developer,
			url: link.attr('href')
		}
	};

	for (let i = 0; i < list.length; i++) {
		const item = list[i];
		const currentName = $(item).find('dt').text().trim() || '';
		// 名称相等
		if (currentName === 'Size') {
			detail.size = $(item).find('dd').text().trim();
		}
		if (currentName === 'Price') {
			detail.price = $(item).find('dd').text().trim();
		}
		if (currentName === 'In-App Purchases') {
			detail.in_app_purchase = $(item).find('dd .medium-show-tablecell').text().trim();
		}
	}
	return detail;
};

const getAppleDetail = async (game) => {
	const url = game.apple_detail_url || (await searchGame(game.name));
	const detail = await appleDetail(url, game);
	return detail;
};

module.exports = { getAppleDetail };
