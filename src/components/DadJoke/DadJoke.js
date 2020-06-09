import React, { Component } from 'react'
import './DadJoke.css'
import { Link } from 'react-router-dom'
import { dadJoke } from "../../apiCalls.js"
import PropTypes from 'prop-types'


class DadJoke extends Component {
constructor(props){
  super(props)
  this.state = {
    loading: false,
    setup: '',
    punchline: '',
    getAnswer: false,
    jokeSaved: false
  }
}

componentDidMount = () =>{
  this.getNewJoke()
}

getNewJoke = async () => {
  this.setState({loading: true})
  let randomDadjoke = await dadJoke()
  console.log('randomDadjokeAPI', randomDadjoke);
  this.setState({setup: randomDadjoke.setup,
                punchline: randomDadjoke.punchline,
                getAnswer: false,
                jokeSaved: false,
                loading: false})
}

getAnswer = () => {
  this.setState({getAnswer: true})
}

saveJoke = () => {
  const joke = {setup: this.state.setup,
                punchline: this.state.punchline,
                id: Date.now()}
  this.setState({jokeSaved: true})
  this.props.favoriteDadJoke(joke)
}


render(){
  return (
    <div className="dad-joke-container-background">
    <h1 className="joke-header">Enjoy a Dad Joke! Tell Your Friends!</h1>
    {this.state.jokeSaved &&
      <div className="joke-saved-background">
        <h2 className="joke-header">Joke Saved! Click on <Link to="/favorites">favorites</Link> to view</h2>
      </div>
    }
      <div className="dad-joke-container">
      {this.state.loading ? <p>Dad Joke Loading!</p> :
      <p>{this.state.setup}</p>}
      {this.state.getAnswer &&
      <p>{this.state.punchline}</p>
      }
      <div className="dad-joke-buttons">
        {!this.state.getAnswer &&
        <button onClick={this.getAnswer}>Answer</button>
        }
        {this.state.getAnswer &&
        <div>
        <button onClick={this.getNewJoke}>New Joke!</button>
        {!this.state.jokeSaved &&
        <button onClick={this.saveJoke}>Save Joke!</button>
        }
        <Link to="/landing">
        <button>No More Jokes</button>
        </Link>
        </div>
        }
      </div>
     </div>
    </div>
  )
}

}

DadJoke.propTypes = {
favoriteDadJoke: PropTypes.func
}

export default DadJoke
