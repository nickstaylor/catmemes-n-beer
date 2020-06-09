import React, { Component } from 'react'
import './FavoriteBreweries.css'
import { Link } from 'react-router-dom'
import Brewery from '../Brewery/Brewery'
import PropTypes from 'prop-types'

class FavoriteBreweries extends Component{
  constructor(props){
    super(props)
    this.state = {
      favoriteBreweries: this.props.favoriteBreweries
    }
  }

  updateFavoriteState = (id) => {
      let updatedFavorites = this.state.favoriteBreweries.filter((brewery) => {
        return brewery.id !== id;
      });
      this.setState({ favoriteBreweries: [...updatedFavorites] });
      this.props.updatefavoriteBreweries(updatedFavorites);
    };

  render(){
    let favorites = this.props.favoriteBreweries.map(brewery=>{
      brewery.favorite = true
      return (
        <Brewery
        brewery={brewery}
        id={brewery.id}
        key={brewery.id}
        toggleFavoriteBrewery={this.props.toggleFavoriteBrewery}
        comingFromFavorites={true}
        updateFavoriteState={this.updateFavoriteState}
        />
      )
    })

    return (
      !this.state.favoriteBreweries.length ? <div>No favorites yet! Check out some <Link to="/breweries">Breweries!</Link></div> :
      <div className ="favorites-container">
        {favorites}
      </div>
    )
  }

}

FavoriteBreweries.propTypes = {
  toggleFavoriteBrewery: PropTypes.func,
  favoriteBreweries: PropTypes.array,
  updatefavoriteBreweries: PropTypes.func
}

export default FavoriteBreweries
