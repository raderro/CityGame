import { state } from '../data/config.js';

export function drawQuestMenu() {
  const ctx = state.ctx;
  const width = 500, height = 450;
  const menuX = state.canvas.width / 2 - width / 2;
  const menuY = state.canvas.height / 2 - height / 2;

  ctx.fillStyle = "#2C3E50";
  ctx.fillRect(menuX, menuY, width, height);
  ctx.strokeStyle = "#ECF0F1";
  ctx.strokeRect(menuX, menuY, width, height);

  ctx.font = "20px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Zadania", menuX + 20, menuY + 30);

  const itemHeight = 80;
  const visibleItems = 4;
  const topPadding = 50;

  if (typeof state.questScrollIndex !== 'number') state.questScrollIndex = 0;
  const scrollIndex = state.questScrollIndex;
  const startIndex = scrollIndex;
  const endIndex = Math.min(startIndex + visibleItems, state.quests.length);

  state.questButtons = [];

  for (let i = startIndex; i < endIndex; i++) {
    const q = state.quests[i];
    const y = menuY + topPadding + (i - startIndex) * itemHeight;

    ctx.fillStyle = "#34495E";
    ctx.fillRect(menuX + 10, y, width - 20, 70);

    ctx.fillStyle = "#ECF0F1";
    ctx.font = "16px bold Arial";
    ctx.fillText(q.title, menuX + 20, y + 25);
    ctx.font = "14px Arial";
    ctx.fillText(q.description, menuX + 20, y + 45);

    let rewardX = menuX + 20;
    const rewardY = y + 65;
    const iconSize = 16;

    if (q.reward?.money) {
      ctx.drawImage(state.uiIcons.money, rewardX, rewardY - iconSize + 2, iconSize, iconSize);
      ctx.fillStyle = "#ECF0F1";
      ctx.font = "13px Arial";
      ctx.fillText(`${q.reward.money}`, rewardX + iconSize + 4, rewardY);
      rewardX += iconSize + 4 + ctx.measureText(`${q.reward.money}`).width + 20;
    }

    if (q.reward?.gold) {
      ctx.drawImage(state.uiIcons.gold, rewardX, rewardY - iconSize + 2, iconSize, iconSize);
      ctx.fillStyle = "#ECF0F1";
      ctx.font = "13px Arial";
      ctx.fillText(`${q.reward.gold}`, rewardX + iconSize + 4, rewardY);
    }

    if (q.completed && !q.claimed) {
      const btn = { x: menuX + width - 120, y: y + 20, width: 90, height: 30, questId: q.id };
      ctx.fillStyle = "#27AE60";
      ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
      ctx.fillStyle = "#fff";
      ctx.fillText("Odbierz", btn.x + 20, btn.y + 16);
      state.questButtons.push(btn);
    } else if (q.claimed) {
      ctx.fillStyle = "#95A5A6";
      ctx.fillText("Odebrano", menuX + width - 120, y + 40);
    }
  }

  const scrollBtnW = 30, scrollBtnH = 30;
  const upBtn = {
    x: menuX + width - scrollBtnW - 10,
    y: menuY + topPadding - scrollBtnH - 5,
    width: scrollBtnW,
    height: scrollBtnH,
    dir: 'up'
  };
  const downBtn = {
    x: menuX + width - scrollBtnW - 10,
    y: menuY + topPadding + visibleItems * itemHeight + 5,
    width: scrollBtnW,
    height: scrollBtnH,
    dir: 'down'
  };

  ctx.fillStyle = state.questScrollIndex > 0 ? "#2980B9" : "#7F8C8D";
  ctx.fillRect(upBtn.x, upBtn.y, upBtn.width, upBtn.height);
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("▲", upBtn.x + 5, upBtn.y + 16);

  const canScrollDown = scrollIndex + visibleItems < state.quests.length;
  ctx.fillStyle = canScrollDown ? "#2980B9" : "#7F8C8D";
  ctx.fillRect(downBtn.x, downBtn.y, downBtn.width, downBtn.height);
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("▼", downBtn.x + 5, downBtn.y + 16);

  state.questScrollButtons = [upBtn, downBtn];

  const closeBtnWidth = 100;
  const closeBtnHeight = 30;
  const closeBtnX = menuX + width / 2 - closeBtnWidth / 2;
  const closeBtnY = menuY + height - closeBtnHeight - 10;

  ctx.fillStyle = "#E74C3C";
  ctx.strokeStyle = "#C0392B";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(closeBtnX, closeBtnY, closeBtnWidth, closeBtnHeight, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px Arial";
  ctx.fillText(
    "Zamknij",
    closeBtnX + (closeBtnWidth - ctx.measureText("Zamknij").width) / 2,
    closeBtnY + 15
  );

  state.questCloseButton = {
    x: closeBtnX,
    y: closeBtnY,
    width: closeBtnWidth,
    height: closeBtnHeight,
  };
}
