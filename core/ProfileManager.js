import { state } from '../data/config.js';

export function getProfiles() {
  const profiles = JSON.parse(localStorage.getItem('profiles'));
  return profiles || [];
}

export function saveProfiles(profiles) {
  localStorage.setItem('profiles', JSON.stringify(profiles));
}

export function getSelectedProfile() {
  return JSON.parse(localStorage.getItem('selectedProfileIndex'));
}

export function setSelectedProfile(index) {
  localStorage.setItem('selectedProfileIndex', JSON.stringify(index));
}

export function loadAvatars() {
  state.availableAvatars.forEach(avatarName => {
    const img = new Image();
    img.src = `assets/img/avatars/${avatarName}`;
    state.avatarsImages[avatarName] = img;
  });
}

export function createProfile(username, avatar) {
  const profiles = getProfiles();
  if (profiles.length >= 4) return false;
  profiles.push({ username, avatar });
  saveProfiles(profiles);
  return true;
}

export function deleteProfile(index) {
  const profiles = getProfiles();
  profiles.splice(index, 1);
  saveProfiles(profiles);
}
