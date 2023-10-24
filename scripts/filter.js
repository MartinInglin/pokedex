let matchingPokemonNames;

async function searchPokemonFromInput() {
  const searchNameInput = document.getElementById("searchName");
  const query = searchNameInput.value.trim().toLowerCase(); // Get and normalize the input
  await searchAndStorePokemonIDs(query); // Search and store IDs
  loadFilteredPokemons();
  hideFilter();
}

async function searchAndStorePokemonIDs(searchCharacters) {
  matchingPokemonNames = await filterPokemonIDsByCharacters(searchCharacters);
  console.log(matchingPokemonNames);
}

async function filterPokemonIDsByCharacters(searchCharacters) {
  const allPokemonData = await getAllPokemonData();

  if (allPokemonData.length === 0) {
    return [];
  }

  const filteredIDs = allPokemonData.filter((pokemon) => pokemon.name.includes(searchCharacters)).map((pokemon) => pokemon.name);

  return filteredIDs;
}

async function getAllPokemonData() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
}

async function loadFilteredPokemons() {
  await emptyPokemonCardsContainer();
  loadingInProgress = true;

  if (matchingPokemonNames.length === 0) {
    showSorry();
    return;
  }
  for (let i = 0; i < matchingPokemonNames.length; i++) {
    let pokemonName = matchingPokemonNames[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    renderPokemonCard(currentPokemon);
  }
}

function emptyPokemonCardsContainer() {
  let pokemonCardsContainer = document.getElementById("pokemonCardsContainer");
  pokemonCardsContainer.innerHTML = "";
}

function showSorry() {
  let pokemonCardsContainer = document.getElementById("pokemonCardsContainer");
  pokemonCardsContainer.innerHTML = `
    <h3>Sorry, but we could not find a Pokemon with that name. Please try another one.</h3>
  `;
}

function resetVariables() {
  startingPointLoadPokemon = 0;
  endPointLoadPokemon = 40;
  loadingInProgress = false;
}

function toggleFilter() {
  const filterContainer = document.getElementById("filterContainer");
  if (filterContainer.classList.contains("d-none")) {
    showFilter();
  } else {
    resetVariables();
    hideFilter();
    emptyPokemonCardsContainer();
    loadPokemons();
  }
}

function showFilter() {
  document.getElementById("filterContainer").classList.remove("d-none");
  document.getElementById("pokeball").classList.add("pokeball-active");
}

function hideFilter() {
  document.getElementById("filterContainer").classList.add("d-none");
  document.getElementById("pokeball").classList.remove("pokeball-active");
}

function resetFilter() {
  document.getElementById("search").reset();
  toggleFilter();
}
