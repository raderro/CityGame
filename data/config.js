export const state = {
  TILE_SIZE: 40,
  MAP_WIDTH: 0,
  MAP_HEIGHT: 0,
  zoom: 1.4,
  map: [],
  money: 1000,
  energy: 300,
  population: 0,
  happinessLevel: 100,
  gold: 0,
  cameraOffsetX: 0,
  cameraOffsetY: 0,
  sellMultiplier: 1,
  isDragging: false,
  dragStart: { x: 0, y: 0 },
  cameraStart: { x: 0, y: 0 },
  isMainMenuVisible: true,
  isBuildingMenuVisible: false,
  buildingMenuItems: [],
  isUpgradeMenuVisible: false,
  isInfoMenuVisible: false,
  usedEvents: new Set(),
  currentEvent: null,
  showEvent: false,
  lastEventTime: 0,
  upgradeMenuButtons: [],
  selectedTile: { x: -1, y: -1 },
  buidlings: [],
  mines: [],
  houses: [],
  apartments: [],
  mansions: [],
  hospitals: [],
  offices: [],
  shops: [],
  parks: [],
  galleries: [],
  playgrounds: [],
  powerPlants: [],
  schools: [],
  universitets: [],
  stadions: [],
  librays: [],
  aquaparks: [],
  airports: [],
  militarybases: [],
  laboratories: [],
  windmills: [],
  upgradedBuildings: [],
  ctx: null,
  canvas: null,
  buildingImages: {},
  uiIcons: {},
  clickSound: new Audio('assets/sounds/click.wav'),
  mapImage: new Image(),
  profiles: [],
  selectedProfileIndex: null,
  creatingProfile: false,
  newProfileName: '',
  newProfileAvatar: 'avatar1.png',
  availableAvatars: ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png'],
  avatarsImages: {},
  quests: [],
  activeQuests: [],
  completedQuests: [],
  claimedRewards: [],
  isQuestMenuVisible: false,
  questMenuItems: [],
  questScrollIndex: 0,
  buildingScrollIndex: 0,
};

export const buildingData = {
  house: {
    levels: {
      1: {
        name: "Dom",
        cost: 350,
        description: "Dom jednorodzinny z ogrodem. Może pomieścić 5 osób. Produkuje 10 pieniędzy co 5 sekund. Zużywa 25 energii.",
        production: 10,
        energy: 25,
        population: 5
      },
      2: {
        name: "Dom",
        cost: 1000,
        description: "Dom jednorodzinny z basenem. Może pomieścić 10 osób. Produkuje 15 pieniędzy co 5 sekund. Zużywa 20 energii.",
        production: 15,
        energy: 20,
        population: 10
      },
      3: {
        name: "Dom",
        cost: 3500,
        description: "Dom jednorodzinny z ogrodem i basenem. Może pomieścić 15 osób. Produkuje 20 pieniędzy co 5 sekund. Zużywa 15 energii.",
        production: 20,
        energy: 15,
        population: 15
      },
    }
  },
  apartment: {
    levels: {
      1: {
        name: "Apartament",
        cost: 2000,
        description: "Wielopiętrowy budynek mieszkalny dla wielu mieszkańców. Może pomieścić 25 osób. Produkuje 25 pieniędzy co 5 sekund. Zużywa 50 energii.",
        production: 25,
        energy: 50,
        population: 25
      },
      2: {
        name: "Apartament",
        cost: 6000,
        description: "Wielopiętrowy budynek mieszkalny z basenem. Może pomieścić 35 osób. Produkuje 30 pieniędzy co 5 sekund. Zużywa 45 energii.",
        production: 30,
        energy: 45,
        population: 35
      },
      3: {
        name: "Apartament",
        cost: 12000,
        description: "Wielopiętrowy budynek mieszkalny z basenem i ogrodem. Może pomieścić 50 osób. Produkuje 35 pieniędzy co 5 sekund. Zużywa 40 energii.",
        production: 35,
        energy: 40,
        population: 50
      },
    }
  },
  mansion: {
    levels: {
      1: {
        name: "Willa",
        cost: 15000,
        description: "Luksusowa rezydencja z basenem. Może pomieścić 10 osób. Produkuje 50 pieniędzy co 5 sekund. Zużywa 35 energii.",
        production: 50,
        energy: 35,
        population: 10
      },
      2: {
        name: "Willa",
        cost: 25000,
        description: "Luksusowa rezydencja z basenem i ogrodem. Może pomieścić 20 osób. Produkuje 60 pieniędzy co 5 sekund. Zużywa 30 energii.",
        production: 60,
        energy: 30,
        population: 15
      },
      3: {
        name: "Willa",
        cost: 50000,
        description: "Luksusowa rezydencja z basenem, ogrodem i kortem tenisowym. Może pomieścić 30 osób. Produkuje 70 pieniędzy co 5 sekund. Zużywa 25 energii.",
        production: 70,
        energy: 25,
        population: 20
      },
    }
  },
  hospital: {
    levels: {
      1: {
        name: "Szpital",
        cost: 7000,
        description: "Szpital z podstawowym wyposażeniem. Zużywa 100 energii.",
        production: 0,
        energy: 90,
        population: 0
      },
      2: {
        name: "Szpital",
        cost: 15000,
        description: "Szpital z nowoczesnym wyposażeniem. Zużywa 80 energii.",
        production: 0,
        energy: 80,
        population: 0
      },
      3: {
        name: "Szpital",
        cost: 40000,
        description: "Szpital z nowoczesnym wyposażeniem i oddziałem intensywnej terapii. Zużywa 70 energii.",
        production: 0,
        energy: 70,
        population: 0
      },
    }
  },
  office: {
    levels: {
      1: {
        name: "Biurowiec",
        cost: 5000,
        description: "Biuro z podstawowym wyposażeniem. Produkuje 20 pieniędzy co 5 sekund. Zużywa 100 energii.",
        production: 20,
        energy: 30,
        population: 0
      },
      2: {
        name: "Biurowiec",
        cost: 12000,
        description: "Biuro z nowoczesnym wyposażeniem. Produkuje 30 pieniędzy co 5 sekund. Zużywa 90 energii.",
        production: 30,
        energy: 35,
        population: 0
      },
      3: {
        name: "Biurowiec",
        cost: 35000,
        description: "Biuro z nowoczesnym wyposażeniem i salą konferencyjną. Produkuje 40 pieniędzy co 5 sekund. Zużywa 80 energii.",
        production: 40,
        energy: 40,
        population: 0
      },
    }
  },
  shop: {
    levels: {
      1: {
        name: "Sklep",
        cost: 650,
        description: "Sklep spożywczy. Produkuje 15 pieniędzy co 5 sekund. Zużywa 70 energii.",
        production: 15,
        energy: 20,
        population: 0
      },
      2: {
        name: "Sklep",
        cost: 2000,
        description: "Sklep z elektroniką. Produkuje 25 pieniędzy co 5 sekund. Zużywa 60 energii.",
        production: 25,
        energy: 25,
        population: 0
      },
      3: {
        name: "Sklep",
        cost: 6500,
        description: "Sklep z odzieżą. Produkuje 35 pieniędzy co 5 sekund. Zużywa 50 energii.",
        production: 35,
        energy: 35,
        population: 0
      },
    }
  },
  gallery: {
    levels: {
      1: {
        name: "Galeria",
        cost: 15000,
        description: "Galeria handlowa z podstawowym wyposażeniem. Produkuje 50 pieniędzy co 5 sekund. Zużywa 120 energii.",
        production: 50,
        energy: 50,
        population: 0
      },
      2: {
        name: "Galeria",
        cost: 35000,
        description: "Galeria handlowa z nowoczesnym wyposażeniem. Produkuje 70 pieniędzy co 5 sekund. Zużywa 110 energii.",
        production: 70,
        energy: 65,
        population: 0
      },
      3: {
        name: "Galeria",
        cost: 70000,
        description: "Galeria handlowa z nowoczesnym wyposażeniem i kinem. Produkuje 90 pieniędzy co 5 sekund. Zużywa 100 energii.",
        production: 90,
        energy: 60,
        population: 0
      },
    }
  },
  playground: {
    levels: {
      1: {
        name: "Plac zabaw",
        cost: 1500,
        description: "Plac zabaw dla dzieci. Zużywa 5 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 5,
        population: 0
      },
      2: {
        name: "Plac zabaw",
        cost: 5000,
        description: "Plac zabaw dla dzieci z huśtawkami. Zużywa 10 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 10,
        population: 0
      },
      3: {
        name: "Plac zabaw",
        cost: 9000,
        description: "Plac zabaw dla dzieci z huśtawkami i zjeżdżalnią. Zużywa 15 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 15,
        population: 0
      },
    }
  },
  mine: {
    levels: {
      1: {
        name: "Kopalnia",
        cost: 50000,
        description: "Mała kopalnia złota. Produkuje 5 złota co 5 sekund. Zużywa 30 energii.",
        production: 5,
        energy: 30,
        population: 0
      },
      2: {
        name: "Kopalnia",
        cost: 150000,
        description: "Średnia kopalnia złota z nowoczesnym wyposażeniem. Produkuje 10 złota co 5 sekund. Zużywa 25 energii.",
        production: 10,
        energy: 25,
        population: 0
      },
      3: {
        name: "Kopalnia",
        cost: 500000,
        description: "Duża kopalnia złota z nowoczesnym wyposażeniem i automatyzacją. Produkuje 15 złota co 5 sekund. Zużywa 20 energii.",
        production: 15,
        energy: 20,
        population: 0
      },
    }

  },
  powerPlant: {
    levels: {
      1: {
        name: "Elektrownia",
        cost: 15000,
        description: "Mała elektrownia. Produkuje 100 energii.",
        production: 100,
        energy: 0,
        population: 0
      },
      2: {
        name: "Elektrownia",
        cost: 35000,
        description: "Średnia elektrownia z nowoczesnym wyposażeniem. Produkuje 250 energii.",
        production: 250,
        energy: 0,
        population: 0
      },
      3: {
        name: "Elektrownia",
        cost: 80000,
        description: "Duża elektrownia z nowoczesnym wyposażeniem i automatyzacją. Produkuje 500 energii.",
        production: 500,
        energy: 0,
        population: 0
      },
    }
  },
  park: {
    levels: {
      1: {
        name: "Park",
        cost: 5000,
        description: "Park publiczny do użytku mieszkańców. Zużywa 15 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 15,
        population: 0
      },
      2: {
        name: "Park",
        cost: 10000,
        description: "Park publiczny z placem zabaw. Zużywa 25 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 25,
        population: 0
      },
      3: {
        name: "Park",
        cost: 20000,
        description: "Park publiczny z placem zabaw i stawem. Zużywa 35 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 35,
        population: 0
      },
    }
  },
  school: {
    levels: {
      1: {
        name: "Szkoła",
        cost: 4200,
        description: "Szkoła podstawowa. Zużywa 35 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 30,
        population: 0
      },
      2: {
        name: "Szkoła",
        cost: 8500,
        description: "Szkoła podstawowa i średnia. Zużywa 45 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 45,
        population: 0
      },
      3: {
        name: "Szkoła",
        cost: 14700,
        description: "Szkoła podstawowa, średnia i zawodowa. Zużywa 35 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 35,
        population: 0
      },
    }
  },
  university: {
    levels: {
      1: {
        name: "Uniwersytet",
        cost: 6800,
        description: "Uniwersytet standardowy. Zużywa 20 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 20,
        population: 0
      },
      2: {
        name: "Uniwersytet",
        cost: 12500,
        description: "Uniwersytet z nowoczesnym wyposażeniem. Zużywa 30 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 30,
        population: 0
      },
      3: {
        name: "Uniwersytet",
        cost: 17600,
        description: "Uniwersytet z nowoczesnym wyposażeniem i laboratoriami. Zużywa 40 energii. Zwiększa zadowolenie mieszkańców.",
        production: 0,
        energy: 40,
        population: 0
      },
    }
  },
  stadion: {
    levels: {
      1: {
        name: "Stadion",
        cost: 15000,
        description: "Stadion piłkarski do meczów lokalnych. Produkuje 20 pieniędzy co 5 sekund. Zużywa 60 energii.",
        production: 20,
        energy: 60,
        population: 0
      },
      2: {
        name: "Stadion",
        cost: 25000,
        description: "Stadion piłkarski do meczów wyższej ligi. Produkuje 40 pieniędzy co 5 sekund. Zużywa 75 energii.",
        production: 40,
        energy: 75,
        population: 0
      },
      3: {
        name: "Stadion",
        cost: 35000,
        description: "Stadion piłkarski do meczów międzynarodowych. Produkuje 70 pieniędzy co 5 sekund. Zużywa 90 energii.",
        production: 70,
        energy: 90,
        population: 0
      },
    }
  },
  libray: {
    levels: {
      1: {
        name: "Biblioteka",
        cost: 3000,
        description: "Biblioteka publiczna. Zużywa 25 energii. Produkuje 10 pieniędzy co 5 sekund. Zwiększa zadowolenie mieszkańców.",
        production: 10,
        energy: 25,
        population: 5
      },
      2: {
        name: "Dom",
        cost: 5500,
        description: "Biblioteka z czytelnią. Zużywa 35 energii. Produkuje 15 pieniędzy co 5 sekund. Zwiększa zadowolenie mieszkańców.",
        production: 15,
        energy: 35,
        population: 0
      },
      3: {
        name: "Dom",
        cost: 11500,
        description: "Biblioteka z czytelnią i komputerami. Zużywa 40 energii. Produkuje 20 pieniędzy co 5 sekund. Zwiększa zadowolenie mieszkańców.",
        production: 20,
        energy: 40,
        population: 0
      },
    }
  },
  aquapark: {
    levels: {
      1: {
        name: "Park wodny",
        cost: 9000,
        description: "Park wodny z basenami. Zużywa 25 energii. Produkuje 25 pieniędzy co 5 sekund. Zwiększa zadowolenie mieszkańców.",
        production: 25,
        energy: 25,
        population: 0
      },
      2: {
        name: "Park wodny",
        cost: 17000,
        description: "Park wodny z basenami i zjeżdżalniami. Produkuje 40 pieniędzy co 5 sekund. Zużywa 35 energii. Zwiększa zadowolenie mieszkańców.",
        production: 40,
        energy: 35,
        population: 0
      },
      3: {
        name: "Park wodny",
        cost: 23500,
        description: "Park wodny z basenami, zjeżdżalniami i saunami. Produkuje 65 pieniędzy co 5 sekund. Zużywa 45 energii. Zwiększa zadowolenie mieszkańców.",
        production: 65,
        energy: 45,
        population: 0
      },
    }
  },
  airport: {
    levels: {
      1: {
        name: "Lotnisko",
        cost: 12500,
        description: "Dom jednorodzinny z ogrodem. Może pomieścić 5 osób. Produkuje 10 pieniędzy co 5 sekund. Zużywa 25 energii.",
        production: 20,
        energy: 35,
        population: 0
      },
      2: {
        name: "Lotnisko",
        cost: 22000,
        description: "Dom jednorodzinny z basenem. Może pomieścić 10 osób. Produkuje 15 pieniędzy co 5 sekund. Zużywa 20 energii.",
        production: 45,
        energy: 45,
        population: 0
      },
      3: {
        name: "Lotnisko",
        cost: 45000,
        description: "Dom jednorodzinny z ogrodem i basenem. Może pomieścić 15 osób. Produkuje 20 pieniędzy co 5 sekund. Zużywa 15 energii.",
        production: 75,
        energy: 55,
        population: 0
      },
    }
  },
  militarybase: {
    levels: {
      1: {
        name: "Baza wojskowa",
        cost: 35000,
        description: "Baza wojskowa dla niewielkiej armii. Produkuje 10 pieniędzy co 5 sekund. Mieści w sobie 15 osób. Zużywa 25 energii.",
        production: 10,
        energy: 25,
        population: 15
      },
      2: {
        name: "Baza wojskowa",
        cost: 55000,
        description: "Baza wojskowa dla średniej armii. Produkuje 25 pieniędzy co 5 sekund. Mieści w sobie 25 osób. Zużywa 40 energii.",
        production: 25,
        energy: 40,
        population: 30
      },
      3: {
        name: "Baza wojskowa",
        cost: 3500,
        description: "Baza wojskowa dla dużej armii. Produkuje 50 pieniędzy co 5 sekund. Mieści w sobie 45 osób. Zużywa 60 energii.",
        production: 50,
        energy: 60,
        population: 45
      },
    }
  },
  laboratory: {
    levels: {
      1: {
        name: "Laboratorium",
        cost: 25000,
        description: "Laboratorium badawcze. Produkuje 15 pieniędzy co 5 sekund. Zużywa 25 energii.",
        production: 15,
        energy: 25,
        population: 0
      },
      2: {
        name: "Laboratorium",
        cost: 35000,
        description: "Laboratorium badawcze z nowoczesnym wyposażeniem. Produkuje 25 pieniędzy co 5 sekund. Zużywa 35 energii.",
        production: 25,
        energy: 35,
        population: 0
      },
      3: {
        name: "Laboratorium",
        cost: 55000,
        description: "Laboratorium badawcze z nowoczesnym wyposażeniem i automatyzacją. Produkuje 40 pieniędzy co 5 sekund. Zużywa 40 energii.",
        production: 40,
        energy: 40,
        population: 0
      },
    }
  },
  windmill: {
    levels: {
      1: {
        name: "Wiatrak",
        cost: 3500,
        description: "Wiatrak produkujący energię. Produkuje 25 energii.",
        production: 25,
        energy: 0,
        population: 0
      },
      2: {
        name: "Wiatrak",
        cost: 6000,
        description: "Wiatrak produkujący energię. Produkuje 50 energii.",
        production: 50,
        energy: 0,
        population: 0
      },
      3: {
        name: "Wiatrak",
        cost: 9500,
        description: "Wiatrak produkujący energię. Produkuje 80 energii.",
        production: 80,
        energy: 0,
        population: 0
      },
    }
  },
};

export function initConfig(canvas, ctx) {
  state.ctx = ctx;
  state.canvas = canvas;
  const imgNames = Object.keys(buildingData);
  imgNames.forEach(name => {
    const img = new Image();
    img.src = `assets/img/${name}.png`;
    state.buildingImages[name] = img;
  });

  state.uiIcons.money = new Image();
  state.uiIcons.money.src = 'assets/img/money.png';
  state.uiIcons.energy = new Image();
  state.uiIcons.energy.src = 'assets/img/energy.png';
  state.uiIcons.population = new Image();
  state.uiIcons.population.src = 'assets/img/population.png';
  state.uiIcons.gold = new Image();
  state.uiIcons.gold.src = 'assets/img/gold.png';
  state.uiIcons.info = new Image();
  state.uiIcons.info.src = 'assets/img/info.png';
  state.uiIcons.upgrade = new Image();
  state.uiIcons.upgrade.src = 'assets/img/upgrade.png';
  state.uiIcons.remove = new Image();
  state.uiIcons.remove.src = 'assets/img/delete.png';
  state.uiIcons.happiness = new Image();




  state.mapImage.src = 'assets/img/map.png';
  state.mapImage.onload = () => {
    state.MAP_WIDTH = Math.floor(state.mapImage.width / state.TILE_SIZE);
    state.MAP_HEIGHT = Math.floor(state.mapImage.height / state.TILE_SIZE);
    state.map = Array(state.MAP_WIDTH).fill().map(() => Array(state.MAP_HEIGHT).fill(null));
    state.cameraOffsetX = (canvas.width - state.mapImage.width * state.zoom) / 2;
    state.cameraOffsetY = (canvas.height - state.mapImage.height * state.zoom) / 2;
  };
}
