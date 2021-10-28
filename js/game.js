// Importar como modulo
import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

// Inicializar contexto de Kaboom
kaboom();

// * CARGAR SPRITES
loadSprite('Cat', 'sprites/Cat.png');
loadSprite('Ghost', 'sprites/Ghost.gif');

// * ESCENA DEL JUEGO INICIAL
scene('game', () => {
	// * COOLSPOT
	const coolSpot = add([sprite('Cat'), pos(80, 40), area(), scale(3), body({ jumpForce: 1024 })]);
	keyPress('space', () => {
		if (coolSpot.grounded()) {
			coolSpot.jump();
		}
	});
	coolSpot.collides('Ghost', () => {
		addKaboom(coolSpot.pos);
		shake();
	});

	// * SUELO
	add([rect(width() + 32, 48 + 32), pos(-32, height() - 48), area(), solid(), color(14, 0, 40)]);

	// * CANGREJOS
	const spawnCrab = () => {
		add([sprite('Ghost'), scale(2.5), area(), pos(width(), height() - 48), origin('botleft'), move(LEFT, 400), 'Ghost']);

		wait(rand(1, 3), () => {
			spawnCrab();
		});
	};
	spawnCrab();
});

go('game');