import { exit } from 'process';

const fs = require('fs');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const original = 'https://poki.com';
// const googleGames = 'https://play.google.com/store/games';
const googlePlay = 'https://play.google.com';
const googlePlaySearchUrl = `${googlePlay}/store/search?q=`;
const googleSearchUrl = 'https://www.google.com/search?q=';

const gamesFileName = 'games.json';

interface Game {
  origin_url: string;
  text: string;
  google_play: string;
  found: boolean;
  google_id: string;
}

type PartialGame = Partial<Game>;

const getOriginGameList = async (): Promise<PartialGame[]> => {
  fs.existsSync(gamesFileName) || fs.writeFileSync(gamesFileName, '[]');

  const gamesFile = fs.readFileSync(gamesFileName, 'utf8');

  const games: PartialGame[] = JSON.parse(gamesFile);
  let hasChange = false;

  const res = await fetch(original + '/en');
  const html = await res.text();
  const $ = cheerio.load(html);
  const a = $('.vtbwTfQNi80Hes0DzmGs:first a');
  a.each((i: number, element: Element) => {
    const gameName = $(element).text();
    const gameUrl = original + $(element).attr('href');

    // 如果游戏列表中没有这个游戏，则添加
    if (games.every(g => g.origin_url !== gameUrl)) {
      hasChange = true;
      games.push({
        origin_url: gameUrl,
        text: gameName
      });
    }
  });

  if (hasChange) {
    fs.writeFileSync(gamesFileName, JSON.stringify(games, null, 2));
  }

  return games;
};

const getGooglePlayUrl = async (game: PartialGame): Promise<PartialGame> => {
  if (game.google_id || game.found === false) return game;

  // &hl=en 为英文
  const searchUrl = googlePlaySearchUrl + game.text + '&hl=en';
  console.log('search url: ', searchUrl);

  const res = await fetch(searchUrl);
  const html = await res.text();
  const $ = cheerio.load(html);
  const a = $('.XUIuZ a');
  const urlString = $(a).attr('href');
  // 如果没有搜索结果，则终止程序
  if (!urlString) {
    console.error('No search result');
    // exit(0);
    return {
      ...game,
      found: false
    };
  }

  const detailUrl = googlePlay + urlString;
  // 创建一个 URL 对象
  const parsedUrl = new URL(detailUrl);
  console.log('result url: ', detailUrl);

  // 获取查询参数
  const params = new URLSearchParams(parsedUrl.search);
  const id = params.get('id') || '';
  return {
    ...game,
    google_play: detailUrl,
    google_id: id,
    found: true
  };
};

const getAppStoreUrl = async (game: PartialGame): Promise<PartialGame> => {
  if (game.found) {

    const searchUrl = googleSearchUrl + `${game.text} site:apps.apple.com`;
    console.log('google search url: ', searchUrl);

    const res = await fetch(searchUrl);
    const html = await res.text();
    const $ = cheerio.load(html);

  }

  return game;
};

const searchGames = async () => {
  const games = await getOriginGameList();
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   args: ['--lang=en-US']
  // });
  // const page = await browser.newPage();
  // await page.setViewport({ width: 1360, height: 780 });

  // await page.goto(googleGames + games[0].text);

  // const loginBtn = await page.$('.loginBtn .log')

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    const res = await getGooglePlayUrl(game);

    // await getAppStoreUrl(res);

    games[i] = res;
    fs.writeFileSync(gamesFileName, JSON.stringify(games, null, 2));
  }
};

module.exports = { searchGames };
