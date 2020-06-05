import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import PropTypes from "prop-types";

const Nav = (props) => {
  return (
    <header>
      <nav className="nav-container">
        <NavLink to="/areas" className="nav">
          {" "}
          Favorites{" "}
        </NavLink>
        {
        // <NavLink to="/favorites" className="nav" onClick={props.loadFavorites}>
        //   Favorites (
        //   {!props.numberofFavorites.length
        //     ? "0"
        //     : `${props.numberofFavorites.length}`}
        //   ){" "}
        // </NavLink>
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
export default Nav;
