import React from 'react'
import './IndDadJoke.css'
import PropTypes from 'prop-types'

const IndDadJoke = (props)=> {

return (
  <div className="favorites-box">
    <p>{props.data.setup}</p>
    <p>{props.data.punchline}</p>
      <button
       id={props.id}
       data-testid={props.id}
       className="topic-button"
       onClick={() => props.deleteFavorite(props.id, props.name)}>Delete</button>
    </div>
  )

}

IndDadJoke.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number,
  name: PropTypes.string,
  deleteFavorite: PropTypes.func
}

export default IndDadJoke
