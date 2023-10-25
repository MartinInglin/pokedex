let loadingInProgress = false;
let myChart;
let lastExecutionTime = 0;

async function loadPokemons() {
  for (let i = startingPointLoadPokemon; i < endPointLoadPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    renderPokemonCard(currentPokemon);
  }
}

function renderPokemonCard(currentPokemon) {
  let pokemonCardsContainer = document.getElementById("pokemonCardsContainer");
  let type = currentPokemon.types[0].type.name; // Get the first type of the Pokémon
  let bgColor = typeColors[type] || "gray"; // Use the typeColors object or default to gray
  let id = currentPokemon["id"];
  let typesHTML = getTypesPokemon(currentPokemon.types);

  pokemonCardsContainer.innerHTML += renderHTMLPokemonCard(bgColor, id, typesHTML, currentPokemon);
  addEventListenerScroll();
}

async function showInfoPokemon(i) {
  await loadPokemon(i);
  document.getElementById("showInfoPokemon").classList.remove("d-none");
}

async function loadPokemon(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  let currentPokemon = await response.json();
  renderInfoPokemon(currentPokemon);
}

function renderInfoPokemon(currentPokemon) {
  let infoPokemonContainer = document.getElementById("showInfoPokemon");
  let type = currentPokemon.types[0].type.name; // Get the first type of the Pokémon
  let bgColor = typeColors[type] || "gray"; // Use the typeColors object or default to gray
  let id = currentPokemon["id"];
  let typesHTML = getTypesPokemon(currentPokemon.types);

  infoPokemonContainer.innerHTML = renderHTMLInfoPokemonCard(currentPokemon, typesHTML, bgColor, id);
  showAboutPokemon(currentPokemon);
  createOnclickTab(currentPokemon);
  preventBodyScrolling();
  hideFilter();
}

function createOnclickTab(currentPokemon) {
  let tabAbout = document.getElementById("nav-about-tab");
  tabAbout.onclick = function () {
    showAboutPokemon(currentPokemon);
  };
  let tabBaseStats = document.getElementById("nav-base-stats-tab");
  tabBaseStats.onclick = function () {
    showBaseStatsPokemon(currentPokemon);
  };
  let tabMoves = document.getElementById("nav-moves-tab");
  tabMoves.onclick = function () {
    showMovesPokemon(currentPokemon);
  };
}

function showAboutPokemon(currentPokemon) {
  let abilitiesHTML = findAbilitiesPokemon(currentPokemon.abilities);
  let heldItemsHTML = findHeldItems(currentPokemon);

  document.getElementById("nav-about").innerHTML = renderHTMLTableInfoAboutPokemon(currentPokemon, abilitiesHTML, heldItemsHTML);
}

function findAbilitiesPokemon(abilities) {
  let abilitiesHTML = "";
  for (let i = 0; i < abilities.length; i++) {
    abilitiesHTML += abilities[i].ability.name;
    if (i < abilities.length - 1) {
      abilitiesHTML += ", ";
    }
  }
  return abilitiesHTML;
}

function findHeldItems(currentPokemon) {
  let heldItemsHTML = "none";

  if (currentPokemon.held_items.length > 0) {
    heldItemsHTML = "";
    for (let i = 0; i < currentPokemon.held_items.length; i++) {
      heldItemsHTML += currentPokemon.held_items[i].item.name;
      if (i < currentPokemon.held_items.length - 1) {
        heldItemsHTML += ", ";
      }
    }
  }

  return heldItemsHTML;
}

function showBaseStatsPokemon(currentPokemon) {
  createChart(currentPokemon);
}

function showMovesPokemon(currentPokemon) {
  let movesContainer = document.getElementById("movesContainer");
  let moves = currentPokemon["moves"];

  for (let i = 0; i < moves.length; i++) {
    /*html*/
    movesContainer.innerHTML += `
      <h6><span class="badge bg-secondary">${moves[i]["move"]["name"]}</span></h6>
    `;
  }
}

function hideInfoPokemon() {
  document.getElementById("showInfoPokemon").classList.add("d-none");
  document.getElementById("body").classList.remove("noScroll");
}

function loadMorePokemons() {
  const currentTime = Date.now();
  let scrollContainer = document.getElementById("scrollContainer");

  if (shouldLoadMorePokemons(scrollContainer, currentTime)) {
    loadingInProgress = true;
    startingPointLoadPokemon += 40;
    endPointLoadPokemon += 40;
    lastExecutionTime = currentTime;

    loadPokemons().then(() => {
      loadingInProgress = false;
    });
  }
}

function shouldLoadMorePokemons(scrollContainer, currentTime) {
  return !loadingInProgress && currentTime - lastExecutionTime >= 3000 && scrollContainer.offsetHeight + scrollContainer.scrollTop >= scrollContainer.scrollHeight * 0.9;
}
