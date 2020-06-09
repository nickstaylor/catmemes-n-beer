import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import PropTypes from "prop-types";

const Header = (props) => {

  let favorites = 0
  let boredActivities = props.favoriteBoredActivity
  let dadJokes = props.favoriteDadJokes
  let catMemes = props.favoriteCatMemes
  let breweries = props.favoriteBreweries
  let sum = favorites + catMemes + breweries + dadJokes + boredActivities

  return (
    <header>
    <div className="logo">
    <p>The Thirsty Cat Dad's Escape.</p>
    <p className="header-username"> Meow <span>{props.user}</span>!</p>
    </div>
      <nav className="nav-container">
        <NavLink to="/landing" className="nav">
          {" "}
           Home
          {" "}
        </NavLink>
        {
        <NavLink to="/favorites" className="nav" onClick={props.loadFavorites}>
          Favorites (
          {!sum
            ? "0"
            : `${sum}`}
          ){" "}
        </NavLink>
      }
        <NavLink to="/" exact className="nav" onClick={props.removeUser}>
          {" "}
          Sign Out{" "}
        </NavLink>
      </nav>
    </header>
  )
}


Header.propTypes = {
  removeUser: PropTypes.func,
  favoriteBoredActivity: PropTypes.number,
  favoriteDadJokes: PropTypes.number,
  favoriteCatMemes: PropTypes.number,
  favoriteBreweries: PropTypes.number,
  user: PropTypes.string,
  loadFavorites: PropTypes.func,
};
export default Header;
