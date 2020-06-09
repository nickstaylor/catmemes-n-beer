import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import FavoriteDadJokes from "./FavoriteDadJokes";


describe("FavoriteDadJokes", ()=>{

  let favoriteDadJokes
  let router
  let mockDeleteFavorite
  let name

  beforeEach(()=> {
    favoriteDadJokes = [{id: 1591657715169,
                        punchline: "Squash.",
                        setup: "What was the pumpkin’s favorite sport?"},
                      {id: 1591659979959,
                       punchline: "But most just have 4.",
                      setup: "Did you know crocodiles could grow up to 15 feet?"}]

    name = "favoriteDadJokes"
    mockDeleteFavorite= jest.fn()

  router = <BrowserRouter>
    <FavoriteDadJokes
      deleteFavorite={mockDeleteFavorite}
      favoriteDadJokes={favoriteDadJokes}
      name={name}
    />
    </BrowserRouter>
  })

  it('should display and array of all Favorited Dad Jokes on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("What was the pumpkin’s favorite sport?")).toBeInTheDocument()
  expect(getByText("Squash.")).toBeInTheDocument()
  expect(getByText("Did you know crocodiles could grow up to 15 feet?")).toBeInTheDocument()
  expect(getByText("But most just have 4.")).toBeInTheDocument()
  })

  it('should show as many delete buttons as there are the favorited dad jokes', ()=>{

    const { getByText, getAllByText } = render(router)
    const button = getAllByText('Delete');
    expect(button).toHaveLength(2)

  })

  it('should show a message if there are no favorites and provide a link to the dad joke page', () => {

    favoriteDadJokes = []
    router = <BrowserRouter>
              <FavoriteDadJokes
              deleteFavorite={mockDeleteFavorite}
              favoriteDadJokes={favoriteDadJokes}
              name={name}
              />
            </BrowserRouter>

    const { getByText } = render(router)

    const message = getByText("No favorites yet! Check out some awesome")
    const link = getByText("Dad Jokes!")
    expect(link).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    fireEvent.click(link)
    expect(window.location.href).toBe("http://localhost/dadjokes");
  })

})
