import cat from '../sprites/CatWalk.png';

import catBack from '../sprites/CatBack.png';
import ghost from '../sprites/Ghost.gif';
import heart from '../sprites/Heart.png';

import playIdle from '../sprites/Play_Idle.png';
import playPushed from '../sprites/Play_Pushed.png';

export const loadSprites = () => {
	loadSprite('Cat', cat, {
		sliceX: 4,
		anims: {
			run: { from: 0, to: 3, loop: true, speed: 16 },
			jump: { from: 1, to: 1 },
		},
	});
	loadSprite('CatBack', catBack);
	loadSprite('Ghost', ghost);
	loadSprite('Heart', heart);

	loadSprite('Play_Idle', playIdle);
	loadSprite('Play_Pushed', playPushed);
};