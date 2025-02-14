const decryptId = (id) => {
  return parseInt(id, 36)
}

const loadCharacter = async (url, id) => {
  try {
    const res = await fetch(`${url}/${id}`)
    if(!res.ok){
      throw new Error("Erro ao carregar o personagem")
    }
    const data = await res.json()

    return data

  } catch (error) {
    console.log(error)
  }
}

const loadAll = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  console.log(urlParams)
  const idParam = urlParams.get('id')
  console.log(idParam)

  if(!idParam){
    //colocar o usuário na página inicial
    window.location.href = "../index.html"
    console.log("Id não encontrado na URL")
    return
  }

  const idDescrypted = decryptId(idParam)
  console.log(idDescrypted)
  const baseUrl = `https://rickandmortyapi.com/api/character/`


  try {
    const character = await loadCharacter(baseUrl, idDescrypted)
    console.log(character)
  } catch (error) {
    console.log(error)
  }
}
loadAll()
