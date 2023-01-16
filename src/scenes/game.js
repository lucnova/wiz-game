import { constants } from '../common/constants.js';
import { loadBackground } from '../components/background.js';
import { livesIndicator } from '../components/livesIndicator.js';
import { getScore, topTimer } from '../components/topTimer.js';

export const game = () => {
	scene('game', () => {
		gravity(3500);

		loadBackground();

		play('begin');
		// * GATO
		const catPlayer = add([
			sprite('Cat'),
			pos(32, height() / 2),
			area(),
			scale(4),
			body({ jumpForce: constants.JUMP_FORCE }),
			health(constants.LIVES),
			'catPlayer'
		]);

		livesIndicator();
		topTimer();

		const catJump = () => {
			if (catPlayer.grounded()) {
				catPlayer.play('jump');
				catPlayer.jump();

				play(`jump${randi(1, 6)}`);
			}
		};

		keyDown('space', () => {
			catJump();
		});
		mouseDown(() => {
			catJump();
		});
		catPlayer.collides('Ghost', () => {
			catPlayer.hurt(1);
			play('hit');
			shake();
		});
		catPlayer.on('death', () => {
			const currentScore = getScore();

			const bestScore = parseFloat(localStorage.getItem('bestScore')) || 0;
			if (currentScore > bestScore) {
				localStorage.setItem('bestScore', currentScore);
				localStorage.setItem('recordSet', 1);
			}
			else {
				localStorage.setItem('recordSet', 0);
			}
			localStorage.setItem('lastScore', currentScore);

			wait(0.1, () => {
				go('lose');
			});
		});

		// * SUELO
		add([rect(width() + 32, constants.FLOOR_HEIGHT + 32), pos(-32, height() - constants.FLOOR_HEIGHT), area(), solid(), color(14, 0, 40), 'ground']);
		catPlayer.on('ground', () => {
			play('landing');
			catPlayer.play('run');
		});

		// * FANTASMAS
		const spawnGhost = () => {
			add([
				sprite('Ghost'),
				scale(3.5),
				area({ scale: 0.7 }),
				pos(width(), height() - constants.FLOOR_HEIGHT),
				origin('botleft'),
				move(LEFT, constants.GHOST_SPEED),
				'Ghost',
			]);

			wait(rand(1, 3), () => {
				spawnGhost();
			});
		};

		wait(2, () => {
			spawnGhost();
		});
	});
};