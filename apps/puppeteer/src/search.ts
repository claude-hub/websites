import { exit } from 'process';

const fs = require('fs');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const original = 'https://poki.com';
// const googleGames = 'https://play.google.com/store/games';
const googlePlay = 'https://play.google.com';
const googleSearchUrl = `${googlePlay}/store/search?q=`;

const gamesFileName = 'games.json';

interface Game {
  origin_url: string;
  text: string;
  detail_url: string;
  id: string;
}

type PartialGame = Partial<Game>;

const getOriginGameList = async (): Promise<PartialGame[]> => {
  fs.existsSync(gamesFileName) || fs.writeFileSync(gamesFileName, '[]');

  const gamesFile = fs.readFileSync(gamesFileName, 'utf8');

  let games = [];
  try {
    games = JSON.parse(gamesFile);
  } catch (e) {}

  if (games.length === 0) {
    const res = await fetch(original);
    const html = await res.text();
    const $ = cheerio.load(html);
    const a = $('.vtbwTfQNi80Hes0DzmGs:first a');
    a.each((i: number, element: Element) => {
      games.push({
        origin_url: $(element).attr('href'),
        text: $(element).text()
      });
    });
    fs.writeFileSync(gamesFileName, JSON.stringify(games, null, 2));
  }
  return games;
};

const getGameUrl = async (game: PartialGame): Promise<PartialGame> => {
  if (game.id) game;
  const searchUrl = googleSearchUrl + game.text;
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
    return game;
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
    detail_url: detailUrl,
    id
  };
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
    const res = await getGameUrl(game);
    // 如果有变更，则写入文件
    if (!game.id && res.id) {
      games[i] = res;
      fs.writeFileSync(gamesFileName, JSON.stringify(games, null, 2));
    }
  }
};

module.exports = { searchGames };
