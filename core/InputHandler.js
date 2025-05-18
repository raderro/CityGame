import { state } from '../data/config.js';
import { drawMap } from './MapRenderer.js';
import { showBuildingMenu, placeBuilding, removeBuilding, showInfoMenu, updateBuildingMenuItems } from './BuildingManager.js';
import { showUpgradeMenu, upgradeBuilding } from './UpgradeManager.js';
import { saveProfiles, setSelectedProfile } from './ProfileManager.js';
import { loadGameState, saveGameState } from './GameManager.js';
import { claimQuestReward } from './QuestManager.js';
import { drawQuestMenu } from '../ui/QuestMenu.js';
import { events } from '../data/events.js';
import { drawEvent } from '../ui/UI.js';

export function setupInputHandlers(canvas) {
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('wheel', handleZoom);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', () => state.isDragging = false);
  canvas.addEventListener('mouseleave', () => state.isDragging = false);
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  window.addEventListener('keydown', handleKeydown);

  canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if (state.isQuestMenuVisible) {
      for (const btn of state.questScrollButtons || []) {
        if (
          x >= btn.x && x <= btn.x + btn.width &&
          y >= btn.y && y <= btn.y + btn.height
        ) {
          if (btn.dir === 'up' && state.questScrollIndex > 0) {
            state.questScrollIndex--;
            playClickSound();
          } else if (
            btn.dir === 'down' &&
            state.questScrollIndex + 4 < state.quests.length
          ) {
            state.questScrollIndex++;
            playClickSound();
          }
        }
      }
    }

    if (state.isBuildingMenuVisible) {
      for (const btn of state.buildingScrollButtons || []) {
        if (
          x >= btn.x && x <= btn.x + btn.width &&
          y >= btn.y && y <= btn.y + btn.height
        ) {
          if (btn.dir === 'up' && state.buildingScrollIndex > 0) {
            state.buildingScrollIndex--;
            playClickSound();
            updateBuildingMenuItems();
          } else if (
            btn.dir === 'down' &&
            state.buildingScrollIndex + 4 < Object.keys(state.buildingImages).length
          ) {
            state.buildingScrollIndex++;
            playClickSound();
            updateBuildingMenuItems();
          }
          return;
        }
      }
    }
  });
}

export function triggerEvent() {
  if (!state.nextEventId) state.nextEventId = 1;
  if (state.nextEventId > events.length) return;

  const event = events.find(e => e.id === state.nextEventId);
  if (!event) return;

  state.currentEvent = event;
  state.showEvent = true;

  state.nextEventId++;

  drawEvent(state.currentEvent);
}

function resolveEvent(choice) {
  if (!state.currentEvent) return;

  const effect = choice === 'accept' ? state.currentEvent.onAccept : state.currentEvent.onReject;

  if (effect.money !== undefined && state.money + effect.money < 0) {
    return;
  }

  if (effect.money !== undefined) state.money += effect.money;
  if (effect.satisfaction !== undefined) state.happinessLevel += effect.satisfaction;

  if (state.happinessLevel > 100) state.happinessLevel = 100;
  if (state.happinessLevel < 0) state.happinessLevel = 0;

  saveGameState();

  state.currentEvent = null;
  state.showEvent = false;
  drawMap();
}

function handleClick(e) {
  if (e.button !== 0 || state.isDragging) return;
  const mouseX = e.offsetX, mouseY = e.offsetY;

  if (state.showEvent && state.currentEvent) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    const canvas = state.ctx.canvas;
    const x = canvas.width / 2 - 300;
    const y = canvas.height / 2 - 150;

    if (
      mouseX >= x + 75 && mouseX <= x + 235 &&
      mouseY >= y + 285 && mouseY <= y + 335
    ) {
      resolveEvent('accept');
      playClickSound();
      return;
    }
    if (
      mouseX >= x + 355 && mouseX <= x + 515 &&
      mouseY >= y + 285 && mouseY <= y + 335
    ) {
      resolveEvent('reject');
      playClickSound();
      return;
    }
    return;
  }

  if (state.isBuildingMenuVisible) {
    for (const item of state.buildingMenuItems) {
      if (
        mouseX >= item.x && mouseX <= item.x + item.width &&
        mouseY >= item.y && mouseY <= item.y + item.height
      ) {
        if (item.type === "close") {
          state.isBuildingMenuVisible = false;
          playClickSound();
          drawMap();
        } else {
          placeBuilding(item.type);
          playClickSound();
          drawMap();
        }
        return;
      }
    }
    return;
  }

  if (state.isUpgradeMenuVisible) {
    for (const item of state.upgradeMenuButtons) {
      if (
        mouseX >= item.x && mouseX <= item.x + item.width &&
        mouseY >= item.y && mouseY <= item.y + item.height
      ) {
        if (item.action === "close") {
          state.isUpgradeMenuVisible = false;
          state.selectedTile = null;
          state.isInfoMenuVisible = false;
          playClickSound();
        } else if (item.action === "upgrade") {
          upgradeBuilding();
          state.isUpgradeMenuVisible = false;
          playClickSound();
        } else if (item.action === "info") {
          const building = state.map[state.selectedTile.x][state.selectedTile.y];
          playClickSound();
          if (building) {
            showInfoMenu(state.selectedTile.x, state.selectedTile.y);
            state.isUpgradeMenuVisible = false;
          }
        } else if (item.action === "remove") {
          removeBuilding();
          playClickSound();
          state.isUpgradeMenuVisible = false;
        }
        drawMap();
        return;
      }
    }
    return;
  }

  if (state.isInfoMenuVisible) {
    const menuX = state.ctx.canvas.width / 2 - 300;
    const menuY = state.ctx.canvas.height / 2 - 150;
    const menuW = 650;
    const closeButtonX = menuX + menuW - 110;
    const closeButtonY = menuY + 300;
    const closeButtonWidth = 100;
    const closeButtonHeight = 40;

    if (
      mouseX >= closeButtonX && mouseX <= closeButtonX + closeButtonWidth &&
      mouseY >= closeButtonY && mouseY <= closeButtonY + closeButtonHeight
    ) {
      state.isInfoMenuVisible = false;
      state.selectedTile = null;
      playClickSound();
      drawMap();
      return;
    }

    return;
  }

  if (state.questButton &&
    mouseX >= state.questButton.x &&
    mouseX <= state.questButton.x + state.questButton.width &&
    mouseY >= state.questButton.y &&
    mouseY <= state.questButton.y + state.questButton.height
  ) {
    state.isQuestMenuVisible = !state.isQuestMenuVisible;
    playClickSound();
    drawMap();
    return;
  }

  if (state.isQuestMenuVisible) {
    const { offsetX, offsetY } = e;

    for (const btn of state.questButtons) {
      if (
        offsetX >= btn.x &&
        offsetX <= btn.x + btn.width &&
        offsetY >= btn.y &&
        offsetY <= btn.y + btn.height
      ) {
        claimQuestReward(btn.questId);
        playClickSound();
        drawQuestMenu();
        saveGameState();
        return;
      }
    }

    const close = state.questCloseButton;
    if (
      offsetX >= close.x &&
      offsetX <= close.x + close.width &&
      offsetY >= close.y &&
      offsetY <= close.y + close.height
    ) {
      state.isQuestMenuVisible = false;
      playClickSound();
      drawMap();
      return;
    }
  }

  if (state.isQuestMenuVisible && state.questCloseButton) {
    const btn = state.questCloseButton;
    if (
      mouseX >= btn.x && mouseX <= btn.x + btn.width &&
      mouseY >= btn.y && mouseY <= btn.y + btn.height
    ) {
      state.isQuestMenuVisible = false;
      playClickSound();
      drawMap();
      return;
    }
  }

  if (e.button !== 0 || state.isDragging) return;

  if (state.sellGoldButton) {
    const btn = state.sellGoldButton;
    if (
      mouseX >= btn.x && mouseX <= btn.x + btn.width &&
      mouseY >= btn.y && mouseY <= btn.y + btn.height
    ) {
      const multiplier = state.sellMultiplier || 1;
      const goldToSell = Math.min(state.gold, 50 * multiplier);
      const pricePerGold = 5;
      if (goldToSell > 0) {
        state.gold -= goldToSell;
        state.money += goldToSell * pricePerGold;
        playClickSound();
        drawMap();
      }
      return;
    }
  }

  if (state.isMainMenuVisible) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    const profiles = state.profiles;
    const boxSize = 120;
    const spacingX = 60;
    const spacingY = 40;
    const cols = 2;
    const rows = Math.ceil(profiles.length / cols);
    const totalWidth = cols * boxSize + (cols - 1) * spacingX;
    const startX = state.canvas.width / 2 - totalWidth / 2;
    const startY = 360;

    profiles.forEach((profile, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (boxSize + spacingX);
      const y = startY + row * (boxSize + spacingY + 30);

      if (
        mouseX >= x && mouseX <= x + boxSize &&
        mouseY >= y && mouseY <= y + boxSize
      ) {
        state.selectedProfileIndex = i;
        playClickSound();
        setSelectedProfile(i);
        return;
      }
    });

    if (
      state.createProfileBtn &&
      mouseX >= state.createProfileBtn.x &&
      mouseX <= state.createProfileBtn.x + state.createProfileBtn.width &&
      mouseY >= state.createProfileBtn.y &&
      mouseY <= state.createProfileBtn.y + state.createProfileBtn.height
    ) {
      state.creatingProfile = true;
      playClickSound();
      return;
    }

    if (
      state.selectedProfileIndex !== null &&
      state.playBtn &&
      mouseX >= state.playBtn.x &&
      mouseX <= state.playBtn.x + state.playBtn.width &&
      mouseY >= state.playBtn.y &&
      mouseY <= state.playBtn.y + state.playBtn.height &&
      state.creatingProfile === false
    ) {
      state.isMainMenuVisible = false;
      loadGameState();
      playClickSound();
      drawMap();
      return;
    }

    if (state.createProfileCloseButton) {
      const btn = state.createProfileCloseButton;
      if (
        mouseX >= btn.x && mouseX <= btn.x + btn.width &&
        mouseY >= btn.y && mouseY <= btn.y + btn.height
      ) {
        state.creatingProfile = false;
        state.isEditingUsername = false;
        state.newProfileName = "";
        state.newProfileAvatar = null;
        playClickSound();
        drawMap();
        return;
      }
    }

    if (state.creatingProfile) {
      const usernameFieldX = state.canvas.width / 2 - 100;
      const usernameFieldY = 240;
      const usernameFieldWidth = 200;
      const usernameFieldHeight = 35;

      if (
        mouseX >= usernameFieldX && mouseX <= usernameFieldX + usernameFieldWidth &&
        mouseY >= usernameFieldY && mouseY <= usernameFieldY + usernameFieldHeight
      ) {
        state.isEditingUsername = true;
        playClickSound();
      } else {
        state.isEditingUsername = false;
        playClickSound();
      }

      if (state.creatingProfile) {
        const startX = state.canvas.width / 2 - 100;
        const startY = 330;
        const avatarSize = 50;
        const spacing = 60;

        state.availableAvatars.forEach((avatar, i) => {
          const x = startX + i * spacing;
          const y = startY;

          if (
            mouseX >= x && mouseX <= x + avatarSize &&
            mouseY >= y && mouseY <= y + avatarSize
          ) {
            state.newProfileAvatar = avatar;
          }
        });
      }

      if (
        mouseX >= state.canvas.width / 2 - 75 &&
        mouseX <= state.canvas.width / 2 + 75 &&
        mouseY >= 400 && mouseY <= 440
      ) {
        if (state.newProfileName.trim()) {
          const newProfile = {
            username: state.newProfileName,
            avatar: state.newProfileAvatar || state.availableAvatars[0]
          };
          const updated = [...state.profiles, newProfile];
          saveProfiles(updated);
          state.creatingProfile = false;
          state.newProfileName = '';
          state.selectedProfileIndex = updated.length - 1;
          setSelectedProfile(state.selectedProfileIndex);
        }
        return;
      }
    }

    return;
  }

  const worldX = (mouseX - state.cameraOffsetX) / state.zoom;
  const worldY = (mouseY - state.cameraOffsetY) / state.zoom;
  const x = Math.floor(worldX / state.TILE_SIZE);
  const y = Math.floor(worldY / state.TILE_SIZE);

  if (x >= 0 && y >= 0 && x < state.MAP_WIDTH && y < state.MAP_HEIGHT) {
    if (state.map[x][y]) {
      state.selectedTile = { x, y };

      if (state.isBuildingMenuVisible) {
        state.isBuildingMenuVisible = false;
        showUpgradeMenu(x, y);
        playClickSound();
        drawMap();
      } else {
        if (!state.isQuestMenuVisible) {
          showUpgradeMenu(x, y);
          playClickSound();
        }
        drawMap();
      }
      return;
    } else {
      if (!state.isQuestMenuVisible) {
        showBuildingMenu(x, y);
        playClickSound();
        state.isUpgradeMenuVisible = false;
      }
      drawMap();
      return;
    }
  }
}

function handleZoom(e) {
  if (state.isMainMenuVisible) return;
  e.preventDefault();
  state.zoom = e.deltaY < 0 ? state.zoom + 0.1 : Math.max(0.5, state.zoom - 0.1);
  drawMap();
}

function handleMouseDown(e) {
  if (e.button === 2) {
    state.isDragging = true;
    state.dragStart = { x: e.clientX, y: e.clientY };
    state.cameraStart = { x: state.cameraOffsetX, y: state.cameraOffsetY };
  }
}

function handleMouseMove(e) {
  if (state.isDragging) {
    const dx = e.clientX - state.dragStart.x;
    const dy = e.clientY - state.dragStart.y;
    state.cameraOffsetX = state.cameraStart.x + dx;
    state.cameraOffsetY = state.cameraStart.y + dy;
    drawMap();
  }
}

function handleKeydown(e) {
  if (state.isEditingUsername && e.key.length === 1) {
    state.newProfileName += e.key;
  } else if (e.key === "Backspace") {
    state.newProfileName = state.newProfileName.slice(0, -1);
  }
}

function playClickSound() {
  if (state.clickSound) {
    state.clickSound.currentTime = 0;
    state.clickSound.play().catch(() => { });
  }
}
