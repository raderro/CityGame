import { state, buildingData } from '../data/config.js';

export function drawUpgradeMenu() {
  if (!state.isUpgradeMenuVisible || !state.selectedTile) return;

  const { ctx, uiIcons } = state;
  const { x, y } = state.selectedTile;
  const scaledTileSize = state.TILE_SIZE * state.zoom;

  const iconSize = 54;
  const spacing = 12;
  const buttonCount = 3;
  const menuWidth = (iconSize + spacing) * buttonCount + spacing + 40;
  const menuHeight = 90;

  const menuX = x * scaledTileSize + state.cameraOffsetX + scaledTileSize / 2 - menuWidth / 2;
  const menuY = y * scaledTileSize + state.cameraOffsetY + scaledTileSize + 5;

  ctx.fillStyle = "#2C3E50";
  ctx.strokeStyle = "#34495E";
  ctx.lineWidth = 4;
  ctx.fillRect(menuX, menuY, menuWidth, menuHeight);
  ctx.strokeRect(menuX, menuY, menuWidth, menuHeight);

  const buttons = [
    { icon: uiIcons.info, action: "info" },
    { icon: uiIcons.upgrade, action: "upgrade" },
    { icon: uiIcons.remove, action: "remove" }
  ];

  state.upgradeMenuButtons = [];

  buttons.forEach((btn, i) => {
    const btnX = menuX + spacing + i * (iconSize + spacing);
    const btnY = menuY + 10;

    ctx.drawImage(btn.icon, btnX, btnY, iconSize, iconSize);

    if (btn.action === "upgrade") {
      const tile = state.map[x][y];
      if (tile) {
        const buildingInfo = buildingData[tile.type];
        const currentLevel = tile.level || 1;
        const nextLevel = currentLevel + 1;
        const nextData = buildingInfo?.levels?.[nextLevel];

        if (nextData && nextData.cost !== undefined) {
          const costText = `$${nextData.cost}`;
          ctx.fillStyle = "#ECF0F1";
          ctx.font = "14px 'Arial', sans-serif";
          const textWidth = ctx.measureText(costText).width;
          ctx.fillText(costText, btnX + (iconSize - textWidth) / 2, btnY + iconSize + 16);
        }
      }
    }

    state.upgradeMenuButtons.push({
      ...btn,
      x: btnX,
      y: btnY,
      width: iconSize,
      height: iconSize
    });
  });

  const closeBtnSize = 30;
  const closeBtnX = menuX + menuWidth - closeBtnSize - spacing;
  const closeBtnY = menuY + (menuHeight - closeBtnSize) / 2;

  ctx.fillStyle = "#E74C3C";
  ctx.fillRect(closeBtnX, closeBtnY, closeBtnSize, closeBtnSize);

  ctx.strokeStyle = "#C0392B";
  ctx.strokeRect(closeBtnX, closeBtnY, closeBtnSize, closeBtnSize);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 18px 'Arial', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("X", closeBtnX + closeBtnSize / 2, closeBtnY + closeBtnSize / 2 + 1);

  state.upgradeMenuButtons.push({
    action: "close",
    x: closeBtnX,
    y: closeBtnY,
    width: closeBtnSize,
    height: closeBtnSize
  });

  ctx.textAlign = "left";
}
