// "characters": "https://rickandmortyapi.com/api/character",
// "locations": "https://rickandmortyapi.com/api/location",
// "episodes": "https://rickandmortyapi.com/api/episode"
const page = 4;
const baseUrl = "https://rickandmortyapi.com/api";

const loadCharacter = async () => {
  const res = await fetch(`${baseUrl}/character?page=${page}`);
  const data =  await res.json()
  const limitData = data.results.slice(3, 9)
  return {results: limitData}
};

const loadLocation = async () => {
  const res = await fetch(`${baseUrl}/location`)
  const data = await res.json()
  const limitData = data.results.slice(0, 10)
  return {results: limitData}
};

const loadEpisode = async () => {
  const res = await fetch(`${baseUrl}/episode`)
  const data = await res.json()
  return data
};

const loadAllWithPromiseAll = async () => {
  const [character, location, episode] = await Promise.all([
    loadCharacter(),
    loadLocation(),
    loadEpisode(),
  ])
  showCharacter(character.results)
  console.log(location)
  console.log(episode)
};
loadAllWithPromiseAll()

const showCharacter = (characters) => {
  const characterConteiner = document.getElementById("character-conteiner")
  characters.map((character)=>{
    const divCharacter = document.createElement("div")
    divCharacter.id = `character-${character.id}`
    divCharacter.innerHTML = `
      <img id="img-character" src=${character.image} alt="image character">
      <article class="character-info">
        <h3>${character.name}</h3>
        <span class="${character.status}"> ${character.status} - ${character.species} </span>

        <span class="location">Location:</span>
        <a class="character-link" href="${character.location.url}">${character.location.name}</a>

        <span class="origin">Origin:</span>
        <a class="character-link" href="${character.origin.url}">${character.origin.name}</a>
      </article>
    `
    divCharacter.classList.add("character-box")
    characterConteiner.appendChild(divCharacter)
    divCharacter.addEventListener("click", async ()=>{
      characterDetails(character.id)
    })
  })
}

const characterDetails = (id) => {
  const criptId = encryptId(id)
  window.location.href = `./pages/character.html?id=${criptId}`
}

const encryptId = (id) => {
  return id.toString(36)
}
