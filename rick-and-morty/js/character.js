const decryptId = (id) => {
  return parseInt(id, 36);
};

// Função para carregar os detalhes do personagem
const loadCharacter = async (id) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) {
      throw new Error("Erro ao carregar o personagem");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

// Função para carregar os episódios do personagem
const loadEpisodes = async (episodeUrls) => {
  try {
    const episodes = await Promise.all(
      episodeUrls.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Erro ao carregar os episódios");
        }
        return await res.json();
      })
    );
    return episodes;
  } catch (error) {
    console.log(error);
  }
};

// Função principal que carrega o personagem e os episódios
const loadAll = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  if (!idParam) {
    window.location.href = "../index.html";
    return;
  }

  const idDescrypted = decryptId(idParam);

  try {
    const character = await loadCharacter(idDescrypted);
    showCharacterDetails(character);

    // Carregar os episódios do personagem
    const episodes = await loadEpisodes(character.episode);
    listarepisodios(episodes);
  } catch (error) {
    console.log(error);
  }
};

// Função para mostrar os detalhes do personagem
const showCharacterDetails = (character) => {
  const detailsContainer = document.getElementById("character-card");

  detailsContainer.innerHTML = `
    <img src="${character.image}" alt="${character.name}" />
    <h2>${character.name}</h2>
    <p class="status">
      <strong>Status:</strong>
      <span class="${character.status}"></span> ${character.status}
    </p>
    <p><strong>Espécie:</strong> ${character.species}</p>
    <p><strong>Gênero:</strong> ${character.gender}</p>
    <p><strong>Origem:</strong> ${character.origin.name}</p>
    <p><strong>Localização:</strong> ${character.location.name}</p>
  `;
};


// Função para mostrar a lista de episódios
const listarepisodios = (episodes) => {
  const episodeslist = document.getElementById("list-episode");

  episodes.forEach((episode) => {
    const li = document.createElement("li");
    li.className = "episodes-list"
    li.textContent = `${episode.name} - ${episode.air_date}`;
    episodeslist.appendChild(li);
  });
};

loadAll();
