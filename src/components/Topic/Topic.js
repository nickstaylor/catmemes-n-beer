import React  from 'react'
import './Topic.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const Topic = (props) => {

  const { topic } = props
  
  return (
    <div className="area-box">
      <img className="area-image" src={topic.photo} alt={topic.name} />
      <p>{topic.name}</p>
      <Link to={`/${topic.topic}`}>
      <button data-testid={topic.name} className="topic-button">Go!</button>
      </Link>
    </div>
  )

}

Topic.propTypes = {
topic: PropTypes.object
}
export default Topic
