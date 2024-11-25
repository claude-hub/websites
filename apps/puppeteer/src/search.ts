const puppeteer = require('puppeteer');

const original = 'https://poki.com';
// const googleGames = 'https://play.google.com/store/games';

const searchGames = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--lang=en-US']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1360, height: 780 });

  await page.goto(original);
};

module.exports = { searchGames };
