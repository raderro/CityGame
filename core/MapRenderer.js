import { state } from '../data/config.js';
import { drawEvent, drawUI } from '../ui/UI.js';
import { drawBuildingMenu, drawInfoMenu } from '../ui/BuildingMenu.js';
import { drawUpgradeMenu } from '../ui/UpgradeMenu.js';

export function drawMap() {
  const {
    map, mapImage, ctx, TILE_SIZE, zoom,
    MAP_WIDTH, MAP_HEIGHT, cameraOffsetX, cameraOffsetY,
    buildingImages
  } = state;

  if (!map || map.length === 0 || map[0].length === 0) return;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const scaledTileSize = TILE_SIZE * zoom;
  ctx.drawImage(
    mapImage,
    cameraOffsetX,
    cameraOffsetY,
    mapImage.width * zoom,
    mapImage.height * zoom
  );

  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 1;

  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const drawX = x * scaledTileSize + cameraOffsetX;
      const drawY = y * scaledTileSize + cameraOffsetY;
      ctx.strokeRect(drawX, drawY, scaledTileSize, scaledTileSize);

      const building = map[x][y];
      if (building) {
        ctx.drawImage(buildingImages[building.type], drawX, drawY, scaledTileSize, scaledTileSize);
      }
    }
  }

  drawUI();
  drawBuildingMenu();
  drawUpgradeMenu();
  drawInfoMenu();
  if (state.showEvent && state.currentEvent) {
  drawEvent(state.currentEvent);
  }
}
