import React from "react";
import "./Footer.css";
import PropTypes from "prop-types";
import thumbsUp from "../images/thumbUp.png"
import randomCatFact from "../images/randomCatFact.png"

const Footer = (props) => {
    const {randomFact} = props
    console.log(randomFact);
  return (
    <footer className="footer-container">
    <img
    className="random-cat-fat-footer-image"
    src={randomCatFact}
    alt="random cat facts"
    />
    <p>{randomFact.text}</p>
    <div className="footer-votes">
    <img
        id={randomFact.id}
        src={thumbsUp}
        className="thumbs-up"
        alt="thumbs up"
        role="button"
        onClick={()=> props.randomFactVote(randomFact.id)}
      />
      <p className="votes">{randomFact.upVotes}</p>
      <button onClick={()=>props.getNewFact()} className="cat-facts-button">New Fact!</button>
      </div>
    </footer>
  )
}


Footer.propTypes = {
  randomFactVote: PropTypes.func,
  randomFact: PropTypes.object,
};

export default Footer;
