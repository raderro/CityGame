import { initConfig, state } from '../data/config.js';
import { drawMap } from './MapRenderer.js';
import { setupInputHandlers, triggerEvent } from './InputHandler.js';
import { updateBuildings } from './ResourceManager.js';
import { drawMainMenu } from '../ui/MainMenu.js';
import { loadAvatars } from './ProfileManager.js';
import { loadGameState } from './GameManager.js';
import { drawQuestMenu } from '../ui/QuestMenu.js';
import { quests as allQuests } from '../data/quests.js';
import { checkQuestProgress } from './QuestManager.js';

const menu_sound = new Audio('assets/sounds/menu_sound.mp3');
const game_sound = new Audio('assets/sounds/game_sound.mp3');

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.lastUpdateTime = 0;
    this.updateInterval = 1000;
  }

  start() {
    initConfig(this.canvas, this.ctx);
    setupInputHandlers(this.canvas);
    loadAvatars();
    document.addEventListener('click', () => {
      if (state.isMainMenuVisible) {
        menu_sound.play();
      }
    });
    state.quests = JSON.parse(JSON.stringify(allQuests));

    if (state.selectedProfileIndex !== null) {
      loadGameState();
    }

    this.loop(performance.now());
  }

  loop(currentTime) {
    const deltaTime = currentTime - this.lastUpdateTime;

    if (deltaTime >= this.updateInterval) {
      updateBuildings();
      this.lastUpdateTime = currentTime;
    }

    if (state.isMainMenuVisible) {
      drawMainMenu();
      menu_sound.addEventListener('ended', () => {
        menu_sound.play();
      });
    } else {
      drawMap();
      menu_sound.pause();
      game_sound.play();
      game_sound.addEventListener('ended', () => {
        game_sound.play();
      });
    }

    if (!state.isMainMenuVisible) {

    }

    const now = Date.now();

    if (!state.lastEventTime && !state.isMainMenuVisible) {
      state.lastEventTime = now;
    }

    if (
      !state.showEvent &&
      !state.isMainMenuVisible &&
      now - state.lastEventTime > 120000 &&
      Math.random() < 0.01
    ) {
      state.lastEventTime = now;
      state.isQuestMenuVisible = false;
      state.isBuildingMenuVisible = false;
      triggerEvent();
    }

    if (state.isQuestMenuVisible) {
      drawQuestMenu();
    }

    checkQuestProgress();

    requestAnimationFrame((time) => this.loop(time));
  }
}