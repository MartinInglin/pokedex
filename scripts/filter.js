// Function to search and display Pokémon with names containing the input text

async function searchPokemonFromInput() {
  const searchNameInput = document.getElementById("searchName");
  const query = searchNameInput.value.trim().toLowerCase(); // Get and normalize the input
  console.log(query);
  searchAndStorePokemonNames(query); // Replace with the characters you want to search for
}

async function searchAndStorePokemonNames(searchCharacters) {
  const matchingPokemonNames = await filterPokemonNamesByCharacters(
    searchCharacters
  );
  console.log(matchingPokemonNames);
}

async function filterPokemonNamesByCharacters(searchCharacters) {
  const allPokemonNames = await getAllPokemonNames();

  if (allPokemonNames.length === 0) {
    console.log("No Pokémon names to search.");
    return [];
  }

  const filteredNames = allPokemonNames.filter((name) =>
    name.includes(searchCharacters)
  );

  return filteredNames;
}

async function getAllPokemonNames() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=898");
    return response.data.results.map((pokemon) => pokemon.name);
  } catch (error) {
    console.error("Error fetching Pokémon names:", error);
    return [];
  }
}
