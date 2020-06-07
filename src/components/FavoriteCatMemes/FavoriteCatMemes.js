import React from 'react'
import './FavoriteCatMemes.css'
import { Link } from 'react-router-dom'
import SingleFavoriteCatMeme from '../SingleFavoriteCatMeme/SingleFavoriteCatMeme'
// import PropTypes from 'prop-types'

const FavoriteCatMemes = (props)=> {
  console.log('favoriteCatMeme props', props);
  const favorites = props.favoriteCatMemes.map(meme=>{
    return (
      <SingleFavoriteCatMeme
        data={meme}
        id={meme.id}
        key={meme.id}
        deleteFavorite={props.deleteFavorite}
      />
    )
  })

return (
    <div className ="favorites-container">
    {favorites}
    </div>

  )



}

export default FavoriteCatMemes
