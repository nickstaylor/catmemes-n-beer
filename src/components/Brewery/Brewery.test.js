import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom'
import Brewery from "./Brewery";


describe("Brewery", ()=>{

  let router
  let brewery
  let id
  let mockToggleFavoriteBrewery

  beforeEach( async () => {

  mockToggleFavoriteBrewery= jest.fn()

  brewery = {address: "7667 E Iliff Ave suite f, Denver",
  coordinates: {
  lat: 39.6757025,
  lng: -104.8984164},
  favorite: false,
  id: "b6de2bea0234198aef18cf07cdbc2a5117da6eaa",
  name: "Comrade Brewing Company",
  photo: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=CmRaAAAAET9fHYiKjZ4NHcxAt-uNkixcGHLdvirUo8gSvzXP_YK0kkjfN8BsmNL5FmTbUVB9qemhQKpY23czGNnL1WnzSq7LSMEFeo6Dog9-HYs3f7wyPGh9HThF-M3hHyj11xjcEhBJw8IE8fyEN7Tk5EX-MVk1GhQRGAlk2rFSS2voZ0JSTU8duK8Gpw&key=AIzaSyBNH06ev43XZwrk9WgMf4JdpvDpdr2sXv4",
  placeId: "ChIJnVnWEYR9bIcRioFnEUpyw4M",
  rating: 4.7,
  reviews: []}

  id = "b6de2bea0234198aef18cf07cdbc2a5117da6eaa"

  router = <MemoryRouter>
    <Brewery
    brewery={brewery}
    id={id}
    toggleFavoriteBrewery={mockToggleFavoriteBrewery}
    />
    </MemoryRouter>
  })


  it('should display brewery details render', () => {

    const { getByText, getAllByText, getByRole } = render(router)

    expect(getAllByText("Comrade Brewing Company")).toHaveLength(2)
    expect(getByText("7667 E Iliff Ave suite f, Denver")).toBeInTheDocument()
    expect(getByRole('img', {src: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=CmRaAAAAET9fHYiKjZ4NHcxAt-uNkixcGHLdvirUo8gSvzXP_YK0kkjfN8BsmNL5FmTbUVB9qemhQKpY23czGNnL1WnzSq7LSMEFeo6Dog9-HYs3f7wyPGh9HThF-M3hHyj11xjcEhBJw8IE8fyEN7Tk5EX-MVk1GhQRGAlk2rFSS2voZ0JSTU8duK8Gpw&key=AIzaSyBNH06ev43XZwrk9WgMf4JdpvDpdr2sXv4"} )).toBeInTheDocument()

  })

  it('should fire the favorites function on click of the star and change star colors', ()=>{

    const { getByAltText } = render(router)

    const star = getByAltText('favorite');
    fireEvent.click(star);
    expect(getByAltText("favorite", { src: "pinkStar.png" }));
    expect(mockToggleFavoriteBrewery).toHaveBeenCalled();

    fireEvent.click(getByAltText("favorite"));
    expect(getByAltText("favorite", { src: "star-outline.svg" }));
    expect(mockToggleFavoriteBrewery).toHaveBeenCalled();

  })


})
