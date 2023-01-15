// Importar como modulo
import kaboom from 'kaboom';
import { loadSprites } from './src/assets/utils/loadSprites';
import { loadSounds } from './src/assets/utils/loadSounds.js';

const FLOOR_HEIGHT = 64;
const JUMP_FORCE = 1042;
const GHOST_SPEED = 380;

// Inicializar contexto de Kaboom
kaboom({
	global: true,
	fullscreen: true
});

// * CARGAR SONIDOS
loadSounds();

// * CARGAR SPRITES
loadSprites();

// * ESCENA DEL JUEGO INICIAL
scene('game', () => {
	play('begin');
	// * GATO
	const catPlayer = add([
		sprite('Cat'),
		pos(32, height() / 2),
		area(),
		scale(3),
		body({ jumpForce: JUMP_FORCE, weight: 1.5 }),
		health(3),
	]);

	const catJump = () => {
		if (catPlayer.isGrounded()) {
			catPlayer.play('jump');
			catPlayer.jump();

			play(`jump${randi(1, 6)}`);
		}
	};

	onKeyDown('space', () => {
		catJump();
	});
	onMouseDown(() => {
		catJump();
	});
	catPlayer.onCollide('Ghost', () => {
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
	add([rect(width() + 32, FLOOR_HEIGHT + 32), pos(-32, height() - FLOOR_HEIGHT), area(), solid(), color(14, 0, 40), 'ground']);
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
	const catto = add([
		sprite('CatBack'),
		pos(width() / 2 - 115, height() / 2 + 32),
		area(),
		scale(10),
		'catto'
	]);
	add([text(':('), pos(center()), origin('center')]);

	if (isTouch()) {
		onTouchEnd((id, pos) => {
			if (catto.hasPoint(pos)) go('menu');
		});
	}
	else {
		catto.onClick(() => {
			go('menu');
		});
	}
});

scene('menu', () => {
	add([text('Wiz'), pos(width() / 2, height() / 2 - 50), origin('center')]);

	const playBtn = add([
		sprite('Play_Idle'),
		pos(width() / 2, height() / 2 + 128),
		origin('center'),
		area(),
		scale(2),
		'play_button'
	]);
	const heart = add([
		sprite('Heart'),
		pos(width() / 2, height() / 2 + 256),
		origin('center'),
		area(),
		scale(2),
		'heart'
	]);

	if (isTouch()) {
		onTouchEnd((id, pos) => {
			if (playBtn.hasPoint(pos)) go('game');
			else if (heart.hasPoint(pos)) go('secret');
		});
	}
	else {
		playBtn.onClick(() => {
			go('game');
		});
		heart.onClick(() => {
			go('secret');
		});
	}

	shake();
	wait(0.02, () => {
		play('powerup');
	});
});

scene('secret', () => {
	play('aww');
	add([text('Te amo'), pos(width() / 2, height() / 2 - 50), origin('center')]);
	add([text('mucho'), pos(width() / 2, height() / 2), origin('center')]);
	add([text('Cassandra'), pos(width() / 2, height() / 2 + 50), origin('center')]);
	const heart = add([
		sprite('Heart'),
		pos(width() / 2, height() / 2 + 128),
		origin('center'),
		area(),
		scale(5),
		'heart'
	]);
	shake();

	if (isTouch()) {
		onTouchEnd((id, pos) => {
			if (heart.hasPoint(pos)) go('menu');
		});
	}
	else {
		heart.onClick(() => {
			go('menu');
		});
	}

});

go('menu');
