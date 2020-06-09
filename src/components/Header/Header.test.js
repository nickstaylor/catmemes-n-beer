import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import Header from "./Header";

describe("Header", ()=>{

  let boredActivities
  let dadJokes
  let catMemes
  let breweries
  let router
  let mockRemoveUser

  beforeEach(()=> {
    boredActivities = 2
    dadJokes = 1
    catMemes = 3
    breweries = 4
    mockRemoveUser= jest.fn()

  router = <BrowserRouter>
    <Header favoriteBoredActivity={boredActivities}
    favoriteDadJokes={dadJokes}
    favoriteCatMemes={catMemes}
    favoriteBreweries={breweries}
    removeUser={mockRemoveUser}
    />
    </BrowserRouter>
  })

  it('should display the header on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("The Thirsty Cat Dad's Escape.")).toBeInTheDocument()
  expect(getByText("Favorites (10)")).toBeInTheDocument();
  })

  it('should remove the user upon signing out', ()=>{

    const { getByText } = render(router)
    const button = getByText('Sign Out');
    fireEvent.click(button)
    expect(mockRemoveUser).toHaveBeenCalled()

  })

})
