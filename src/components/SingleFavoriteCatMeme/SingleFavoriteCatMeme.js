import React from 'react'
import './SingleFavoriteCatMeme.css'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

const SingleFavoriteCatMeme = (props)=> {
  console.log('SingleFavoriteCatMeme props', props)

return (
  <div className="meme-container-fav">
    <div className ="single-fav-cat-meme-container">
      <img src={props.data.image} alt="cat meme image" />
      <h2 className="top-fav">{props.data.topText}</h2>
      <h2 className="bottom-fav">{props.data.bottomText}</h2>
    </div>
      <button
       id={props.id}
       className="fav-meme-btn"
       onClick={() => props.deleteFavorite(props.id)}>Delete</button>

    </div>
  )



}

export default SingleFavoriteCatMeme
