// https://api.gamemonetize.com/video.js

var url = window.location != window.parent.location ? document.referrer : document.location.href;
var getDomain = url.replace(/^(?:https?:\/\/)?(?:\/\/)?(?:www\.)?/i, '').split('/')[0];
var gameName = VIDEO_OPTIONS.game;
var gameId = VIDEO_OPTIONS.gameid;
var getHeight = VIDEO_OPTIONS.height;
var getWidth = VIDEO_OPTIONS.width;
var getColor = VIDEO_OPTIONS.color;
var getAds = VIDEO_OPTIONS.getAds;

if (getAds == null) {
	var getAds = true;
}
var apndwalkthrough =
	'<style type="text/css">#gamemonetize-video, #gamemonetize-walkthrough { width:' +
	getWidth +
	'; height:' +
	getHeight +
	'; }</style><iframe id="gamemonetize-walkthrough" style="border-radius: 5px;" src="https://gamemonetize.video/index.php?domain=' +
	getDomain +
	'&gameid=' +
	encodeURIComponent(gameId) +
	'&game=' +
	encodeURIComponent(gameName) +
	'&getads=' +
	encodeURIComponent(getAds) +
	'&color=' +
	encodeURIComponent(getColor) +
	'" scrolling="no" frameborder="0" allowfullscreen="allowfullscreen"></iframe>';
// 使用原生js获取元素并添加内容
document.getElementById('gamemonetize-video').innerHTML += apndwalkthrough;

if (location.pathname == '/' && location.hash.length <= 1 && location.search.length <= 1) {
	window.open('https://gamemonetize.com', '_self', false);
}
