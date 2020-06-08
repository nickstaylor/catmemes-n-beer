import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import Favorites from "./Favorites";



describe("Favorites", ()=>{

  let boredActivities
  let dadJokes
  let catMemes
  let breweries
  let router
  let mockdeleteFavorite
  let mockLoadFavoriteBreweries

  beforeEach(()=> {
    boredActivities = 2
    dadJokes = 1
    catMemes = 3
    breweries = 4
    mockdeleteFavorite= jest.fn()
    mockLoadFavoriteBreweries = jest.fn()

  router = <BrowserRouter>
    <Favorites favoriteBoredActivity={boredActivities}
    favoriteDadJokes={dadJokes}
    favoriteCatMemes={catMemes}
    favoriteBreweries={breweries}
    deleteFavorite={mockdeleteFavorite}
    loadFavoriteBreweries={mockLoadFavoriteBreweries}
    />
    </BrowserRouter>
  })

  it('should display the favorites on render', ()=>{

  const { getByText, getAllByRole } = render(router)

  const buttons = getAllByRole('button');
  expect(buttons).toHaveLength(4)
  expect(getByText("Saved Cat Memes (3)")).toBeInTheDocument()
  expect(getByText("Saved Dad Jokes (1)")).toBeInTheDocument();
  })


  it('should take the user to specific favroites on click', ()=>{

    const { getByText } = render(router)
    const button = getByText('Saved Cat Memes (3)');
    fireEvent.click(button)

    expect(window.location.href).toBe("http://localhost/favorites/catmemes");


  })

})
