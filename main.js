import kaboom from "https://unpkg.com/kaboom@2000.0.0/dist/kaboom.mjs";

import { loadScenes } from './src/utils/loadScenes.js';
import { loadSprites } from './src/utils/loadSprites.js';
import { loadSounds } from './src/utils/loadSounds.js';

const buttonAudioContext = document.getElementById('audioCtx');
buttonAudioContext.click();

// Inicializar contexto de Kaboom
kaboom({
	global: true,
	fullscreen: true
});

// * CARGAR SONIDOS
loadSounds();

// * CARGAR SPRITES
loadSprites();

// * CARGAR ESCENAS
loadScenes();

go('menu');
