import { state, buildingData } from '../data/config.js';

export function drawBuildingMenu() {
  if (!state.isBuildingMenuVisible) return;

  const { ctx, buildingImages, uiIcons } = state;
  const menuX = ctx.canvas.width / 2 - 300;
  const menuY = ctx.canvas.height / 2 - 180;
  const menuW = 650, menuH = 400, iconSize = 64, gap = 20;

  ctx.fillStyle = "#2C3E50";
  ctx.strokeStyle = "#34495E";
  ctx.lineWidth = 4;
  ctx.fillRect(menuX, menuY, menuW, menuH);
  ctx.strokeRect(menuX, menuY, menuW, menuH);

  const headerText = "Wybierz budynek";
  ctx.fillStyle = "#ECF0F1";
  ctx.font = "bold 24px 'Arial', sans-serif";
  const textWidth = ctx.measureText(headerText).width;
  ctx.fillText(headerText, menuX + (menuW - textWidth) / 2, menuY + 40);

  const itemHeight = iconSize + 60;
  const visibleItems = 10;
  const topPadding = 60;
  const itemsPerRow = 5;

  const keys = Object.keys(buildingImages);
  const startIndex = state.buildingScrollIndex;
  const endIndex = Math.min(startIndex + visibleItems, keys.length);

  state.buildingMenuItems = [];

  keys.slice(startIndex, endIndex).forEach((type, i) => {
    const levelData = buildingData[type]?.levels?.[1];
    if (!levelData) return;

    const col = i % itemsPerRow;
    const row = Math.floor(i / itemsPerRow);
    const x = menuX + 40 + col * (iconSize + gap + 40);
    const y = topPadding + menuY + row * itemHeight;

    ctx.drawImage(buildingImages[type], x, y, iconSize, iconSize);
    ctx.fillStyle = "#ECF0F1";
    ctx.font = "bold 16px 'Arial', sans-serif";
    const nameY = y + iconSize + 16;
    ctx.fillText(levelData.name, x + 3, nameY);

    ctx.drawImage(uiIcons.money, x, nameY + 6, 20, 20);
    ctx.font = "16px 'Arial', sans-serif";
    ctx.fillText(`$${levelData.cost}`, x + 24, nameY + 20);

    state.buildingMenuItems.push({ type, x, y, width: iconSize, height: iconSize });
  });

  const scrollBtnW = 30, scrollBtnH = 30;
  const upBtn = {
    x: menuX + menuW - scrollBtnW - 10,
    y: menuY + topPadding - scrollBtnH - 5,
    width: scrollBtnW,
    height: scrollBtnH,
    dir: 'up'
  };
  const downBtn = {
    x: menuX + menuW - scrollBtnW - 10,
    y: menuY + topPadding + (visibleItems / itemsPerRow) * itemHeight + 10,
    width: scrollBtnW,
    height: scrollBtnH,
    dir: 'down'
  };

  ctx.fillStyle = state.buildingScrollIndex > 0 ? "#2980B9" : "#7F8C8D";
  ctx.fillRect(upBtn.x, upBtn.y, upBtn.width, upBtn.height);
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("▲", upBtn.x + 5, upBtn.y + 16);

  const canScrollDown = state.buildingScrollIndex + itemsPerRow < keys.length;
  ctx.fillStyle = canScrollDown ? "#2980B9" : "#7F8C8D";
  ctx.fillRect(downBtn.x, downBtn.y, downBtn.width, downBtn.height);
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("▼", downBtn.x + 5, downBtn.y + 16);

  state.buildingScrollButtons = [upBtn, downBtn];

  const btnX = menuX + menuW - 360, btnY = menuY + menuH - 40;
  const btnWidth = 90, btnHeight = 30;

  ctx.fillStyle = "#E74C3C";
  ctx.beginPath();
  ctx.moveTo(btnX + 10, btnY);
  ctx.lineTo(btnX + btnWidth - 10, btnY);
  ctx.arcTo(btnX + btnWidth, btnY, btnX + btnWidth, btnY + btnHeight, 10);
  ctx.lineTo(btnX + btnWidth, btnY + btnHeight - 10);
  ctx.arcTo(btnX + btnWidth, btnY + btnHeight, btnX + 10, btnY + btnHeight, 10);
  ctx.lineTo(btnX + 10, btnY + btnHeight);
  ctx.arcTo(btnX, btnY + btnHeight, btnX, btnY + 10, 10);
  ctx.lineTo(btnX, btnY + 10);
  ctx.arcTo(btnX, btnY, btnX + 10, btnY, 10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px 'Arial', sans-serif";
  ctx.fillText("Zamknij", btnX + (btnWidth - ctx.measureText("Zamknij").width) / 2, btnY + (btnHeight / 2) + 2);

  state.buildingMenuItems.push({ type: "close", x: btnX, y: btnY, width: btnWidth, height: btnHeight });
}

export function drawInfoMenu() {
  if (!state.isInfoMenuVisible || !state.selectedTile) return;

  const { ctx, selectedTile } = state;
  const building = state.map[selectedTile.x][selectedTile.y];
  if (!building) return;

  const menuX = ctx.canvas.width / 2 - 300;
  const menuY = ctx.canvas.height / 2 - 150;
  const menuW = 650, menuH = 350;

  ctx.fillStyle = "#2C3E50";
  ctx.strokeStyle = "#34495E";
  ctx.lineWidth = 4;
  ctx.fillRect(menuX, menuY, menuW, menuH);
  ctx.strokeRect(menuX, menuY, menuW, menuH);

  const headerText = "Informacje o budynku";
  ctx.fillStyle = "#ECF0F1";
  ctx.font = "bold 24px 'Arial', sans-serif";
  ctx.fillText(headerText, menuX + (menuW - ctx.measureText(headerText).width) / 2, menuY + 40);

  const level = building.level || 1;
  const levelData = buildingData[building.type]?.levels?.[level];

  ctx.font = "18px 'Arial', sans-serif";
  ctx.fillText(`Nazwa: ${levelData.name}`, menuX + 20, menuY + 80);
  ctx.fillText(`Poziom: ${level}`, menuX + 20, menuY + 110);
  ctx.fillText(`Koszt: $${levelData.cost}`, menuX + 20, menuY + 140);
  ctx.fillText(`Produkcja: $${levelData.production} / 5s`, menuX + 20, menuY + 170);
  ctx.fillText(`Zużycie energii: ${levelData.energy || 0}`, menuX + 20, menuY + 200);
  ctx.fillText(`Populacja: +${levelData.population || 0}`, menuX + 20, menuY + 230);

  ctx.font = "16px 'Arial', sans-serif";
  ctx.fillText("Opis:", menuX + 20, menuY + 260);

  const words = levelData.description.split(" ");
  let line = "", lineY = menuY + 280;
  const maxLineWidth = menuW - 40;

  for (const word of words) {
    const testLine = line + word + " ";
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxLineWidth) {
      ctx.fillText(line, menuX + 20, lineY);
      line = word + " ";
      lineY += 20;
    } else {
      line = testLine;
    }
  }
  if (line) ctx.fillText(line, menuX + 20, lineY);

  const closeButtonX = menuX + menuW - 110;
  const closeButtonY = menuY + 310;
  const closeButtonWidth = 100;
  const closeButtonHeight = 34;

  ctx.fillStyle = "#E74C3C";
  ctx.fillRect(closeButtonX, closeButtonY, closeButtonWidth, closeButtonHeight);
  ctx.fillStyle = "#ECF0F1";
  ctx.font = "bold 18px 'Arial', sans-serif";
  ctx.fillText("Zamknij", closeButtonX + 15, closeButtonY + 17);

  state.buildingMenuItems = [
    { type: "close", x: closeButtonX, y: closeButtonY, width: closeButtonWidth, height: closeButtonHeight }
  ];
}
