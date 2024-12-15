const cheerio = require('cheerio');
const { get } = require('lodash');

const googlePlay = 'https://play.google.com';
const googlePlaySearchUrl = `${googlePlay}/store/search?q=`;

const searchGoogleGame = async (game) => {
	const { name, developer } = game;
	// &hl=en 为英文
	const searchUrl = googlePlaySearchUrl + name + '&hl=en';
	console.log('===google search url===', searchUrl);

	const res = await fetch(searchUrl);
	const html = await res.text();
	const $ = cheerio.load(html);
	const a = $('.XUIuZ a');
	const urlString = $(a).attr('href');

	// 如果没有搜索结果，则终止程序
	if (!urlString) {
		console.error('No search result');
		return '';
	}

	const currentName = $('.vWM94c').text();
	const currentDeveloper = $('.LbQbAe').text();
	if (name === currentName && developer === currentDeveloper) {
		return googlePlay + urlString;
	}

	console.error('Search result not match');
	return '';
};

const parserGameInfoFromScript = (params) => {
	const name = get(params, 'data[1][2][0]', []);
	const pb_time = get(params, 'data[1][2][10]', []);
	const description = get(params, 'data[1][2][12]', []);
	const count = get(params, 'data[1][2][13]', []);
	// const developer = get(params, 'data[1][2][37]', []);
	const developer = get(params, 'data[1][2][68]', []);
	const developer_detail = get(params, 'data[1][2][69]', []);
	const en_description = get(params, 'data[1][2][72]', []);

	const images = get(params, 'data[1][2][78]', []);
	const types = get(params, 'data[1][2][79]', []);
	const logo = get(params, 'data[1][2][95]', []);
	const big_logo = get(params, 'data[1][2][96]', []);
	const share = get(params, 'data[1][2][136]', []);
	const version = get(params, 'data[1][2][140]', []);
	const update_desc = get(params, 'data[1][2][144]', []);
	const up_time = get(params, 'data[1][2][145]', []);

	// const gameInfo = {
	// 	name,
	// 	pb_time,
	// 	description,
	// 	count,
	// 	developer,
	// 	developer_detail,
	// 	en_description,
	// 	images,
	// 	types,
	// 	logo,
	// 	big_logo,
	// 	share,
	// 	version,
	// 	update_desc,
	// 	up_time
	// };
	// fs.writeFileSync('info.json', JSON.stringify(gameInfo));

	return {
		name: get(name, '[0]', ''),
		pb_time: {
			str: get(pb_time, '[0]', ''),
			iso: get(pb_time, '[1][0]', 0)
		},
		description: {
			zh: get(description, '[0][1]', ''),
			en: get(en_description, '[0][1]', '')
		},
		download_count: get(count, '[1]', 0),
		developer: {
			name: get(developer, '[0]', ''),
			url: get(developer, '[1][4][2]', ''),
			homepage: get(developer_detail, '[0][5][2]', ''),
			email: get(developer_detail, '[1][0]', '')
		},
		images: images?.[0]?.map((item) => {
			return {
				url: get(item, '[3][2]', ''),
				width: get(item, '[2][0]', 0),
				height: get(item, '[2][1]', 0)
			};
		}),
		types: types?.[0]?.map((item) => {
			return {
				name: get(item, '[0]', ''),
				url: get(item, '[1][4][2]', '')
			};
		}),
		logo: {
			url: get(logo, '[0][3][2]', ''),
			width: get(logo, '[0][2][0]', 0),
			height: get(logo, '[0][2][1]', 0)
		},
		version: get(version, '[0][0][0]', ''),
		config: get(version, '[1][1][0][0][1]', ''),
		update_desc: get(update_desc, '[1][1]', ''),
		up_time: {
			str: get(up_time, '[0][0]', ''),
			iso: get(up_time, '[0][1][0]', 0)
		}
	};
};

const googleDetail = async (url) => {
	if (!url) return {};

	const res = await fetch(url + '&hl=en');
	const html = await res.text();
	// fs.writeFileSync('test.html', html);
	// const html = fs.readFileSync('test.html', 'utf8');
	const $ = cheerio.load(html);

	const _script = $('script[class="ds:5"]').text();
	const reviews = $('.w7Iutd .wVqUob:first .g1rdde').text();
	const score = $('.jILTFe').text();
	const video = $('video source').attr('src') || '';

	let game_detail;

	// 创建一个 URL 对象
	const parsedUrl = new URL(url);
	// 获取查询参数
	const params = new URLSearchParams(parsedUrl.search);
	const id = params.get('id') || '';

	// 解析 js 里面的游戏信息
	const AF_initDataCallback = function (params) {
		const info = parserGameInfoFromScript(params);
		game_detail = {
			google_url: url,
			id,
			reviews: $('.w7Iutd .wVqUob').length === 3 ? reviews : '',
			score,
			video,
			...info
		};
	};

	// 执行 js 代码, 进入 AF_initDataCallback 函数
	eval(_script);

	return game_detail;
};

const getGoogleDetail = async (game) => {
	const url = game.google_detail_url || (await searchGoogleGame(game));
	return await googleDetail(url);
};

module.exports = {
	getGoogleDetail
};
