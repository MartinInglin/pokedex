let typeColors = {normal: "#A8A878", fire: "#F08030", water: "#6890F0", grass: "#78C850", elecric: "#F8D030", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0", ground: "#DABC69", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820", rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848", steel: "#B8B8D0", fairy: "#F0B6BC"}

async function loadPokemons() {
  for (let i = 0; i < 40; i++) {
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
    let id = currentPokemon['id'];
  
    let typesHTML = "";
    for (let i = 0; i < currentPokemon.types.length; i++) {
      typesHTML += `<h2><span class="badge bg-secondary">${currentPokemon.types[i].type.name}</span></h2>`;
    }
  
    /*html*/
    pokemonCardsContainer.innerHTML += `
      <div class="card" style="width: 18rem; background-color: ${bgColor};">
      <div>
        <img src="${currentPokemon.sprites.front_default}" class="card-img-top" alt="...">
        <h2><span class="badge bg-secondary id">${id}</span></h2>
        </div>
        <div class="card-body">
          <h5 class="card-title">${currentPokemon.name}</h5>
          <div class="typesContainer">
            ${typesHTML}
          </div>
        </div>
      </div>
    `;
  }


