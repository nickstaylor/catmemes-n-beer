import React, { Component } from 'react'
import './Favorites.css'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

const Favorites = (props)=> {
  let boredActivities = props.favoriteBoredActivity
  let dadJokes = props.favoriteDadJokes
  let catMemes = props.favoriteCatMemes
  let breweries = props.favoriteBreweries
  let sum = catMemes + breweries + dadJokes + boredActivities
  return (
    !sum ? <div>No Favorites yet!  Explore the site!</div> :
    <div className ="favorites-container">
      <div className="favorites-box">
        <p>My Cat Memes</p>
        <Link to='/favorites/catmemes'>
        <button className="topic-button">Saved Cat Memes ({catMemes})</button>
        </Link>
      </div>

      <div className="favorites-box">
        <p>My Dad Jokes</p>
        <Link to='/favorites/dadjokes'>
        <button className="topic-button">Saved Dad Jokes ({dadJokes})</button>
        </Link>
      </div>

      <div className="favorites-box">
        <p>My Bored Kids Advice</p>
        <Link to='/favorites/boredactivities'>
        <button className="topic-button">Saved Bored Advice({boredActivities})</button>
        </Link>
      </div>

      <div className="favorites-box">
        <p>My Breweries</p>
        <Link to='/favorites/breweries'>
        <button className="topic-button" onClick={props.loadFavoriteBreweries}>Saved Breweries ({breweries})</button>
        </Link>
      </div>
    </div>

  )



}

export default Favorites
