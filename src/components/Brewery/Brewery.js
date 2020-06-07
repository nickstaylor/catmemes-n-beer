import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./Brewery.css";
import starOutline from "../../images/star-outline.svg";
import starFilled from "../../images/pinkStar.png";
import MdStar from 'react-ionicons/lib/MdStar'
import brewery from "../../images/Brewery.jpg"

class Brewery extends Component {
  constructor(props){
    super(props)
    this.state = {
    isFavorited: this.props.brewery.favorite,
    starFilled: starFilled,
    starOutline: starOutline,
    starImage: this.props.brewery.favorite ? "starFilled" : "starOutline",
    }
  }

  addDefaultSrc = (event) => {
    event.target.src = brewery
  }

  favoriteThisListing = (event) => {
  let id = event.target.id;

  let imageName;
  this.state.isFavorited
    ? (imageName = "starOutline")
    : (imageName = "starFilled");
  this.setState({
    isFavorited: !this.state.isFavorited,
    starImage: imageName,
  });
    let fromFavorites = false;
    if (this.props.comingFromFavorites) {
      fromFavorites = true;
    }
    this.props.toggleFavoriteBrewery(id);

    if (fromFavorites) {
      this.props.updateFavoriteState(id);
    }
};


  render(){
    const {
      rating,
      name,
      photo ,
      address,
      id
    } = this.props.brewery
    const stars = [...Array(Math.round(rating))].map(i => <MdStar/>)

  return (
    <section className="individual-brewery">
    <img
      id={id}
      src={this.state[this.state.starImage]}
      className="favorite-star"
      alt="favorite"
      tabIndex="0"
      role="button"
      onClick={this.favoriteThisListing}
    />
    <h3>{name}</h3>
    <img
      className="brewery-img"
      src={photo}
      onError={this.addDefaultSrc}
      alt="brewery"
    />
    <div className="lower-brewery-container">
      <Link
        className="open-spot"
        to={`/spotDetails/${name}`}
        onClick={() => this.props.displaySpotDetails(id)}
      >
        <p className="spot-title">{name}</p>
        <p className="spot-address">{address}</p>
        <div className="stars-container">
          { stars }
        </div>
      </Link>
      </div>
    </section>
  )
}
}

export default Brewery
