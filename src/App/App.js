import React, { Component } from 'react';
import './App.css';
import { catFacts, catImages, dadJoke, getCoordinates } from "../apiCalls.js"
import { Switch, Route, Redirect } from "react-router-dom";
import Login from '../Login/Login'
import Header from '../Header/Header'
import Landing from '../Landing/Landing'
import Footer from '../Footer/Footer'
import CatMemes from '../CatMemes/CatMemes'
import Bored from '../Bored/Bored'
import Favorites from '../Favorites/Favorites'
import BreweryContainer from '../BreweryContainer/BreweryContainer'
import BreweryDetails from '../BreweryDetails/BreweryDetails'
import DadJoke from '../DadJoke/DadJoke'
import dadJokeImg from '../images/DadJokes.jpg'
import boredKids from '../images/BoredKids.jpg'
import catMeme from '../images/catMeme.jpeg'
import breweryImg from '../images/Brewery.jpg'


class App extends Component {
  constructor() {
    super()
    this.state = {
      catFacts: [],
      favoriteCatMemes: [],
      randomFact: '',
      dadJoke: '',
      user: '',
      zipCode: '',
      favoriteBreweries: [],
      topics: [{name: 'Create a Cat Meme!', photo: catMeme, topic: 'catMemes'},
               {name: 'Cheesy Dad Jokes!', photo: dadJokeImg, topic: 'dadjokes'},
               {name: 'Bored Kids?', photo: boredKids, topic: 'bored'},
               {name: 'Find Me a Local Brewery, NOW!', photo: breweryImg, topic:'breweries' }]
    }
  }

  componentDidMount = async () => {
    //cat facts fetch
    const catFactsApi = await catFacts();
    console.log('catFactsApi', catFactsApi);
    let facts = catFactsApi.all.map(fact => {
      return {text: fact.text, upVotes: fact.upvotes, id: fact._id, voted: false}
    })
    let newFacts = facts.filter(fact => fact.id !== '5ece9fa9a0d2ec00178ae28e')

    //dad joke fetch
    let randomDadjoke = await dadJoke()
    console.log('randomDadjoke', randomDadjoke);

    this.setState({catFacts: newFacts,
                  randomFact: newFacts[0]})
    console.log('state', this.state);
  }

  addUser = (user) => {
    this.setState ({ user: user.user,
                        zipCode: user.zipCode})
    this.getCoordinatesFromZip(+user.zipCode)
  }

  favoriteCatMeme = (object) => {

  }

  getCoordinatesFromZip = async (zipCode) => {
    console.log(zipCode);
    //zipCode fetch
    let fetchedZipCode = await getCoordinates(zipCode)
    console.log('zipCodeFetch', fetchedZipCode);
  }

  removeUser = () => {
    this.setState({user: ''})
  }

  getNewFact = ()=> {
    let anotherRandomNumber = Math.floor(Math.random() * this.state.catFacts.length);
    let randomFact = this.state.catFacts[anotherRandomNumber]
    this.setState({
    randomFact: randomFact,
    })
  }

  randomFactVote = (id) => {
    let upVote = this.state.catFacts.find(fact=>fact.id === id)
    console.log(upVote);
    if (!this.state.randomFact.voted){
      upVote.upVotes++
      upVote.voted = true
    } else { upVote.upVotes--
             upVote.voted = false
           }
    this.setState({randomFact: upVote})
  }


  render(){
  return (
    <div className="App">
    {this.state.user &&
      <Header
      favoriteCatMemes={this.state.favoriteCatMemes.length}
       favoriteBreweries={this.state.favoriteBreweries.length}
       user={this.state.user}
       removeUser={this.removeUser}/>}
    <Switch>

    <Route path="/" exact render={()=> <Login addUser={this.addUser} />}
    />

    {this.state.user ?
    <Route path="/landing" exact render={()=>
      <Landing  topics={this.state.topics} />}
    /> :
    <Redirect to="/" />
    }

    <Route path="/catMemes" exact render={()=> <CatMemes favoriteCatMeme={this.favoriteCatMeme} />}
    />

    <Route path="/favorites" exact render={()=> <Favorites />}
    />

    <Route path="/breweries" exact render={()=> <BreweryContainer />}
    />

    <Route path="/breweries/:name" exact render={()=> <BreweryDetails />}
    />

    <Route path ="/bored" exact render={()=> <Bored />}
    />

    <Route path ="/dadjokes" exact render={()=> <DadJoke />}
    />

    </Switch>
    {this.state.user && <Footer getNewFact={this.getNewFact} randomFact={this.state.randomFact} randomFactVote={this.randomFactVote}/>}

    </div>
  );
  }
}

export default App;
