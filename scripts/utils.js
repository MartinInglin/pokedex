function addEventListenerScroll() {
    const scrollContainer = document.getElementById("scrollContainer");
    scrollContainer.addEventListener("scroll", loadMorePokemons);
  }
  
  function removeEventListenerScroll() {
    const scrollContainer = document.getElementById("scrollContainer");
    scrollContainer.removeEventListener("scroll", loadMorePokemons);
  }

  function resetVariables() {
    filteredPokemons = [];
    startingPointLoadPokemon = 0;
    endPointLoadPokemon = 40;
    loadingInProgress = false;
  }

  function emptyPokemonCardsContainer() {
    let pokemonCardsContainer = document.getElementById("pokemonCardsContainer");
    pokemonCardsContainer.innerHTML = "";
  }

  function preventBodyScrolling() {
    document.getElementById("body").classList.add("noScroll");
  }

  function getTypesPokemon(types) {
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
      typesHTML += `<h4><span class="badge bg-secondary">${types[i].type.name}</span></h4>`;
    }
    return typesHTML;
  }