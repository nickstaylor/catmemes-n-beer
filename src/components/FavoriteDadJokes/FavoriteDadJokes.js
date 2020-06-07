import React from 'react'
import './FavoriteDadJokes.css'
import { Link } from 'react-router-dom'
import IndDadJoke from '../IndDadJoke/IndDadJoke'
// import PropTypes from 'prop-types'

const FavoriteDadJokes = (props)=> {
  console.log('dadjokes', props);
  const favorites = props.favoriteDadJokes.map(joke => {
    return (
      <IndDadJoke
        data={joke}
        id={joke.id}
        key={joke.id}
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

export default FavoriteDadJokes
