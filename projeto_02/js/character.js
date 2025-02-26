// Função para descriptografar o ID
const decryptId = (id) => {
  return parseInt(id, 36); // Descriptografa o ID (em base 36)
}

// Função para carregar os dados do personagem
const loadCharacter = async (url, id) => {
  try {
    const res = await fetch(`${url}/${id}`);
    if (!res.ok) {
      throw new Error("Erro ao carregar o personagem");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Função principal que carrega os dados do personagem
const loadAll = async () => {
  const urlParams = new URLSearchParams(window.location.search); // Pega os parâmetros da URL
  const idParam = urlParams.get('id'); // Pega o ID da URL

  if (!idParam) {
    // Se não tiver o ID na URL, redireciona para a página inicial
    window.location.href = "../index.html";
    console.log("ID não encontrado na URL");
    return;
  }

  const idDescrypted = decryptId(idParam); // Descriptografa o ID
  const baseUrl = `https://rickandmortyapi.com/api/character/`; // URL base para carregar o personagem

  try {
    // Carrega os dados do personagem usando a API
    const character = await loadCharacter(baseUrl, idDescrypted);
    showCharacterCard(character); // Exibe o card com as informações do personagem
  } catch (error) {
    console.log(error);
  }
}

const showCharacterCard = (character) => {
  const characterContainer = document.getElementById('character-container'); // Container para o card

  // Estrutura HTML do card do personagem, mais parecida com a estrutura da página index.html
  const cardHTML = `
    <div class="character-box">
      <img src="${character.image}" alt="${character.name}">
      <div class="character-info">
        <h3>${character.name}</h3>
        <span class="${character.status}">${character.status} - ${character.species}</span>

        <div class="character-location">
          <span class="location">Location:</span>
          <a href="${character.location.url}" class="character-link">${character.location.name}</a>
        </div>

        <div class="character-origin">
          <span class="origin">Origin:</span>
          <a href="${character.origin.url}" class="character-link">${character.origin.name}</a>
        </div>
      </div>
    </div>
  `;

  characterContainer.innerHTML = cardHTML; // Adiciona o card ao container na página
}



loadAll(); // Executa a função de carregar os dados
