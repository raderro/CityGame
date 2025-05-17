import { state, buildingData } from '../data/config.js';
import { drawMap } from './MapRenderer.js';
import { calculateHappiness } from './HappinessManager.js';
import { saveGameState } from './GameManager.js';

export function showUpgradeMenu(x, y) {
  state.selectedTile = { x, y };
  state.isUpgradeMenuVisible = true;
  drawMap();
}

export function upgradeBuilding() {
  const { x, y } = state.selectedTile;
  const building = state.map[x][y];

  if (!building) return;

  const data = buildingData[building.type];
  const currentLevel = building.level;
  const nextLevel = currentLevel + 1;

  const nextLevelData = data.levels[nextLevel];
  const previousLevelData = data.levels[currentLevel];

  if (!nextLevelData) return;

  const upgradeCost = nextLevelData.cost;

  if (state.money < upgradeCost) {
    return;
  }

  if (!state.upgradedBuildings) {
    state.upgradedBuildings = [];
  }
  if (!state.upgradedBuildings.includes(building)) {
    state.upgradedBuildings.push(building);
  }

  state.money -= upgradeCost;
  building.level = nextLevel;
  const oldEnergy = data.levels[currentLevel].energy || 0;
  const newEnergy = nextLevelData.energy || 0;
  const energyDiff = newEnergy - oldEnergy;
  state.energy -= energyDiff;

  if (data.levels[currentLevel].population && nextLevelData.population) {
    const diff = nextLevelData.population - data.levels[currentLevel].population;
    state.population += diff;
  }

  if (building.type === 'windmill') {
    state.energy += (nextLevelData.production - previousLevelData.production ) || 0;
  }

  if (building.type === 'powerPlant') {
    state.energy += (nextLevelData.production - previousLevelData.production ) || 0;
  }
  
  calculateHappiness();
  saveGameState();
  drawMap();
}
