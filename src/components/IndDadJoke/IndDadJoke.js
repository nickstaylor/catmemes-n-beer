import React from 'react'
import './IndDadJoke.css'
// import PropTypes from 'prop-types'

const IndDadJoke = (props)=> {
  console.log('IndDadJoke props', props)

return (
  <div className="favorites-box">
    <p>{props.data.setup}</p>
    <p>{props.data.punchline}</p>
      <button
       id={props.id}
       className="topic-button"
       onClick={() => props.deleteFavorite(props.id, props.name)}>Delete</button>
    </div>
  )



}

export default IndDadJoke
