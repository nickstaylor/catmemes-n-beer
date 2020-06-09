import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import Favorites from "./Favorites";



describe("Favorites", () => {

  let boredActivities
  let dadJokes
  let catMemes
  let breweries
  let router
  let mockDeleteFavorite
  let mockLoadFavoriteBreweries

  beforeEach(()=> {
    boredActivities = 2
    dadJokes = 1
    catMemes = 3
    breweries = 4
    mockDeleteFavorite= jest.fn()
    mockLoadFavoriteBreweries = jest.fn()

  router = <BrowserRouter>
    <Favorites favoriteBoredActivity={boredActivities}
    favoriteDadJokes={dadJokes}
    favoriteCatMemes={catMemes}
    favoriteBreweries={breweries}
    deleteFavorite={mockDeleteFavorite}
    loadFavoriteBreweries={mockLoadFavoriteBreweries}
    />
    </BrowserRouter>
  })

  it('should display the favorites on render', () => {

  const { getByText, getAllByRole } = render(router)

  const buttons = getAllByRole('button');
  expect(buttons).toHaveLength(4)
  expect(getByText("Saved Cat Memes (3)")).toBeInTheDocument()
  expect(getByText("Saved Dad Jokes (1)")).toBeInTheDocument();
  })


  it('should take the user to specific favroites on click', () => {

    const { getByText } = render(router)
    const button = getByText('Saved Cat Memes (3)');
    fireEvent.click(button)
    expect(window.location.href).toBe("http://localhost/favorites/catmemes");

  })

  it('should show a message if there are no favorites and provide a link to the main page', () => {

    boredActivities = 0
    dadJokes = 0
    catMemes = 0
    breweries = 0
    router = <BrowserRouter>
              <Favorites favoriteBoredActivity={boredActivities}
                favoriteDadJokes={dadJokes}
                favoriteCatMemes={catMemes}
                favoriteBreweries={breweries}
                deleteFavorite={mockDeleteFavorite}
                loadFavoriteBreweries={mockLoadFavoriteBreweries}
              />
             </BrowserRouter>

    const { getByText } = render(router)

    const message = getByText("No Favorites yet!")
    const link = getByText("Explore the site!")
    expect(link).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    fireEvent.click(link)
    expect(window.location.href).toBe("http://localhost/landing");
  })

})
