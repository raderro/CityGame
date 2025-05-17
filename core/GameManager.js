import { state } from '../data/config.js';
import { getProfiles, getSelectedProfile } from './ProfileManager.js';

function getProfileKey() {
  const profiles = getProfiles();
  const selectedIndex = getSelectedProfile();
  const profile = profiles[selectedIndex];
  return profile ? `gameState_${profile.username}` : null;
}

export function saveGameState() {
  const key = getProfileKey();
  if (!key) return;

  const dataToSave = {
    map: state.map,
    money: state.money,
    energy: state.energy,
    gold: state.gold,
    population: state.population,
    happinessLevel: state.happinessLevel,
    mines: state.mines,
    powerPlants: state.powerPlants,
    quests: state.quests,
  };

  localStorage.setItem(key, JSON.stringify(dataToSave));
}

export function loadGameState() {
  const key = getProfileKey();
  if (!key) return;

  const raw = localStorage.getItem(key);
  if (!raw) return;

  if (state.selectedProfileIndex === null) return;

  const selectedProfile = state.profiles[state.selectedProfileIndex];
  const savedData = localStorage.getItem(`profile_${selectedProfile.name}_save`);

  if (savedData) {
    const parsed = JSON.parse(savedData);
    Object.assign(state, parsed);
  }

  try {
    const saved = JSON.parse(raw);
    if (saved) {
      state.map = saved.map;
      state.money = saved.money;
      state.energy = saved.energy;
      state.gold = saved.gold;
      state.population = saved.population;
      state.happinessLevel = saved.happinessLevel;
      state.mines = saved.mines;
      state.powerPlants = saved.powerPlants;
      if (saved.quests) {
        state.quests = saved.quests;
      }
    }
  } catch (e) {
    console.error("Błąd przy wczytywaniu gry:", e);
  }
}
