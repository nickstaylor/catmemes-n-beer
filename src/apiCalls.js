require('dotenv').config()
const apiKey = process.env.REACT_APP_API_KEY;

export const catFacts = async () => {
  try {
  const response = await fetch('https://cat-fact.herokuapp.com/facts')
  if (!response.ok) {
    throw new Error(`Problem received status code of ${response.status}`)
  }
  const data = await response.json()
  return data
  } catch (error){
    window.alert(`Server Error. It's not your fault the error is: ${error}`)
  }
}

export const catImages = async () => {
  try {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=100&size=full`)
  if (!response.ok) {
    throw new Error(`Problem received status code of ${response.status}`)
  }
  const data = await response.json()
  return data
  } catch (error){
    window.alert(`Server Error. It's not your fault the error is: ${error}`)
    }
}

export const dadJoke = async () => {
  try {
  const response = await fetch('https://official-joke-api.appspot.com/jokes/random')
  if (!response.ok) {
    throw new Error(`Problem received status code of ${response.status}`)
  }
  const data = await response.json()
  return data
  } catch (error){
  window.alert(`Server Error. It's not your fault the error is: ${error}`)
  }
}

export const boredIdea = async () => {
  try {
  const response = await fetch('http://www.boredapi.com/api/activity/')
  if (!response.ok) {
    throw new Error(`Problem received status code of ${response.status}`)
  }
  const data = await response.json()
  return data.activity
  } catch (error){
    window.alert(`Server Error. It's not your fault the error is: ${error}`)
  }
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
    return response.results
  } catch (error) {
    window.alert(`Server Error. It's not your fault the error is: ${error}`)
  }
}


export const getBreweries = async (coordinates) => {
  let latitude = coordinates.lat
  let longitude = coordinates.lng
  try {
    const result = await fetch('https://fe-cors-proxy.herokuapp.com', {
      headers: {
        "Target-URL": `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=brewery&location=${latitude},${longitude}&radius=50000&type=point_of_interest&key=${apiKey}`
      }
    })
    if (!result.ok) {
      throw new Error(`Problem received status code of ${result.status}`)
    }
    const response = await result.json()
    return response.results
  } catch (error) {
    window.alert(`Server Error. It's not your fault the error is: ${error}`)
  }
}

export const getBreweryPhotos = (param) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${param}&key=${apiKey}`

  }
