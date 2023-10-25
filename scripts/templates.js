function renderHTMLPokemonCard(bgColor, id, typesHTML, currentPokemon) {
    /*html*/
    return `
    <div class="card card-my-definition" style="background-color: ${bgColor};" onclick="showInfoPokemon(${id})">
    <div>
      <img src="${currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]}" class="card-img-top" alt="Image-Pokemon">
      <h4><span class="badge bg-secondary id"># ${id}</span></h4>
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

function renderHTMLInfoPokemonCard(currentPokemon, typesHTML, bgColor, id) {
    /*html*/
    return `
    <div class="card info-card-my-definition">
    <button type="button" class="btn-close btn-close-my-definition" aria-label="Close" onclick="hideInfoPokemon()"></button>
    <img src="${currentPokemon["sprites"]["other"]["official-artwork"]["front_default"]}" class="card-img-top" alt="Image Pokemon" style="background-color: ${bgColor};">
    <div class="card-body card-body-info">
      <div class="title-n-id">
        <h3 class="card-title">${currentPokemon.name}</h3>
        <p class="card-text">#${id}</p>
      </div>
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
}

function renderHTMLTableInfoAboutPokemon(currentPokemon, abilitiesHTML, heldItemsHTML) {
    /*html*/
    return `
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