const urlApi = 'https://hangman.alexischarp.fr/'
/* const urlApi = 'http://localhost:3333/' */

export async function recupererMot(langue) {
  const reponse = await fetch(urlApi, {
    method: 'POST',
    body: new URLSearchParams({ locale: langue }).toString(),
  })
  const donnees = await reponse.json()
  return donnees.word
}