import { state, buildingData } from '../data/config.js';
import { drawMap } from './MapRenderer.js';
import { calculateHappiness } from './HappinessManager.js';
import { saveGameState } from './GameManager.js';

export function showBuildingMenu(x, y) {
  if (isTileBlack(x, y)) return;
  state.selectedTile = { x, y };
    updateBuildingMenuItems();
  state.isBuildingMenuVisible = true;
  drawMap();
}

export function showInfoMenu(x, y) {
  const building = state.map[x][y];
  if (!building) return;

  state.selectedTile = { x, y };
  state.isInfoMenuVisible = true;
  drawMap();
}

export function placeBuilding(type) {
  if (!state.selectedTile) return;
  const { x, y } = state.selectedTile;
  const level = 1;
  const levelData = buildingData[type]?.levels?.[level] || buildingData[type]?.levels?.[0];
  if (!levelData) return;

  const cost = levelData.cost;
  const population = levelData.population || 0;
  const energy = levelData.energy || 0;

  if (state.money < cost || state.energy < energy || state.map[x][y]) return;

  state.map[x][y] = {
    type,
    level
  };

  if(type === 'house') state.houses.push({ x, y });
  if(type === 'apartment') state.apartments.push({ x, y });
  if(type === 'mansion') state.mansions.push({ x, y });
  if(type === 'hospital') state.hospitals.push({ x, y });
  if(type === 'office') state.offices.push({ x, y });
  if(type === 'shop') state.shops.push({ x, y });
  if(type === 'gallery') state.galleries.push({ x, y });
  if(type === 'playground') state.playgrounds.push({ x, y });
  if(type === 'powerPlant') state.powerPlants.push({ x, y });
  if(type === 'mine') state.mines.push({ x, y });
  if(type === 'park') state.parks.push({ x, y });   
  if(type === 'school') state.schools.push({x, y});
  if(type === 'university') state.universitets.push({x, y});
  if(type === 'stadion') state.stadions.push({x, y});
  if(type === 'libray') state.librays.push({x, y});
  if(type === 'aquapark') state.aquaparks.push({x, y});
  if(type === 'airport') state.airports.push({x, y});
  if(type === 'militarybase') state.militarybases.push({x, y});
  if(type === 'laboratory') state.laboratories.push({x, y});
  if(type === 'windmill') state.windmills.push({x, y});
  if(population) state.population += population;
  if(type != null) state.buidlings.push({x, y});

  state.money -= cost;
  state.energy -= energy;
  state.isBuildingMenuVisible = false;

  calculateHappiness();
  saveGameState();
  drawMap();
}

export function removeBuilding() {
  const { x, y } = state.selectedTile;
  const building = state.map[x][y];

  if (!building) return;

  const type = building.type;
  const level = building.level || 1;

  const data = buildingData[type];
  const levelData = data.levels?.[level] || {};

  const cost = levelData.cost || data.cost || 0;
  const population = levelData.population || data.population || 0;
  const consumption = levelData.energy || 0;
  const production = levelData.production || 0;

  state.map[x][y] = null;
  state.money += cost / 2;
  
  if(type === "powerPlant"){
    state.energy -= production;
  }
  else if(type === "windmill"){
    state.energy -= production;
  }
  else{
    state.energy += consumption;
  }

  if (population) {
    state.population -= population;
  }

  state.isBuildingMenuVisible = false;
  calculateHappiness();
  saveGameState();
  drawMap();
}

export function updateBuildingMenuItems() {
  const allTypes = Object.keys(state.buildingImages);
  const visibleTypes = allTypes.slice(state.buildingScrollIndex, state.buildingScrollIndex + 4);

  state.buildingMenuItems = visibleTypes.map((type, i) => ({
    type,
    x: 100,
    y: 100 + i * 70,
    width: 200,
    height: 60
  }));
}

function isTileBlack(x, y) {
  const scaledTileSize = state.TILE_SIZE * state.zoom;
  const screenX = x * scaledTileSize + state.cameraOffsetX;
  const screenY = y * scaledTileSize + state.cameraOffsetY;

  try {
    const imageData = state.ctx.getImageData(screenX, screenY, scaledTileSize, scaledTileSize).data;

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];

      const isBlack = r < 50 && g < 50 && b < 50;
      const isBlue = b > 150 && r <= 15 && g > 100;
      const isYellow = r > 150 && g > 150 && b < 170;

      if (isBlack || isBlue || isYellow) return true;
    }
  } catch (err) {
    return false;
  }

  return false;
}
