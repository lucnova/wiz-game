import { menu } from '../scenes/menu.js';
import { game } from '../scenes/game.js';
import { lose } from '../scenes/lose.js';
import { secret } from '../scenes/secret.js';

export const loadScenes = () => {
	menu()
	game();
	lose();
	secret();
};
