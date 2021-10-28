// Importar como modulo
import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

// Inicializar contexto de Kaboom
kaboom();

// * CARGAR SPRITES
loadSprite('Cat', 'sprites/Cat.png');
loadSprite('CatFront', 'sprites/CatFront.png');
loadSprite('Ghost', 'sprites/Ghost.gif');

// * ESCENA DEL JUEGO INICIAL
scene('game', () => {
	// * GATO
	const catPlayer = add([sprite('Cat'), pos(80, 40), area(), scale(3), body({ jumpForce: 1024 })]);
	keyPress('space', () => {
		if (catPlayer.grounded()) {
			catPlayer.jump();
		}
	});
	catPlayer.collides('Ghost', () => {
		addKaboom(catPlayer.pos);
		shake();
		go('lose');
	});

	// * SUELO
	add([rect(width() + 32, 48 + 32), pos(-32, height() - 48), area(), solid(), color(14, 0, 40)]);

	// * FANTASMAS
	const spawnGhost = () => {
		add([sprite('Ghost'), scale(2.5), area(), pos(width(), height() - 48), origin('botleft'), move(LEFT, 400), 'Ghost']);

		wait(rand(1, 3), () => {
			spawnGhost();
		});
	};
	spawnGhost();
});

scene('lose', () => {
	add([sprite('CatFront'), pos(width() / 2 - 115, height() / 2 + 32), scale(10)]);
	add([text(':('), pos(center()), origin('center')]);
});

go('game');
