import { state } from '../data/config.js';

export function checkQuestProgress() {
  state.quests.forEach(q => {
    if (q.completed) return;

    if (q.goal.type === 'first_house') 
    {
      const houseCount = state.houses.length;
      if (houseCount >= q.goal.count) q.completed = true;
    }
    else if(q.goal.type === 'first_apartment') 
    {
      const apartmentCount = state.apartments.length;
      if (apartmentCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_mansion') 
    {
      const mansionCount = state.mansions.length;
      if (mansionCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_hospital') 
    {
      const hospitalCount = state.hospitals.length;
      if (hospitalCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_office') 
    {
      const officeCount = state.offices.length;
      if (officeCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_shop') 
    {
      const shopCount = state.shops.length;
      if (shopCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_gallery') 
    {
      const galleryCount = state.galleries.length;
      if (galleryCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_playground') 
    {
      const playgroundCount = state.playgrounds.length;
      if (playgroundCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_powerPlant') 
    {
      const powerPlantCount = state.powerPlants.length;
      if (powerPlantCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_mine') 
    {
      const mineCount = state.mines.length;
      if (mineCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_20_population'){
      const populationCount = state.population;
      if (populationCount >= q.goal.count) q.completed = true;
    }
    else if (q.goal.type === 'first_upgrade_building'){
      const upgradedBuildingsCount = state.upgradedBuildings.length;
      if (upgradedBuildingsCount >= q.goal.count) q.completed = true;
    }
    else if(q.goal.type === 'build_3_buidling'){
      const buildingCount = state.buidlings.length;
      if(buildingCount >= q.goal.count) q.completed = true;
    }
  });
}

export function claimQuestReward(id) {
  const quest = state.quests.find(q => q.id === id);
  if (!quest || !quest.completed || quest.claimed) return;

  quest.claimed = true;
  if (quest.reward.gold) state.gold += quest.reward.gold;
  if (quest.reward.money) state.money += quest.reward.money;
}
