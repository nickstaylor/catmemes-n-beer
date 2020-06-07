import React, { Component } from 'react'
import './CatMemes.css'
import { Link } from 'react-router-dom'
import {catImages} from "../../apiCalls.js"

// import PropTypes from 'prop-types'

class CatMemes extends Component {
  constructor(){
    super()
    this.state = {
      loading: false,
      catImages: [],
      randomImage: 'https://cdn2.thecatapi.com/images/vh.jpg',
      topText: '',
      bottomText: '',
      newCatMeme: false,
      savedCatMeme: false,
      reset: false
    }
  }

  componentDidMount = async() => {
    this.setState({loading: true})
    const catImagesApi = await catImages()
    console.log('catImagesApi', catImagesApi);
    let images = catImagesApi.map(image => image.url)
    this.setState({ catImages: images,
                    loading: false})
    console.log('CatMemesState', this.state);
    }

    handleChange = (event)=>{
      const {name, value} = event.target
      this.setState({
          [name]: value
      })
    }

    createRandomMeme = (event)=>{
      event.preventDefault()
      let randomNumber = Math.floor(Math.random() * this.state.catImages.length);
      let randomImage = this.state.catImages[randomNumber]
      this.setState({
        randomImage: randomImage,
        newCatMeme: true,
        reset: true
      })
    }

    favoriteMeme = () =>{
      let favoriteObject = {image: this.state.randomImage,
                            topText: this.state.topText,
                            bottomText: this.state.bottomText,
                            id: Date.now()
                            }
      this.setState({savedCatMeme: true,
                    newCatMeme: false,
                    reset: true})
      this.props.favoriteCatMeme(favoriteObject)
    }
    resetInputs = () => {
      this.setState({savedCatMeme: false,
                      reset: false,
                      newCatMeme: false,
                      topText: '',
                      bottomText: ''})
    }


  render(){
    console.log('newCatMeme', this.state.newCatMeme)
    return (
      <div className="meme-container">
      <h2>Make your own Cat Meme!</h2>
      {this.state.newCatMeme &&
        <div className="meme-buttons">
          <button onClick={this.favoriteMeme}>Save Meme!</button>
          <button onClick={this.resetInputs}>New Meme</button>
        </div>}
      {this.state.savedCatMeme &&
      <div className="meme-buttons">
        <p>Saved! Click on <Link to="/favorites">favorites</Link> to view</p>
        <button onClick={this.resetInputs}>New Meme</button>
      </div>}
      <div className="meme">
      <img src={this.state.randomImage} alt="" />
      <h2 className="top">{this.state.topText}</h2>
      <h2 className="bottom">{this.state.bottomText}</h2>
      </div>
      {!this.state.reset &&
      <form className="meme-form" onSubmit={this.createRandomMeme}>
      <input
      type="text"
      placeholder="Top Text"
      value={this.state.topText}
      name="topText"
      onChange={this.handleChange}
      />

      <input
      type="text"
      placeholder="Bottom Text"
      value={this.state.bottomText}
      name="bottomText"
      onChange={this.handleChange}
      />
      <button>Meow</button>
      </form>
      }
      </div>
    )
  }
}


export default CatMemes
