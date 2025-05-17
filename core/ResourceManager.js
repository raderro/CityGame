import { state, buildingData } from '../data/config.js';
import { saveGameState } from './GameManager.js';

export function updateBuildings() {
  const now = Date.now();
  const interval = 5000;

  state.map.forEach((row, x) => {
    row.forEach((building, y) => {
      if (!building) return;

      const baseData = buildingData[building.type];
      const levelData = baseData?.levels?.[building.level];
      if (!levelData) return;

      if (levelData.production && typeof levelData.production === 'number') {
        if (now - (building.lastIncomeTime || 0) >= interval) {
          state.money += levelData.production;
          building.lastIncomeTime = now;
        }
      }

      if (building.type === 'mine') {
        if (now - (building.lastGoldTime || 0) >= interval) {
          state.gold += levelData.production;
          building.lastGoldTime = now;
        }
      }
      
      if (building.type === 'powerPlant' && !building.lastPowerProductionTime) {
        state.energy += levelData.production || 0;
        building.lastPowerProductionTime = now;
      }

      if (building.type === 'windmill' && !building.lastWindProductionTime) {
        state.energy += levelData.production || 0;
        building.lastWindProductionTime = now;
      }

      saveGameState();
    });
  });
}
