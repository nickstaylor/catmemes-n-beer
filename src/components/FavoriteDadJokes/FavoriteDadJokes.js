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
        name={props.name}
        deleteFavorite={props.deleteFavorite}
      />
    )
  })
return (
  !props.favoriteDadJokes.length ? <div>No favorites yet! Check out some awesome <Link to="/dadjokes">Dad Jokes!</Link></div> :
    <div className ="favorites-container">
    {favorites}
    </div>

  )



}

export default FavoriteDadJokes
