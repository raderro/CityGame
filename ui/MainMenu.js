import { state } from '../data/config.js';
import { getProfiles } from '../core/ProfileManager.js';

const backgroundImage = new Image();
backgroundImage.src = 'assets/img/menu.png';

export function drawMainMenu() {
  const ctx = state.ctx;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
  } else {
    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };
  }

  const profiles = getProfiles();
  state.profiles = profiles;

  const boxSize = 120;
  const spacingX = 60;
  const spacingY = 40;
  const cols = 2;
  const rows = Math.ceil(profiles.length / cols);
  const totalWidth = cols * boxSize + (cols - 1) * spacingX;
  const startX = ctx.canvas.width / 2 - totalWidth / 2;
  const startY = 360;

  profiles.forEach((profile, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * (boxSize + spacingX);
    const y = startY + row * (boxSize + spacingY + 30);

    const img = state.avatarsImages[profile.avatar];
    if (img && img.complete) {
      ctx.drawImage(img, x, y, boxSize, boxSize);
    } else {
      ctx.fillStyle = "#ccc";
      ctx.fillRect(x, y, boxSize, boxSize);
      ctx.fillStyle = "#000";
      ctx.fillText(profile.username[0], x + boxSize / 2, y + boxSize / 2);
    }

    ctx.strokeStyle = state.selectedProfileIndex === i ? "#0f0" : "#000";
    ctx.lineWidth = state.selectedProfileIndex === i ? 4 : 2;
    ctx.strokeRect(x, y, boxSize, boxSize);

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(profile.username, x + boxSize / 2, y + boxSize + 24);
  });

  if (profiles.length < 4) {
    const btnWidth = 250;
    const btnHeight = 50;
    const btnX = ctx.canvas.width / 2 - btnWidth / 2;
    const btnY = startY + rows * (boxSize + spacingY + 30) + 20;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(btnX, btnY, btnWidth, btnHeight);

    ctx.fillStyle = "#000";
    ctx.font = "22px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Stwórz profil", btnX + btnWidth / 2, btnY + btnHeight / 2);

    state.createProfileBtn = { x: btnX, y: btnY, width: btnWidth, height: btnHeight };
  }

  if (state.selectedProfileIndex !== null) {
    const btnWidth = 180;
    const btnHeight = 50;
    const btnX = ctx.canvas.width / 2 - btnWidth / 2;
    const btnY = ctx.canvas.height - 100;

    ctx.fillStyle = "#0f0";
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(btnX, btnY, btnWidth, btnHeight);

    ctx.fillStyle = "#000";
    ctx.textBaseline = "middle";
    ctx.font = "24px Arial";
    ctx.fillText("GRAJ", btnX + btnWidth / 2, btnY + btnHeight / 2);

    state.playBtn = { x: btnX, y: btnY, width: btnWidth, height: btnHeight };
  }

  if (state.creatingProfile) {
    drawCreateProfileOverlay(ctx);
  }

  const boxWidth = 280;
  const boxHeight = 160;
  const padding = 15;
  const x = ctx.canvas.width - boxWidth - padding;
  const y = ctx.canvas.height - boxHeight - padding;

  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(x, y, boxWidth, boxHeight);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, boxWidth, boxHeight);

  ctx.fillStyle = "#fff";
  ctx.font = "14px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  ctx.fillText("Twórcy:", x + 10, y + 10);

  const creators = [
    { role: "Programista", name: "Radosław Jakóbik" },
    { role: "Programista", name: "Patryk Stawarz"},
    { role: "Grafik", name: "Zofia Jura" },
    { role: "Pomysły", name: "Radosław Jakóbik" },
    { role: "Dźwięki", name: "OpenGameArt.org" },
  ];

  creators.forEach((c, i) => {
    const lineY = y + 30 + i * 28;
    ctx.fillText(`${c.role}:`, x + 10, lineY);
    ctx.fillText(c.name, x + 140, lineY);
  });
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
}

function drawCreateProfileOverlay(ctx) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const containerX = ctx.canvas.width / 2 - 200;
  const containerY = 150;
  const containerWidth = 400;
  const containerHeight = 350;

  ctx.fillStyle = "rgba(30, 30, 30, 0.95)";
  ctx.fillRect(containerX, containerY, containerWidth, containerHeight);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.strokeRect(containerX, containerY, containerWidth, containerHeight);

  const closeSize = 30;
  const closeX = containerX + containerWidth - closeSize - 10;
  const closeY = containerY + 10;

  ctx.fillStyle = "#f44336";
  ctx.fillRect(closeX, closeY, closeSize, closeSize);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.strokeRect(closeX, closeY, closeSize, closeSize);

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("X", closeX + closeSize / 2, closeY + closeSize / 2);

  state.createProfileCloseButton = {
    x: closeX,
    y: closeY,
    width: closeSize,
    height: closeSize
  };

  ctx.fillStyle = "#ffffff";
  ctx.font = "26px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Stwórz nowy profil", ctx.canvas.width / 2, containerY + 20);

  ctx.font = "18px Arial";
  ctx.fillText("Nazwa użytkownika:", ctx.canvas.width / 2, containerY + 70);

  const usernameFieldX = ctx.canvas.width / 2 - 100;
  const usernameFieldY = containerY + 90;
  const usernameFieldWidth = 200;
  const usernameFieldHeight = 35;

  ctx.fillStyle = "#222";
  ctx.fillRect(usernameFieldX, usernameFieldY, usernameFieldWidth, usernameFieldHeight);

  ctx.strokeStyle = state.isEditingUsername ? "#0f0" : "#888";
  ctx.lineWidth = 2;
  ctx.strokeRect(usernameFieldX, usernameFieldY, usernameFieldWidth, usernameFieldHeight);

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(state.newProfileName || "Kliknij, aby pisać", ctx.canvas.width / 2, usernameFieldY + usernameFieldHeight / 2);

  ctx.font = "18px Arial";
  ctx.fillText("Wybierz avatar:", ctx.canvas.width / 2, usernameFieldY + 70);

  state.avatarSelectionBoxes = [];

  state.availableAvatars.forEach((avatar, i) => {
    const x = ctx.canvas.width / 2 - 100 + i * 70;
    const y = usernameFieldY + 90;
    const img = state.avatarsImages[avatar];

    if (img && img.complete) {
      ctx.drawImage(img, x, y, 60, 60);

      if (state.newProfileAvatar === avatar) {
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 2, y - 2, 64, 64);
      }
    }
  });

  const saveButtonX = ctx.canvas.width / 2 - 75;
  const saveButtonY = usernameFieldY + 180;
  const saveButtonWidth = 150;
  const saveButtonHeight = 40;

  ctx.fillStyle = "#0f0";
  ctx.fillRect(saveButtonX, saveButtonY, saveButtonWidth, saveButtonHeight);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.strokeRect(saveButtonX, saveButtonY, saveButtonWidth, saveButtonHeight);

  ctx.fillStyle = "#000";
  ctx.font = "22px Arial";
  ctx.fillText("Zapisz profil", ctx.canvas.width / 2, saveButtonY + saveButtonHeight / 2);
}
