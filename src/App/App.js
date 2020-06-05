import React, { Component } from 'react';
import './App.css';
import { catFacts, catImages, dadJoke } from "../apiCalls.js"
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../Login/Login'
import Nav from '../Nav/Nav'
import Landing from '../Landing/Landing'

class App extends Component {
  constructor() {
    super()
    this.state = {
      catFacts: [],
      catImages: [],
      randomImage: '',
      randomFact: '',
      dadJoke: {},
      user: '',
      zipCode: ''
    }
  }

  componentDidMount = async () => {
    const catFactsApi = await catFacts();
    console.log('catFactsApi', catFactsApi);
    let newFacts = catFactsApi.all.map(fact => fact.text)
    const catImagesApi = await catImages()
    console.log('catImagesApi', catImagesApi);
    let images = catImagesApi.map(image => image.url)
    let randomDadjoke = await dadJoke()
    console.log('randomDadjoke', randomDadjoke);

    this.setState({catFacts: newFacts,
                  catImages: images})
    let randomNumber = Math.floor(Math.random() * this.state.catImages.length);
    let anotherRandomNumber = Math.floor(Math.random() * this.state.catFacts.length);
    let randomFact = this.state.catFacts[anotherRandomNumber]
    let randomURL = this.state.catImages[randomNumber]
    this.setState({
                randomImage: randomURL,
                randomFact: randomFact,
              })
    console.log('state', this.state);
  }

  addUser = (user)=> {
    this.setState ({ user: user.user,
                        zipCode: user.zipCode})
  }
  removeUser = () => {
    this.setState({user: ''})
  }


  render(){
  return (
    <div className="App">
    {this.state.user && <Nav removeUser={this.removeUser}/>}
    <Switch>

    <Route path="/" exact render={()=> <Login addUser={this.addUser} />}
    />
    {this.state.user &&
    <Route path="/landing" exact render={()=>
      <Landing randomImage={this.state.randomImage} randomFact={this.state.randomFact} />}
    />
    }

    </Switch>


    </div>
  );
  }
}

export default App;
