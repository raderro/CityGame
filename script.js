// Ustawienia gry
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let money = 1000;
let energy = 500;
let population = 0;

// Stałe
const TILE_SIZE = 40; // Rozmiar kafelka
const MAP_WIDTH = canvas.width / TILE_SIZE;
const MAP_HEIGHT = canvas.height / TILE_SIZE;

// Ładowanie tła z mapą
const mapImage = new Image();
mapImage.src = 'img/map.png';  // Zmień ścieżkę na swoją mapę PNG
mapImage.onload = function() {
  drawMap();
};

// Ładowanie obrazków budynków
const buildingImages = {
  house: new Image(),
  apartment: new Image(),
  mansion: new Image(),
  hospital: new Image(),
  office: new Image(),
  shop: new Image(),
  gallery: new Image(),
  playground: new Image(),
  mine: new Image(),
  powerPlant: new Image() // Dodano elektrownię
};

buildingImages.house.src = 'img/house.png';
buildingImages.apartment.src = 'img/apartment.png';
buildingImages.mansion.src = 'img/mansion.png';
buildingImages.hospital.src = 'img/hospital.png';
buildingImages.office.src = 'img/office.png';
buildingImages.shop.src = 'img/shop.png';
buildingImages.gallery.src = 'img/gallery.png';
buildingImages.playground.src = 'img/playground.png';
buildingImages.mine.src = 'img/mine.png'; // Ścieżka do kopalni
buildingImages.powerPlant.src = 'img/powerPlant.png'; // Ścieżka do elektrowni

// Mapa i stan gry
let map = Array(MAP_WIDTH).fill().map(() => Array(MAP_HEIGHT).fill(null));
let selectedTile = { x: -1, y: -1 };

// Lista kopalni i elektrowni
let mines = [];
let powerPlants = [];

// Funkcja rysująca mapę
function drawMap() {
  ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height); // Rysujemy tło (mapę)
  
  // Rysowanie siatki na mapie
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Kolor linii siatki (lekko przezroczysty)
  ctx.lineWidth = 1;
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }

  // Rysowanie budynków
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const building = map[x][y];
      if (building) {
        ctx.drawImage(buildingImages[building.type], x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

// Funkcja aktualizująca zasoby
function updateResources() {
  document.getElementById("money").textContent = money;
  document.getElementById("energy").textContent = energy;
  document.getElementById("population").textContent = population;
}

// Funkcja do sprawdzenia, czy kliknięty kafelek jest czarny
function isTileBlack(x, y) {
  const imageData = ctx.getImageData(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  const pixel = imageData.data;

  for (let i = 0; i < pixel.length; i += 4) {
    const r = pixel[i];     // Czerwony
    const g = pixel[i + 1]; // Zielony
    const b = pixel[i + 2]; // Niebieski
    const a = pixel[i + 3]; // Alfa (przezroczystość)

    if (r < 50 && g < 50 && b < 50) {
      return true;  // Kafelek jest czarny
    }
  }
  return false; // Kafelek nie jest czarny
}

// Funkcja do wyświetlania menu wyboru budynku
function showBuildingMenu(x, y) {
    if (isTileBlack(x, y)) {
      alert("Nie możesz postawić budynku na ulicy!");
      return; // Blokujemy możliwość wyboru budynku, jeśli kliknięto na ulicę
    }
    
    selectedTile = { x, y };
    const menu = document.getElementById("buildingMenu");
    menu.style.display = 'block';  // Pokazujemy menu
  
    // Generowanie opcji wyboru budynków
    const menuOptions = document.getElementById("menuOptions");
    menuOptions.innerHTML = ''; // Resetowanie poprzednich opcji
  
    const buildingTypes = ['house', 'apartment', 'mansion', 'hospital', 'office', 'shop', 'gallery', 'playground', 'mine', 'powerPlant'];
    buildingTypes.forEach(type => {
      const img = document.createElement('img');
      img.src = buildingImages[type].src;
      img.alt = type;
      img.classList.add('menuOption');
      img.onclick = () => placeBuilding(type);
      menuOptions.appendChild(img);
    });
    
    // Dodajemy zdarzenie kliknięcia przycisku do zamknięcia menu
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    closeMenuBtn.onclick = () => {
      document.getElementById("buildingMenu").style.display = 'none';  // Ukrywamy menu
    };
  }

// Funkcja do umieszczania budynku
function placeBuilding(type) {
  if (money < 100) return; // Nie masz wystarczająco pieniędzy
  
  if (map[selectedTile.x][selectedTile.y]) {
    alert("Kafelek jest już zajęty!");
    return;
  }

  // Dodajemy wybrany budynek
  map[selectedTile.x][selectedTile.y] = { type: type };

  if (type === 'mine') {
    // Dodajemy kopalnię do listy
    mines.push({ x: selectedTile.x, y: selectedTile.y, lastIncomeTime: Date.now() });
  }

  if (type === 'powerPlant') {
    // Dodajemy elektrownię do listy
    powerPlants.push({ x: selectedTile.x, y: selectedTile.y, lastPowerProductionTime: Date.now() });
  }

  money -= (type === 'powerPlant') ? 250 : 100; // Elektrownia kosztuje 250 monet, inne budynki 100 monet
  population += (type === 'house') ? 5 : 0; // Tylko domy zwiększają populację

  document.getElementById("buildingMenu").style.display = 'none';
  drawMap();
  updateResources();
}

// Zużycie energii przez różne typy budynków (wartości przykładowe)
const energyConsumption = {
  house: 5,        // Dom zużywa 5 energii na minutę
  apartment: 10,   // Mieszkanie zużywa 10 energii na minutę
  mansion: 15,     // Kamienica zużywa 15 energii na minutę
  hospital: 20,    // Szpital zużywa 20 energii na minutę
  office: 10,      // Urząd zużywa 10 energii na minutę
  shop: 5,         // Sklep zużywa 5 energii na minutę
  gallery: 10,     // Galeria zużywa 10 energii na minutę
  playground: 0,   // Plac zabaw nie zużywa energii
  mine: 0,         // Kopalnia nie zużywa energii
  powerPlant: 0    // Elektrownia nie zużywa energii
};

// Funkcja do obliczania zużycia energii
function calculateEnergyConsumption() {
  let totalConsumption = 0;

  // Przechodzimy po wszystkich budynkach na mapie i sumujemy ich zużycie energii
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const building = map[x][y];
      if (building) {
        totalConsumption += energyConsumption[building.type] || 0; // Dodajemy zużycie energii dla danego typu budynku
      }
    }
  }

  // Zmniejszamy energię o całkowite zużycie
  energy -= totalConsumption;
  if (energy < 0) {
    energy = 0; // Energia nie może spaść poniżej 0
  }
  updateResources(); // Aktualizujemy zasoby
}

// Funkcja do aktualizacji energii z elektrowni
function updatePowerPlants() {
  const currentTime = Date.now();

  // Przechodzimy po wszystkich elektrowniach
  powerPlants.forEach(powerPlant => {
    if (currentTime - powerPlant.lastPowerProductionTime >= 60000) { // 60 sekund (1 minuta)
      energy += 100; // Elektrownia produkuje 100 energii
      powerPlant.lastPowerProductionTime = currentTime; // Resetujemy czas dla elektrowni
      console.log('Produkcja energii: +100');
      updateResources(); // Aktualizujemy zasoby
    }
  });
}

// Funkcja do zmniejszania energii co minutę
function decreaseEnergy() {
  energy -= 10; // Zmniejszamy energię o 10 co minutę
  if (energy < 0) energy = 0; // Energia nie może spaść poniżej 0
  updateResources();
}

// Funkcja animująca grę
function gameLoop() {
  updatePowerPlants(); // Sprawdzamy, czy elektrownie generują energię
  calculateEnergyConsumption(); // Sprawdzamy, czy inne budynki zużywają energię
  decreaseEnergy(); // Sprawdzamy, czy energia spada co minutę

  // Używamy setTimeout do uruchamiania co minutę (60000 ms)
  setTimeout(gameLoop, 60000); // Powtarzamy co minutę
}

// Uruchamiamy główną pętlę gry
gameLoop();

// Obsługa kliknięć myszką
canvas.addEventListener('click', (e) => {
  const x = Math.floor(e.offsetX / TILE_SIZE);
  const y = Math.floor(e.offsetY / TILE_SIZE);

  // Jeśli klikniemy na pusty kafelek, pokażemy menu
  if (!map[x][y]) {
    showBuildingMenu(x, y);
  }
});

// Inicjalizacja gry
function startGame() {
  updateResources();
}

// Uruchomienie gry
startGame();
