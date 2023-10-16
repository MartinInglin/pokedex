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
        <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" class="card-img-top" alt="...">
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
  <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" class="card-img-top" alt="..." style="background-color: ${bgColor};">
  <div class="card-body">
    <h5 class="card-title">${currentPokemon.name}</h5>
    <p class="card-text">${id}</p>
          <div class="typesContainer">
            ${typesHTML}
          </div>
          <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-about" aria-selected="true" onclick="showAboutPokemon(${currentPokemon})">About</button>
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
}

function showAboutPokemon(currentPokemon) {
  /*html*/
  document.getElementById('nav-about').innerHTML = `
    <table>
      <tr>
        <td>Species</td>
        <td>${currentPokemon['name']}</td>
      </tr>
      <tr>
        <td>Height</td>
        <td>${currentPokemon['height']}</td>
      </tr>
      <tr>
        <td>Weight</td>
        <td>${currentPokemon['weight']}</td>
      </tr>
      <tr>
        <td>Abilities</td>
        <td>${currentPokemon['abilities'][0]['ability']['name']} ${currentPokemon['abilities'][1]['ability']['name']}</td>
      </tr>
    </table>
  `;
}

function showBaseStatsPokemon(tabElement) {
  activateTab(tabElement)
  document.getElementById('cardBody').innerHTML = `
    Base Stats
  `;
}

function showEvolutionPokemon(tabElement) {
  activateTab(tabElement)
  document.getElementById('cardBody').innerHTML = `
    Evolution
  `;
}

function showMovesPokemon(tabElement) {
  activateTab(tabElement)
  document.getElementById('cardBody').innerHTML = `
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
