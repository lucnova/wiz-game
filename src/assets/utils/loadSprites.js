
export const loadSprites = () => {
	loadSprite('Cat', '../src/assets/sprites/CatWalk.png', {
		sliceX: 4,
		anims: {
			run: { from: 0, to: 3, loop: true, speed: 16 },
			jump: { from: 1, to: 1 },
		},
	});
	loadSprite('CatBack', '../src/assets/sprites/CatBack.png');
	loadSprite('Ghost', '../src/assets/sprites/Ghost.gif');
	loadSprite('Heart', '../src/assets/sprites/Heart.png');

	loadSprite('Play_Idle', '../src/assets/sprites/Play_Idle.png');
	loadSprite('Play_Pushed', '../src/assets/sprites/Play_Pushed.png');
};