const page = 9;
const baseUrl = "https://rickandmortyapi.com/api";

const loadCharacter = async () => {
  const res = await fetch(`${baseUrl}/character?page=${page}`);
  const data = await res.json();
  return { results: data.results.slice(1, 9) };
};

const loadAllWithPromiseAll = async () => {
  const character = await loadCharacter();
  showCharacter(character.results);
};
loadAllWithPromiseAll();

const showCharacter = (characters) => {
  const characterConteiner = document.getElementById("character-conteiner");
  characters.forEach((character) => {
    const divCharacter = document.createElement("div");
    divCharacter.id = `character-${character.id}`;
    divCharacter.classList.add("character-box");

    divCharacter.innerHTML = `
      <img id="img-character" src="${character.image}" alt="image character">
      <article class="character-info">
        <h3>${character.name}</h3>
        <span class="${character.status}">${character.status} - ${character.species}</span>
        <span class="location">Location:</span>
        <a class="character-link">${character.location.name}</a>
        <span class="origin">Origin:</span>
        <a class="character-link">${character.origin.name}</a>
      </article>
    `;

    characterConteiner.appendChild(divCharacter);

    divCharacter.addEventListener("click", () => {
      characterDetails(character.id);
    });
  });
};

const characterDetails = (id) => {
  const criptId = encryptId(id);
  window.location.href = `./pages/character.html?id=${criptId}`;
};

const encryptId = (id) => {
  return id.toString(36);
};
