import { constants } from '../common/constants.js';

const spaceBetweenLives = 32;
let lives = constants.LIVES;
export const livesIndicator = () => {
	for (let i = 0; i < lives; i++) {
		add([
			sprite('Heart'),
			pos(32 + (i * spaceBetweenLives), 16),
			origin('center'),
			area(),
			scale(1),
			'catLives'
		]);
	}

	action('catPlayer', (c) => {
		if (lives !== c.hp()) {
			destroyAll('catLives');

			lives = c.hp();
			for (let i = 0; i < lives; i++) {
				add([
					sprite('Heart'),
					pos(32 + (i * spaceBetweenLives), 16),
					origin('center'),
					area(),
					scale(1),
					'catLives'
				]);
			}
		}
	});
};