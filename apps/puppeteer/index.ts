import { isEmpty } from 'lodash';
import games from './games.json';

const gameList = games.filter((game) => {
	const { app_detail, google_detail } = game;
	return !isEmpty(app_detail) || !isEmpty(google_detail);
});

export { gameList };
