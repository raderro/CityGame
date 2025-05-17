import { state } from '../data/config.js';

export function drawUI() {
  const { ctx, uiIcons, money, energy, population, gold, happinessLevel} = state;
  const boxWidth = 180, boxHeight = 50, padding = 15, iconSize = 30, startX = 20, startY = 135;

  ctx.font = '16px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'start';

  if (state.selectedProfileIndex !== null) {
    const profile = state.profiles[state.selectedProfileIndex];
    const avatarImg = state.avatarsImages[profile.avatar];

    const avatarSize = 60;
    const avatarBoxHeight = 100;
    const avatarX = startX;
    const avatarY = 20;

    ctx.fillStyle = "#2C3E50";
    ctx.strokeStyle = "#1F618D";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(avatarX + 10, avatarY);
    ctx.lineTo(avatarX + boxWidth - 10, avatarY);
    ctx.arcTo(avatarX + boxWidth, avatarY, avatarX + boxWidth, avatarY + avatarBoxHeight, 10);
    ctx.lineTo(avatarX + boxWidth, avatarY + avatarBoxHeight - 10);
    ctx.arcTo(avatarX + boxWidth, avatarY + avatarBoxHeight, avatarX + 10, avatarY + avatarBoxHeight, 10);
    ctx.lineTo(avatarX + 10, avatarY + avatarBoxHeight);
    ctx.arcTo(avatarX, avatarY + avatarBoxHeight, avatarX, avatarY + avatarBoxHeight - 10, 10);
    ctx.lineTo(avatarX, avatarY + 10);
    ctx.arcTo(avatarX, avatarY, avatarX + 10, avatarY, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (avatarImg && avatarImg.complete) {
      ctx.drawImage(avatarImg, avatarX + boxWidth / 2 - avatarSize / 2, avatarY + 10, avatarSize, avatarSize);
    }

    ctx.fillStyle = "#ECF0F1";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(profile.username, avatarX + boxWidth / 2, avatarY + avatarSize + 30);
  }

  state.uiIcons.happiness.src = 'assets/img/happy_high.png';

  if(state.happinessLevel >= 100 && state.happinessLevel > 55){
    state.uiIcons.happiness.src = 'assets/img/happy_high.png';
  }
  else if(state.happinessLevel <= 55 && state.happinessLevel > 30){
    state.uiIcons.happiness.src = 'assets/img/happy_mid.png';
  }
  else if(state.happinessLevel <= 30 && state.happinessLevel >=0){
    state.uiIcons.happiness.src = 'assets/img/happy_wrong.png';
  }

  const resources = [
    { icon: uiIcons.money, label: `$${money}`, y: startY, color: "#4CAF50" },
    { icon: uiIcons.energy, label: `${energy}`, y: startY + boxHeight + padding, color: "#FF9800" },
    { icon: uiIcons.population, label: `${population}`, y: startY + 2 * (boxHeight + padding), color: "#2196F3" },
    { icon: uiIcons.happiness, label: `${happinessLevel}%`, y: startY + 3 * (boxHeight + padding), color: "#FFEB3B" },
    { icon: uiIcons.gold, label: `${gold}`, y: startY + 4 * (boxHeight + padding), color: "#2196F3" }
  ];

  resources.forEach(res => {
    const questBtnX = startX;
    const questBtnY = startY + 5 * (boxHeight + padding);
    const questBtnW = boxWidth;
    const questBtnH = 40;

    ctx.fillStyle = "#3498DB";
    ctx.strokeStyle = "#1F618D";
    ctx.textAlign = "left";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(questBtnX + 10, questBtnY);
    ctx.lineTo(questBtnX + questBtnW - 10, questBtnY);
    ctx.arcTo(questBtnX + questBtnW, questBtnY, questBtnX + questBtnW, questBtnY + questBtnH, 10);
    ctx.lineTo(questBtnX + questBtnW, questBtnY + questBtnH - 10);
    ctx.arcTo(questBtnX + questBtnW, questBtnY + questBtnH, questBtnX + 10, questBtnY + questBtnH, 10);
    ctx.lineTo(questBtnX + 10, questBtnY + questBtnH);
    ctx.arcTo(questBtnX, questBtnY + questBtnH, questBtnX, questBtnY + 10, 10);
    ctx.lineTo(questBtnX, questBtnY + 10);
    ctx.arcTo(questBtnX, questBtnY, questBtnX + 10, questBtnY, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.fillText("Zadania", questBtnX + 55, questBtnY + 22);

    state.questButton = { x: questBtnX, y: questBtnY, width: questBtnW, height: questBtnH };

    const gradient = ctx.createLinearGradient(startX, res.y, startX + boxWidth, res.y + boxHeight);
    gradient.addColorStop(0, "#333");
    gradient.addColorStop(1, "#555");

    ctx.fillStyle = gradient;
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX + 10, res.y);
    ctx.lineTo(startX + boxWidth - 10, res.y);
    ctx.arcTo(startX + boxWidth, res.y, startX + boxWidth, res.y + boxHeight, 10);
    ctx.lineTo(startX + boxWidth, res.y + boxHeight - 10);
    ctx.arcTo(startX + boxWidth, res.y + boxHeight, startX + boxWidth - 10, res.y + boxHeight, 10);
    ctx.lineTo(startX + 10, res.y + boxHeight);
    ctx.arcTo(startX, res.y + boxHeight, startX, res.y + boxHeight - 10, 10);
    ctx.lineTo(startX, res.y + 10);
    ctx.arcTo(startX, res.y, startX + 10, res.y, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.drawImage(res.icon, startX + 12, res.y + 12, iconSize, iconSize);

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.font = "bold 18px 'Segoe UI', Tahoma, Geneva, sans-serif";
    ctx.fillText(res.label, startX + iconSize + 20, res.y + 30);

    ctx.fillStyle = res.color;
    ctx.fillText(res.label, startX + iconSize + 20, res.y + 30);
  });
}

export function drawEvent(event) {
  const ctx = state.ctx;
  const canvas = ctx.canvas;
  const x = canvas.width / 2 - 300;
  const y = canvas.height / 2 - 150;
  const width = 600;
  const height = 400;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(x, y, width, height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, width, height);

  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.fillText(event.title, x + 20, y + 40);

  ctx.font = '18px Arial';
  wrapText(ctx, event.description, x + 20, y + 80, width - 40, 25);

  let infoY = y + 180;

  ctx.fillStyle = 'lightgreen';
  ctx.fillText('Efekt (Podpisz): ' + formatEffect(event.onAccept), x + 20, infoY);
  infoY += 25;

  ctx.fillStyle = 'salmon';
  ctx.fillText('Efekt (Odmów): ' + formatEffect(event.onReject), x + 20, infoY);

  ctx.fillStyle = 'green';
  ctx.fillRect(x + 75, y + 285, 160, 50);
  ctx.fillStyle = 'white';
  ctx.fillText('Podpisz', x + 120, y + 310);

  ctx.fillStyle = 'red';
  ctx.fillRect(x + 355, y + 285, 160, 50);
  ctx.fillStyle = 'white';
  ctx.fillText('Odmów', x + 400, y + 310);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function formatEffect(effect) {
  const parts = [];
  if (effect.money !== undefined) parts.push(`Pieniądze: ${effect.money > 0 ? '+' : ''}${effect.money}`);
  if (effect.satisfaction !== undefined) parts.push(`Satysfakcja: ${effect.satisfaction > 0 ? '+' : ''}${effect.satisfaction}`);
  return parts.join(', ');
}
