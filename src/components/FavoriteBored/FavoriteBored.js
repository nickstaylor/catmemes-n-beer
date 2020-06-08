import React from 'react'
import './FavoriteBored.css'
import { Link } from 'react-router-dom'
import IndBoredAdvice from '../IndBoredAdvice/IndBoredAdvice'
// import PropTypes from 'prop-types'

const FavoriteBored = (props)=> {
  console.log('boredadvice', props);
  const favorites = props.favoriteBoredActivities.map(activity=> {
    return (
      <IndBoredAdvice
        activity={activity.activity}
        id={activity.id}
        key={activity.id}
        name={props.name}
        deleteFavorite={props.deleteFavorite}
      />
    )
  })
return (
  !props.favoriteBoredActivities.length ? <div>No favorites yet! Check out some <Link to="/bored">Bored Kids</Link> ideas!</div> :
    <div className ="favorites-container">
    {favorites}
    </div>

  )

}

export default FavoriteBored
