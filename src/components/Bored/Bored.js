import React, { Component } from 'react'
import './Bored.css'
import {Link } from 'react-router-dom'
import { boredIdea } from "../../apiCalls.js"
import PropTypes from 'prop-types'



class Bored extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      activity: '',
      getNewActivity: false,
      activitySaved: false
    }
}

componentDidMount = () =>{
  this.getBoredIdea()
}

getBoredIdea = async () => {
  this.setState({loading: true})
  let randomIdea = await boredIdea()
  this.setState({activity: randomIdea,
                activitySaved: false,
                loading: false})
}

saveActivity = () => {
  const activity = {activity: this.state.activity,
                    id: Date.now()}
  this.setState({activitySaved: true})
  this.props.favoriteBoredActivity(activity)
}


render(){
  return (
    <div className="bored-container-background">
    <h1 className="bored-header">Bored Kids? Here's something to do!</h1>
    {this.state.activitySaved &&
      <div className="bored-saved-background">
        <h2 className="bored-header">
        Activity Saved! Click on <Link to="/favorites">favorites</Link> to view</h2>
      </div>
    }
      <div className="bored-container">
      {this.state.loading ? <p>Bored Activity Loading!</p> :
      <p>{this.state.activity}</p>}
      <div className="bored-buttons">
        <div>
        <button onClick={this.getBoredIdea}>New Activity</button>
        {!this.state.activitySaved &&
        <button onClick={this.saveActivity}>Save Activity</button>
        }
        <Link to="/landing">
        <button>I'm Done Here!</button>
        </Link>
        </div>

      </div>
     </div>
    </div>
  )
}

}


Bored.propTypes = {
favoriteBoredActivity: PropTypes.func
}


export default Bored
