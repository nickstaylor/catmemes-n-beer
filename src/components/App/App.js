import React, { Component } from 'react';
import './App.css';
import { catFacts, getCoordinates, getBreweries, getBreweryPhotos } from "../../apiCalls.js"
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
import dadJokeImg from '../../images/DadJokes.jpg'
import boredKids from '../../images/BoredKids.jpg'
import catMeme from '../../images/catMeme.jpeg'
import breweryImg from '../../images/Brewery.jpg'
import stockPhoto from '../../images/stockPhoto.jpg'


class App extends Component {
  constructor() {
    super()
    this.state = {
      catFacts: [],
      favoriteCatMemes: [],
      favoriteDadJokes: [],
      favoriteBreweries: [],
      favoriteBoredActivity: [],
      breweries: [],
      randomFact: '',
      user: '',
      zipCode: '',
      coordinates: {},
      zipCodeError: false,
      topics: [{name: 'Create a Cat Meme!', photo: catMeme, topic: 'catMemes'},
               {name: 'Cheesy Dad Jokes!', photo: dadJokeImg, topic: 'dadjokes'},
               {name: 'Bored Kids?', photo: boredKids, topic: 'bored'},
               {name: 'Find Me a Local Brewery, NOW!', photo: breweryImg, topic:'breweries' }]
    }
  }

  componentDidMount = async () => {
    //cat facts fetch
    const catFactsApi = await catFacts();
    let facts = catFactsApi.all.map(fact => {
      return {text: fact.text, upVotes: fact.upvotes, id: fact._id, voted: false}
    })
    let newFacts = facts.filter(fact => fact.id !== '5ece9fa9a0d2ec00178ae28e')
    this.setState({catFacts: newFacts,
                  randomFact: newFacts[0]})
  }

  addUser = (user) => {
    this.setState ({ user: user.user,
                     zipCode: user.zipCode})
    this.getCoordinatesFromZip(+user.zipCode)
  }


  favoriteCatMeme = (object) => {
      this.setState({favoriteCatMemes: [...this.state.favoriteCatMemes, object]})
  }

  favoriteDadJoke = (object) => {
      this.setState({favoriteDadJokes: [...this.state.favoriteDadJokes, object]})
  }

  favoriteBoredActivity = (activity) => {
    this.setState({favoriteBoredActivity: [...this.state.favoriteBoredActivity, activity]})
  }

  getCoordinatesFromZip = async (zipCode) => {
    console.log(zipCode);
    //zipCode fetch
    let fetchedZipCode = await getCoordinates(zipCode)
    if (fetchedZipCode.length){
      this.setState({coordinates: fetchedZipCode[0].geometry.location})
      // this.getSpots()
      } else {
        this.setState({zipCodeError: true})
      }
      this.getBrewerySpots()
      console.log('zipCodeFetch', fetchedZipCode);
    }

  getBrewerySpots = async () => {
    let breweries
    if(this.state.zipCodeError){
      console.log('here');
      let coordinates = {lat: "39.7541032", lng: "-105.0002242"}
      breweries = await getBreweries(coordinates)
    } else {
      console.log('no zip error');
      breweries = await getBreweries(this.state.coordinates)
    }
    console.log('breweries', breweries);
    let photo
    let breweryArray = []
    breweries.results.forEach(brewery => {
      if (brewery.photos === undefined){
         photo = stockPhoto
      } else {
          photo = getBreweryPhotos(brewery.photos[0].photo_reference)
      }
      breweryArray.push(
        {
          name: brewery.name,
          id: brewery.id,
          address: brewery.vicinity,
          rating: brewery.rating,
          photo: photo,
          coordinates: brewery.geometry.location,
          placeId: brewery.place_id,
          favorite: false,
          reviews: []
        }
      )
    })
    console.log(breweryArray);
    this.setState({breweries: breweryArray})
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
    console.log(this.state.zipCodeError)
  return (
    <div className="App">
    {this.state.user &&
      <Header
      favoriteBoredActivity={this.state.favoriteBoredActivity.length}
      favoriteDadJokes={this.state.favoriteDadJokes.length}
      favoriteCatMemes={this.state.favoriteCatMemes.length}
      favoriteBreweries={this.state.favoriteBreweries.length}
      user={this.state.user}
      removeUser={this.removeUser}
      />}
    <Switch>

    <Route path="/" exact render={() =>
      <Login addUser={this.addUser} />}
    />

    {this.state.user ?
    <Route path="/landing" exact render={() =>
      <Landing  topics={this.state.topics} />}
    /> :
    <Redirect to="/" />
    }

    <Route path="/catMemes" exact render={() =>
      <CatMemes favoriteCatMeme={this.favoriteCatMeme} />}
    />

    <Route path="/favorites" exact render={() => <Favorites />}
    />

    <Route path="/breweries" exact render={() =>
      <BreweryContainer
      breweries={this.state.breweries}
      zipCodeError={this.state.zipCodeError}
      zipCode={this.state.zipCode}
      toggleFavorite={this.toggleFavorite}
      />}
    />

    <Route path="/breweries/:name" exact render={() => <BreweryDetails />}
    />

    <Route path ="/bored" exact render={() =>
       <Bored favoriteBoredActivity={this.favoriteBoredActivity} />}
    />

    <Route path ="/dadjokes" exact render={() =>
      <DadJoke favoriteDadJoke={this.favoriteDadJoke} />}
    />

    </Switch>
    {this.state.user &&
      <Footer
      getNewFact={this.getNewFact}
      randomFact={this.state.randomFact}
      randomFactVote={this.randomFactVote}
      />}

    </div>
  )
  }
}

export default App;
