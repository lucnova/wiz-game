import { constants } from '../common/constants.js';
import { livesIndicator } from '../components/livesIndicator.js';

export const game = () => {
	scene('game', () => {
		play('begin');
		// * GATO
		const catPlayer = add([
			sprite('Cat'),
			pos(32, height() / 2),
			area(),
			scale(3),
			body({ jumpForce: constants.JUMP_FORCE, weight: 1.5 }),
			health(3),
			'catPlayer'
		]);

		livesIndicator();

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
				scale(2.5),
				area(),
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