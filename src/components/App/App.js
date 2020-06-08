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
import FavoriteCatMemes from '../FavoriteCatMemes/FavoriteCatMemes'
import FavoriteDadJokes from '../FavoriteDadJokes/FavoriteDadJokes'
import FavoriteBored from '../FavoriteBored/FavoriteBored'
import FavoriteBreweries from '../FavoriteBreweries/FavoriteBreweries'
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
      favoriteBreweryIDs: [],
      favoriteBoredActivities: [],
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
    console.log('catFactsApi', catFactsApi);
    let facts = catFactsApi.map(fact => {
      return {text: fact.text, upVotes: fact.upvotes, id: fact._id, voted: false}
    })
    let newFacts = facts.filter(fact => fact.id !== '5ece9fa9a0d2ec00178ae28e')
    this.setState({catFacts: newFacts,
                  randomFact: newFacts[0]})
  }

  getCoordinatesFromZip = async (zipCode) => {
    console.log(zipCode);
    //zipCode fetch
    let fetchedZipCode = await getCoordinates(zipCode)
    console.log('zipCodeAPI', fetchedZipCode);
    if (fetchedZipCode.length){
      this.setState({coordinates: fetchedZipCode[0].geometry.location})
    } else {
      this.setState({zipCodeError: true})
    }
    this.getBrewerySpots()
    console.log('zipCodeFetch', fetchedZipCode);
  }

  getBrewerySpots = async () => {
    let breweries
    if(this.state.zipCodeError){
      console.log('zip error');
      let coordinates = {lat: "39.7541032", lng: "-105.0002242"}
      breweries = await getBreweries(coordinates)
    } else {
      console.log('no zip error');
      breweries = await getBreweries(this.state.coordinates)
    }
      console.log('breweriesAPI', breweries);
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

  addUser = (user) => {
    this.setState ({ user: user.user,
                     zipCode: user.zipCode})
    this.getCoordinatesFromZip(+user.zipCode)
  }

  removeUser = () => {
    this.setState({user: '',
                  favoriteCatMemes: [],
                  favoriteDadJokes: [],
                  favoriteBreweries: [],
                  favoriteBoredActivities: []})
  }

  favoriteCatMeme = (object) => {
      this.setState({favoriteCatMemes: [...this.state.favoriteCatMemes, object]})
  }

  favoriteDadJoke = (object) => {
      this.setState({favoriteDadJokes: [...this.state.favoriteDadJokes, object]})
  }

  favoriteBoredActivity = (activity) => {
    this.setState({favoriteBoredActivities: [...this.state.favoriteBoredActivities, activity]})
  }

  deleteFavorite = (id, name) => {
    let filtered = this.state[name].filter(favorite=>{
      return favorite.id !== id
    })
    this.setState({[name]: filtered})
  }

  loadFavoriteBreweries = () => {
    let favorites = this.state.breweries.reduce((acc, brewery) => {
      this.state.favoriteBreweryIDs.forEach((id) => {
        if (brewery.id === id) {
          acc.push(brewery);
        }
      });
    return acc;
  }, []);
  this.setState({ favoriteBreweries: favorites });
  }

  updatefavoriteBreweries = (newFavorites) => {
    this.setState({favoriteBreweries: newFavorites})
  }

  toggleFavoriteBrewery = (id) => {
    if (!this.state.favoriteBreweryIDs.includes(id)){
      this.setState({favoriteBreweryIDs: [...this.state.favoriteBreweryIDs, id]})
    } else {
      let newFavorites = this.state.favoriteBreweryIDs.filter(favorite=>{
        return favorite !== id
      })
      this.setState({favoriteBreweryIDs: newFavorites})
    }
    this.loadFavoriteBreweries()
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
      loadFavorites={this.loadFavorites}
      favoriteBoredActivity={this.state.favoriteBoredActivities.length}
      favoriteDadJokes={this.state.favoriteDadJokes.length}
      favoriteCatMemes={this.state.favoriteCatMemes.length}
      favoriteBreweries={this.state.favoriteBreweryIDs.length}
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

    <Route path="/favorites" exact render={() =>
      <Favorites
      topics={this.state.topics}
      loadFavoriteBreweries={this.loadFavoriteBreweries}
      favoriteBoredActivity={this.state.favoriteBoredActivities.length}
      favoriteDadJokes={this.state.favoriteDadJokes.length}
      favoriteCatMemes={this.state.favoriteCatMemes.length}
      favoriteBreweries={this.state.favoriteBreweryIDs.length} />}
    />

    <Route path="/breweries" exact render={() =>
      <BreweryContainer
      favoriteBreweryIDs={this.state.favoriteBreweryIDs}
      breweries={this.state.breweries}
      zipCodeError={this.state.zipCodeError}
      zipCode={this.state.zipCode}
      toggleFavoriteBrewery={this.toggleFavoriteBrewery}
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

    <Route path ="/favorites/catmemes" exact render={() =>
      <FavoriteCatMemes
        name={'favoriteCatMemes'}
        favoriteCatMemes={this.state.favoriteCatMemes}
        deleteFavorite={this.deleteFavorite}/>}
    />

    <Route path ="/favorites/dadjokes" exact render={() =>
       <FavoriteDadJokes
        name={'favoriteDadJokes'}
        favoriteDadJokes={this.state.favoriteDadJokes}
        deleteFavorite={this.deleteFavorite}/>}
    />

    <Route path ="/favorites/boredactivities" exact render={() =>
       <FavoriteBored
       name={'favoriteBoredActivities'}
       favoriteBoredActivities={this.state.favoriteBoredActivities}
       deleteFavorite={this.deleteFavorite} />}
    />

    <Route path ="/favorites/breweries" exact render={() =>
       <FavoriteBreweries
       toggleFavoriteBrewery={this.toggleFavoriteBrewery}
       favoriteBreweries={this.state.favoriteBreweries}
       updatefavoriteBreweries={this.updatefavoriteBreweries}/>}
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
