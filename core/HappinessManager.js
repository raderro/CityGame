import { state, buildingData } from '../data/config.js';

export function calculateHappiness() {
  let totalHappiness = 0;
  let residentialCount = 0;
  let totalPollution = 0;
  const map = state.map;

  for (let x = 0; x < state.MAP_WIDTH; x++) {
    for (let y = 0; y < state.MAP_HEIGHT; y++) {
      const building = map[x][y];
      if (!building) continue;

      const data = buildingData[building.type];
      if (!data) continue;

      const levelData = data.levels?.[building.level];
      if (!levelData || !levelData.population) continue;

      residentialCount++;
      let happiness = 100;

      const consumption = levelData.energy || 0;
      if (state.energy < consumption) {
        happiness -= 30;
      }

      let industrialPenalty = 0;
      let pollutionIncrease = 0;
      
      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= state.MAP_WIDTH || ny >= state.MAP_HEIGHT) continue;

          const neighbor = map[nx][ny];
          if (!neighbor) continue;

          if (neighbor.type === 'mine' || neighbor.type === 'powerPlant') {
            industrialPenalty += 10;
            pollutionIncrease += 5;
          }
        }
      }

      happiness -= Math.min(industrialPenalty, 30);
      totalPollution += pollutionIncrease;

      let nearbyHomes = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= state.MAP_WIDTH || ny >= state.MAP_HEIGHT) continue;

          const neighbor = map[nx][ny];
          if (!neighbor) continue;

          const neighborData = buildingData[neighbor.type]?.levels?.[neighbor.level];
          if (neighborData?.population) {
            nearbyHomes++;
          }
        }
      }

      if (nearbyHomes >= 4) happiness -= 10;

      let bonus = 0;
      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= state.MAP_WIDTH || ny >= state.MAP_HEIGHT) continue;

          const neighbor = map[nx][ny];
          if (!neighbor) continue;

          if (neighbor.type === 'playground') bonus += 15;
          else if (neighbor.type === 'shop') bonus += 5;
          else if (neighbor.type === 'gallery') bonus += 10;
          else if (neighbor.type === 'park') bonus += 20;
        }
      }

      happiness += bonus;

      happiness += (building.level - 1) * 5;

      happiness -= totalPollution / 100;

      if (nearbyHomes > 6) happiness -= 15;

      happiness = Math.max(happiness, 0);
      happiness = Math.min(happiness, 100);

      totalHappiness += happiness;
    }
  }

  state.happinessLevel = residentialCount ? Math.round(totalHappiness / residentialCount) : 100;
  if (state.happinessLevel > 100) state.happinessLevel = 100;
  if (state.happinessLevel < 0) state.happinessLevel = 0;
}
