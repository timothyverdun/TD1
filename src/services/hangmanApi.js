/* const urlApi = 'https://hangman.alexischarp.fr/' */
const urlApi = 'http://localhost:3333/'

// Demande un mot aléatoire à l'API pour la langue choisie.
export async function recupererMot(langue) {
  const reponse = await fetch(urlApi, {
    method: 'POST',
    body: new URLSearchParams({ locale: langue }).toString(),
  })
  const donnees = await reponse.json()
  return donnees.word
}