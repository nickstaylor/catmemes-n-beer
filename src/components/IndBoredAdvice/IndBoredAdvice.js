import React from 'react'
import './IndBoredAdvice.css'
import PropTypes from 'prop-types'

const IndBoredAdvice = (props)=> {

return (
  <div className="favorites-box">
    <p>{props.activity}</p>
      <button
       id={props.id}
       className="topic-button"
       onClick={() => props.deleteFavorite(props.id, props.name)}>Delete</button>
    </div>
  )

}

IndBoredAdvice.propTypes = {
  activity: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  deleteFavorite: PropTypes.func
}

export default IndBoredAdvice
