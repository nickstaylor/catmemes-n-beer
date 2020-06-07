import React from 'react'
import './Landing.css'
import {} from 'react-router-dom'
import Topic from '../Topic/Topic'
// import PropTypes from 'prop-types'

const Landing = (props)=>{
console.log(props);

let displayTopics = props.topics.map(topic=>{
  return <Topic  key={topic.name} topic={topic} />
})
  return (
    <div className="landing-container-locations ">
    {displayTopics}
    </div>
  )
}


export default Landing
