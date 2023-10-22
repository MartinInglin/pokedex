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

  let typesHTML = "";
  for (let i = 0; i < currentPokemon.types.length; i++) {
    typesHTML += `<h4><span class="badge bg-secondary">${currentPokemon.types[i].type.name}</span></h4>`;
  }

  /*html*/
  pokemonCardsContainer.innerHTML += `
      <div class="card card-my-definition" style="background-color: ${bgColor};" onclick="showInfoPokemon(${id})">
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
  console.log(currentPokemon);
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
    <p class="card-text">#${id}</p>
          <div class="typesContainer">
            ${typesHTML}
          </div>
          <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about" type="button" role="tab" aria-controls="nav-about" aria-selected="true">About</button>
            <button class="nav-link" id="nav-base-stats-tab" data-bs-toggle="tab" data-bs-target="#nav-base-stats" type="button" role="tab" aria-controls="nav-base-stats" aria-selected="false">Base-Stats</button>
            <button class="nav-link" id="nav-moves-tab" data-bs-toggle="tab" data-bs-target="#nav-moves" type="button" role="tab" aria-controls="nav-moves" aria-selected="false">Moves</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab" tabindex="0"></div>
          <div class="tab-pane fade" id="nav-base-stats" role="tabpanel" aria-labelledby="nav-base-stats-tab" tabindex="0"><canvas id="baseStats"></canvas></div>
          <div class="tab-pane fade" id="nav-moves" role="tabpanel" aria-labelledby="nav-moves-tab" tabindex="0"><div id="movesContainer" class="movesContainer"></div></div>
        </div>
        
  </div>
</div>
  `;
  showAboutPokemon(currentPokemon);
  createOnclickTab(currentPokemon);
  preventBodyScrolling();
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

function showBaseStatsPokemon(currentPokemon) {
  if (myChart) {
    // If a chart instance exists, destroy it
    myChart.destroy();
  }
  let stat = currentPokemon["stats"];
  const data = {
    labels: [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ],
    datasets: [
      {
        label: "Base Stats",
        data: [
          stat[0]["base_stat"],
          stat[1]["base_stat"],
          stat[2]["base_stat"],
          stat[3]["base_stat"],
          stat[4]["base_stat"],
          stat[5]["base_stat"],
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  myChart = new Chart(document.getElementById("baseStats"), {
    type: "radar",
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.dataset.data[context.dataIndex];
              return value;
            }
          }
        }
      },
      options: {
        layout: {
          padding: -50
        }
      }
    },
  });
}

function showMovesPokemon(currentPokemon) {
  let movesContainer = document.getElementById('movesContainer');
  let moves = currentPokemon['moves'];

  for (let i = 0; i < moves.length; i++) {
    /*html*/
    movesContainer.innerHTML += `
      <h6><span class="badge bg-secondary">${moves[i]['move']['name']}</span></h6>
    `;
  }
}

function preventBodyScrolling() {
  document.getElementById('body').classList.add('noScroll');
}

function hideInfoPokemon() {
  document.getElementById("showInfoPokemon").classList.add("d-none");
  document.getElementById('body').classList.remove('noScroll');
}

function loadMorePokemons() {
  const currentTime = Date.now();

  // Check if the user has scrolled to 90% of the page height and enough time has passed
  if (
    !loadingInProgress &&
    currentTime - lastExecutionTime >= 3000 &&
    window.innerHeight + window.scrollY >= document.body.scrollHeight * 0.9
  ) {
    loadingInProgress = true;
    startingPointLoadPokemon += 40;
    endPointLoadPokemon += 40;
    lastExecutionTime = currentTime;

    loadPokemons().then(() => {
      loadingInProgress = false;
    });
  }
}

window.addEventListener("scroll", loadMorePokemons);
