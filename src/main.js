// Importar como modulo
import kaboom from 'kaboom';

// Inicializar contexto de Kaboom
kaboom();

// * CARGAR SPRITES
//loadSprite('Cat', './assets/sprites/Cat.png');
loadSprite('Cat', './assets/sprites/CatWalk.png', {
	sliceX: 4,
	anims: {
		run: { from: 0, to: 3, loop: true, speed: 16 },
		jump: { from: 1, to: 1 },
	},
});
loadSprite('CatBack', './assets/sprites/CatBack.png');
loadSprite('Ghost', './assets/sprites/Ghost.gif');
loadSprite('Heart', './assets/sprites/Heart.png');

loadSprite('Play_Idle', './assets/sprites/Play_Idle.png');
loadSprite('Play_Pushed', './assets/sprites/Play_Pushed.png');

loadSound('begin', './assets/sounds/sfx_sound_nagger2.wav');

loadSound('landing', './assets/sounds/sfx_movement_jump13_landing.wav');
loadSound('jump1', './assets/sounds/jump/sfx_movement_jump1.wav');
loadSound('jump2', './assets/sounds/jump/sfx_movement_jump2.wav');
loadSound('jump3', './assets/sounds/jump/sfx_movement_jump3.wav');
loadSound('jump4', './assets/sounds/jump/sfx_movement_jump4.wav');
loadSound('jump5', './assets/sounds/jump/sfx_movement_jump5.wav');
loadSound('jump6', './assets/sounds/jump/sfx_movement_jump6.wav');

loadSound('hit', './assets/sounds/sfx_sounds_damage1.wav');

loadSound('powerup', './assets/sounds/sfx_sounds_powerup13.wav');
loadSound('aww', './assets/sounds/CrowdAww.wav');

// * CARGAR SONIDOS

const FLOOR_HEIGHT = 64;
const JUMP_FORCE = 1042;
const GHOST_SPEED = 380;

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
