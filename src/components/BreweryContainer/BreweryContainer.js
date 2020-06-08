import React from 'react'
import './BreweryContainer.css'
import Brewery from '../Brewery/Brewery'
// import PropTypes from 'prop-types'

const BreweryContainer  = (props) => {
    let zipCode
    if (props.zipCodeError){
      zipCode = '80202'
    } else {
      zipCode = props.zipCode
    }
    console.log(props);
    const breweries = props.breweries.map(brewery => {
      props.favoriteBreweryIDs.forEach(id=>{
        if (brewery.id === id){
          brewery.favorite = true
        }
      })
      return <Brewery
        brewery={brewery}
        id={brewery.id}
        key={brewery.id}
        toggleFavoriteBrewery={props.toggleFavoriteBrewery}
      />
    })

    return (
        <div>
        <div className="title-container">
          <h1 className="location-title">Zip Code: {zipCode}</h1>
          <h1 className="title">Breweries Near(ish) You!</h1>
        </div>
        <section className="brewery-container">
          {breweries}
        </section>
        </div>
    )
  }

export default BreweryContainer
