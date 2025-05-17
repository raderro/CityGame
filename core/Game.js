import { initConfig, state } from '../data/config.js';
import { drawMap } from './MapRenderer.js';
import { setupInputHandlers } from './InputHandler.js';
import { updateBuildings } from './ResourceManager.js';
import { drawMainMenu } from '../ui/MainMenu.js';
import { loadAvatars } from './ProfileManager.js';
import { loadGameState } from './GameManager.js';
import { drawQuestMenu } from '../ui/QuestMenu.js';
import { quests as allQuests } from '../data/quests.js';
import { checkQuestProgress } from './QuestManager.js';

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
    } else {
      drawMap();
    }

    if (state.isQuestMenuVisible) {
      drawQuestMenu();
    }

    checkQuestProgress();

    requestAnimationFrame((time) => this.loop(time));
  }
}
