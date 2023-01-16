
export const loadSprites = () => {
	// * FONDO
	loadSprite('bg_0', '../src/assets/bg/parallax-forest-back-trees.png');
	loadSprite('bg_1', '../src/assets/bg/parallax-forest-middle-trees.png');
	loadSprite('bg_2', '../src/assets/bg/parallax-forest-front-trees.png');
	loadSprite('bg_3', '../src/assets/bg/parallax-forest-lights.png');

	// * GATO
	loadSprite('Cat', '../src/assets/sprites/CatWalk.png', {
		sliceX: 4,
		anims: {
			run: { from: 0, to: 3, loop: true, speed: 16 },
			jump: { from: 1, to: 1 },
		},
	});
	loadSprite('CatBack', '../src/assets/sprites/CatBack.png');

	// * FANTASMAS
	loadSprite('Ghost', '../src/assets/sprites/Ghost.gif');
	loadSprite('Heart', '../src/assets/sprites/Heart.png');

	// * BOTON
	loadSprite('Play_Idle', '../src/assets/sprites/Play_Idle.png');
	loadSprite('Play_Pushed', '../src/assets/sprites/Play_Pushed.png');
};