import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom'
import BreweryContainer from "./BreweryContainer";


describe("BreweryContainer", ()=>{

  let router
  let breweries
  let favoriteBreweryIDs
  let zipCodeError
  let zipCode
  let mockToggleFavoriteBrewery

  beforeEach( async () => {

  mockToggleFavoriteBrewery= jest.fn()

  breweries = [{address: "1634 18th St, Denver",
  coordinates: {lat: 39.753454,lng: -104.998467},
  favorite: false,
  id: "87170c5a51a62f45f5361e357265b6089d8c4370",
  name: "Wynkoop Brewing Company",
  photo: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=CmRaAAAAlmzIvcyNSAMq4uu_SqCHRsJIW2R8Mg0l7ihu7GHSUSBfMekEJHPSCKd_Q6yHb0wjyyV8MbTJ4u26AMe5j-UvmlpSxLgRC6p9yMjE46ZRujWLiL_fMGDldrzk1MoViTBeEhByiSIwI5U4qsq4QrJa25rYGhRFhIOcjv1tLutyczhuPWn0SdSwPw&key=AIzaSyBNH06ev43XZwrk9WgMf4JdpvDpdr2sXv4",
  placeId: "ChIJBadAhB95bIcR1h_loSGkaR0",
  rating: 4.2,
  reviews: []},
  {address: "7667 E Iliff Ave suite f, Denver",
  coordinates: {
  lat: 39.6757025,
  lng: -104.8984164},
  favorite: false,
  id: "b6de2bea0234198aef18cf07cdbc2a5117da6eaa",
  name: "Comrade Brewing Company",
  photo: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=CmRaAAAAET9fHYiKjZ4NHcxAt-uNkixcGHLdvirUo8gSvzXP_YK0kkjfN8BsmNL5FmTbUVB9qemhQKpY23czGNnL1WnzSq7LSMEFeo6Dog9-HYs3f7wyPGh9HThF-M3hHyj11xjcEhBJw8IE8fyEN7Tk5EX-MVk1GhQRGAlk2rFSS2voZ0JSTU8duK8Gpw&key=AIzaSyBNH06ev43XZwrk9WgMf4JdpvDpdr2sXv4",
  placeId: "ChIJnVnWEYR9bIcRioFnEUpyw4M",
  rating: 4.7,
  reviews: []}]
  zipCodeError = false;
  zipCode = 80202;
  favoriteBreweryIDs = ["87170c5a51a62f45f5361e357265b6089d8c4370"]


  router = <MemoryRouter>
    <BreweryContainer
    breweries={breweries}
    zipCode={zipCode}
    zipCodeError={zipCodeError}
    favoriteBreweryIDs={favoriteBreweryIDs}
    toggleFavoriteBrewery={mockToggleFavoriteBrewery}
    />
    </MemoryRouter>
  })

  // afterEach(cleanup)

  it('should display each brewery on render', () => {

  const { getByText, getAllByRole, getAllByText } = render(router)

  expect(getAllByText("Comrade Brewing Company")).toHaveLength(2)
  expect(getByText("7667 E Iliff Ave suite f, Denver")).toBeInTheDocument()
  expect(getByText("1634 18th St, Denver")).toBeInTheDocument()
  expect(getAllByRole('img')).toHaveLength(2)
  expect(getAllByText("Wynkoop Brewing Company")).toHaveLength(2)

  })

  it('should show as many favorite stars as breweries rendered', ()=>{

    const { getAllByAltText } = render(router)
    const stars = getAllByAltText('favorite');
    expect(stars).toHaveLength(2)

  })


})
