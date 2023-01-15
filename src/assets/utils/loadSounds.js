import begin from '../sounds/sfx_sound_nagger2.wav';

import landing from '../sounds/sfx_movement_jump13_landing.wav';
import jump1 from '../sounds/jump/sfx_movement_jump1.wav';
import jump2 from '../sounds/jump/sfx_movement_jump2.wav';
import jump3 from '../sounds/jump/sfx_movement_jump3.wav';
import jump4 from '../sounds/jump/sfx_movement_jump4.wav';
import jump5 from '../sounds/jump/sfx_movement_jump5.wav';
import jump6 from '../sounds/jump/sfx_movement_jump6.wav';

import hit from '../sounds/sfx_sounds_damage1.wav';

import powerup from '../sounds/sfx_sounds_powerup13.wav';
import aww from '../sounds/CrowdAww.wav';

export const loadSounds = () => {
	loadSound('begin', begin);

	loadSound('landing', landing);
	loadSound('jump1', jump1);
	loadSound('jump2', jump2);
	loadSound('jump3', jump3);
	loadSound('jump4', jump4);
	loadSound('jump5', jump5);
	loadSound('jump6', jump6);

	loadSound('hit', hit);

	loadSound('powerup', powerup);
	loadSound('aww', aww);
};