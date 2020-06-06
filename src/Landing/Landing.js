import React, { Component } from 'react'
import './Landing.css'
import {} from 'react-router-dom'
import PropTypes from 'prop-types'



class Landing extends Component {
constructor(props){
  super(props)
  this.state = {}
}


render(){
  return (
    <div>
    <h1>Cat Memes</h1>
    <img src={this.props.randomImage} alt="homepage cat" />
    <p>{this.props.randomFact}</p>
    </div>
  )
}


}

export default Landing
