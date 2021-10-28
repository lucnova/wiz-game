// Importar como modulo
import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

// Inicializar contexto de Kaboom
kaboom();

// * CARGAR SPRITES
loadSprite('Cat', 'sprites/Cat.png');
loadSprite('CatFront', 'sprites/CatFront.png');
loadSprite('Ghost', 'sprites/Ghost.gif');

loadSound('begin', '/assets/sounds/sfx_sound_nagger2.wav');

loadSound('jump1', '/assets/sounds/jump/sfx_movement_jump1.wav');
loadSound('jump2', '/assets/sounds/jump/sfx_movement_jump2.wav');
loadSound('jump3', '/assets/sounds/jump/sfx_movement_jump3.wav');
loadSound('jump4', '/assets/sounds/jump/sfx_movement_jump4.wav');
loadSound('jump5', '/assets/sounds/jump/sfx_movement_jump5.wav');
loadSound('jump6', '/assets/sounds/jump/sfx_movement_jump6.wav');

loadSound('hit', '/assets/sounds/sfx_sounds_damage1.wav');

// * CARGAR SONIDOS

const FLOOR_HEIGHT = 64;
const JUMP_FORCE = 1024;
const GHOST_SPEED = 380;

// * ESCENA DEL JUEGO INICIAL
scene('game', () => {
	play('begin');
	// * GATO
	const catPlayer = add([sprite('Cat'), pos(32, height() / 2), area(), scale(3), body({ jumpForce: JUMP_FORCE, weight: 1.5 })]);

	const catJump = () => {
		if (catPlayer.grounded()) {
			catPlayer.jump();

			play(`jump${parseInt(rand(1, 6))}`);
		}
	};

	keyPress('space', () => {
		catJump();
	});
	mouseDown(() => {
		catJump();
	});
	catPlayer.collides('Ghost', () => {
		play('hit');
		shake();

		wait(0.1, () => {
			go('lose');
		});
	});

	// * SUELO
	add([rect(width() + 32, FLOOR_HEIGHT + 32), pos(-32, height() - FLOOR_HEIGHT), area(), solid(), color(14, 0, 40)]);

	// * FANTASMAS
	const spawnGhost = () => {
		add([
			sprite('Ghost'),
			scale(2.5),
			area(),
			pos(width(), height() - FLOOR_HEIGHT),
			origin('botleft'),
			move(LEFT, GHOST_SPEED),
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

scene('lose', () => {
	add([sprite('CatFront'), pos(width() / 2 - 115, height() / 2 + 32), scale(10)]);
	add([text(':('), pos(center()), origin('center')]);

	mouseDown(() => {
		go('game');
	});
});

go('game');
