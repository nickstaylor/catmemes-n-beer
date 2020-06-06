require('dotenv').config()
const catKey = process.env.REACT_APP_CAT_API_KEY;
const apiKey = process.env.REACT_APP_API_KEY;
console.log('apiKey', apiKey);
console.log('catKey', catKey);


export const catFacts = async () => {
  const response = await fetch('https://cat-fact.herokuapp.com/facts')
  const data = await response.json()
  return data
}

export const catImages = async () => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=100&key=${catKey}&size=full`)
    const data = await response.json()
    return data
}

export const dadJoke = async () => {
  const response = await fetch('https://official-joke-api.appspot.com/jokes/random')
  const data = await response.json()
  return data
}

export const getCoordinates = async (zipCode) => {
  try {
    const result = await fetch('https://fe-cors-proxy.herokuapp.com', {
      headers: {
        "Target-URL": `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`
      }
    })
    if (!result.ok) {
      throw new Error(`Problem received status code of ${result.status}`)
    }
    const response = await result.json()
    console.log(response)
    return response.results
  } catch (error) {
    window.alert(`Server Error. It's not your fault the error is: ${error}`)
  }
}
