import React from 'react'
import './FavoriteCatMemes.css'
import { Link } from 'react-router-dom'
import SingleFavoriteCatMeme from '../SingleFavoriteCatMeme/SingleFavoriteCatMeme'
import PropTypes from 'prop-types'

const FavoriteCatMemes = (props)=> {

  const favorites = props.favoriteCatMemes.map(meme=>{
    return (
      <SingleFavoriteCatMeme
        data={meme}
        id={meme.id}
        key={meme.id}
        name={props.name}
        deleteFavorite={props.deleteFavorite}
      />
    )
  })

return (
  !props.favoriteCatMemes.length ? <div>No favorites yet! Create some <Link to="/catmemes">Cat Memes!</Link></div> :
    <div className ="favorites-container">
    {favorites}
    </div>
  )

}

FavoriteCatMemes.propTypes = {
  name: PropTypes.string,
  favoriteCatMemes: PropTypes.array,
  deleteFavorite: PropTypes.func
}


export default FavoriteCatMemes
