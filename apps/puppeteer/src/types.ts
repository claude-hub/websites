interface Game {
	origin_url: string;
	text: string;
	google_play: string;
	found: boolean;
	google_id: string;
}

type PartialGame = Partial<Game>;