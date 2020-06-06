import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
// import PropTypes from "prop-types";

const Header = (props) => {
  const favorites = props.favoritesCatMemes + props.favoriteBreweries
  console.log(props);
  return (
    <header>
    <h2 className="logo">The Thirsty Cat Dad's Escape. Meow <span>{props.user}</span>!</h2>
      <nav className="nav-container">
        <NavLink to="/landing" className="nav">
          {" "}
           Home
          {" "}
        </NavLink>
        {
        <NavLink to="/favorites" className="nav" onClick={props.loadFavorites}>
          Favorites (
          {!favorites
            ? "0"
            : `${favorites}`}
          ){" "}
        </NavLink>
      }
        <NavLink to="/" exact className="nav" onClick={props.removeUser}>
          {" "}
          Sign Out{" "}
        </NavLink>
      </nav>
    </header>
  );
};

// Nav.propTypes = {
//   removeUser: PropTypes.func,
//   numberofFavorites: PropTypes.array,
//   loadFavorites: PropTypes.func,
// };
export default Header;
