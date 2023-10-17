let typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  elecric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#DABC69",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#F0B6BC",
};
let startingPointLoadPokemon = 0;
let endPointLoadPokemon = 40;
let loadingInProgress = false;

async function loadPokemons() {
  for (let i = startingPointLoadPokemon; i < endPointLoadPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    console.log(currentPokemon);
    renderPokemonCard(currentPokemon);
  }
}

function renderPokemonCard(currentPokemon) {
  let pokemonCardsContainer = document.getElementById("pokemonCardsContainer");
  let type = currentPokemon.types[0].type.name; // Get the first type of the Pokémon
  let bgColor = typeColors[type] || "gray"; // Use the typeColors object or default to gray
  let id = currentPokemon["id"];

  let typesHTML = "";
  for (let i = 0; i < currentPokemon.types.length; i++) {
    typesHTML += `<h2><span class="badge bg-secondary">${currentPokemon.types[i].type.name}</span></h2>`;
  }

  /*html*/
  pokemonCardsContainer.innerHTML += `
      <div class="card card-my-definition" style="width: 18rem; background-color: ${bgColor};" onclick="showInfoPokemon(${id})">
      <div>
        <img src="${currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]}" class="card-img-top" alt="...">
        <h2><span class="badge bg-secondary id">${id}</span></h2>
        </div>
        <div class="card-body">
          <h3 class="card-title">${currentPokemon.name}</h3>
          <div class="typesContainer">
            ${typesHTML}
          </div>
        </div>
      </div>
    `;
}

function showInfoPokemon(i) {
  document.getElementById("showInfoPokemon").classList.remove("d-none");
  loadPokemon(i);
}

async function loadPokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  let currentPokemon = await response.json();
  //console.log(currentPokemon);
  renderInfoPokemon(currentPokemon);
}

function renderInfoPokemon(currentPokemon) {
  let infoPokemonContainer = document.getElementById("showInfoPokemon");
  let type = currentPokemon.types[0].type.name; // Get the first type of the Pokémon
  let bgColor = typeColors[type] || "gray"; // Use the typeColors object or default to gray
  let id = currentPokemon["id"];

  let typesHTML = "";
  for (let i = 0; i < currentPokemon.types.length; i++) {
    typesHTML += `<h2><span class="badge bg-secondary">${currentPokemon.types[i].type.name}</span></h2>`;
  }
  /*html*/
  infoPokemonContainer.innerHTML = `
  <div class="card info-card-my-definition">
  <button type="button" class="btn-close btn-close-my-definition" aria-label="Close" onclick="hideInfoPokemon()"></button>
  <img src="${currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]}" class="card-img-top" alt="..." style="background-color: ${bgColor};">
  <div class="card-body">
    <h3 class="card-title">${currentPokemon.name}</h3>
    <p class="card-text">${id}</p>
          <div class="typesContainer">
            ${typesHTML}
          </div>
          <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-about" aria-selected="true">About</button>
            <button class="nav-link" id="nav-base-stats-tab" data-bs-toggle="tab" data-bs-target="#nav-base-stats" type="button" role="tab" aria-controls="nav-base-stats" aria-selected="false">Base-stats</button>
            <button class="nav-link" id="nav-evolution-tab" data-bs-toggle="tab" data-bs-target="#nav-evolution" type="button" role="tab" aria-controls="nav-evolution" aria-selected="false">Evolution</button>
            <button class="nav-link" id="nav-moves-tab" data-bs-toggle="tab" data-bs-target="#nav-moves" type="button" role="tab" aria-controls="nav-moves" aria-selected="false">Moves</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab" tabindex="0"></div>
          <div class="tab-pane fade" id="nav-base-stats" role="tabpanel" aria-labelledby="nav-base-stats-tab" tabindex="0">aslkgjaojgo</div>
          <div class="tab-pane fade" id="nav-evolution" role="tabpanel" aria-labelledby="nav-evolution-tab" tabindex="0">ashdgoajoewg</div>
          <div class="tab-pane fade" id="nav-moves" role="tabpanel" aria-labelledby="nav-moves-tab" tabindex="0">Moves</div>
        </div>
        
  </div>
</div>
  `;
  showAboutPokemon(currentPokemon);
  createOnclickTab(currentPokemon)
}

function createOnclickTab(currentPokemon) {
  let tabAbout = document.getElementById('nav-about-tab');
  tabAbout.onclick = function () {
    showAboutPokemon(currentPokemon);
  };
}


function showAboutPokemon(currentPokemon) {
  let abilitiesHTML = ""; // Initialize an empty string for abilities

  for (let i = 0; i < currentPokemon.abilities.length; i++) {
    abilitiesHTML += currentPokemon.abilities[i].ability.name;
    if (i < currentPokemon.abilities.length - 1) {
      abilitiesHTML += ", "; // Add a comma and space if there are more abilities
    }
  }

  let heldItemsHTML = "none"; // Default value for held items

  if (currentPokemon.held_items.length > 0) {
    // If there are held items, initialize the HTML string
    heldItemsHTML = "";
    for (let i = 0; i < currentPokemon.held_items.length; i++) {
      heldItemsHTML += currentPokemon.held_items[i].item.name;
      if (i < currentPokemon.held_items.length - 1) {
        heldItemsHTML += ", "; // Add a comma and space if there are more held items
      }
    }
  }

  /*html*/
  document.getElementById("nav-about").innerHTML = `
    <table>
      <tr>
        <td>Height</td>
        <td>${currentPokemon.height} cm</td>
      </tr>
      <tr>
        <td>Weight</td>
        <td>${currentPokemon.weight} g</td>
      </tr>
      <tr>
        <td>Abilities</td>
        <td>${abilitiesHTML}</td>
      </tr>
      <tr>
        <td>Held items</td>
        <td>${heldItemsHTML}</td>
      </tr>
    </table>
  `;
}



function showBaseStatsPokemon(tabElement) {
  activateTab(tabElement);
  document.getElementById("cardBody").innerHTML = `
    Base Stats
  `;
}

function showEvolutionPokemon(tabElement) {
  activateTab(tabElement);
  document.getElementById("cardBody").innerHTML = `
    Evolution
  `;
}

function showMovesPokemon(tabElement) {
  activateTab(tabElement);
  document.getElementById("cardBody").innerHTML = `
    Moves
  `;
}

function hideInfoPokemon() {
  document.getElementById("showInfoPokemon").classList.add("d-none");
}

function loadMorePokemons() {
  // Check if the user has scrolled to 90% of the page height
  if (
    !loadingInProgress &&
    window.innerHeight + window.scrollY >= document.body.scrollHeight * 0.9
  ) {
    loadingInProgress = true;
    startingPointLoadPokemon += 40;
    endPointLoadPokemon += 40;
    loadPokemons().then(() => {
      loadingInProgress = false;
    });
  }
}

window.addEventListener("scroll", loadMorePokemons);
