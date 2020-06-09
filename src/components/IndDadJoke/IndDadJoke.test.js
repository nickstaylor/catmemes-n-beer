import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import IndDadJoke from "./IndDadJoke";


describe("Individual Dad Joke", ()=>{

  let favoriteDadJoke
  let router
  let mockDeleteFavorite
  let id
  let name

  beforeEach(()=> {
    favoriteDadJoke = {id: 1591657715169,
                      punchline: "Squash.",
                      setup: "What was the pumpkin’s favorite sport?"}
    id = 1591657715169
    name = "favoriteDadJokes"
    mockDeleteFavorite= jest.fn()

  router = <BrowserRouter>
    <IndDadJoke
      deleteFavorite={mockDeleteFavorite}
      data={favoriteDadJoke}
      id={id}
      name={name}
    />
    </BrowserRouter>
  })

  it('should display the Individual Favorited Dad joke on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("What was the pumpkin’s favorite sport?")).toBeInTheDocument()
  expect(getByText("Squash.")).toBeInTheDocument()
  expect(getByText("Delete")).toBeInTheDocument();
  })

  it('should delete the favorited dad joke on click of delete button', ()=>{

    const { getByText, queryByTestId } = render(router)
    const button = getByText('Delete');
    fireEvent.click(button)
    expect(mockDeleteFavorite).toHaveBeenCalled()

  })

})
