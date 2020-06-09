import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Bored from "./Bored";
import { boredIdea } from '../../apiCalls.js'
jest.mock('../../apiCalls.js')
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver



describe("Bored", ()=>{

  let router
  let mockFavoriteBoredActivity
  let randomBoredIdea

  beforeEach( async () => {

  mockFavoriteBoredActivity= jest.fn()

  randomBoredIdea = "Take a hike at a local park"

  await boredIdea.mockResolvedValueOnce(randomBoredIdea)
  router = <MemoryRouter>
    <Bored
    favoriteBoredActivity={mockFavoriteBoredActivity}
    />
    </MemoryRouter>
  })

  // afterEach(cleanup)

  it('should display the Bored page on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("Bored Kids? Here's something to do!")).toBeInTheDocument()
  expect(getByText("I'm Done Here!")).toBeInTheDocument();
  })

  it('should favorite a bored idea if they like it!', ()=>{

    const { getByText } = render(router)
    const button = getByText('Save Activity');
    fireEvent.click(button)
    expect(mockFavoriteBoredActivity).toHaveBeenCalled()

  })

  it('can view a random bored idea when the component loads', async () => {

    const { getByText, debug } = render(router)
    const idea = await waitFor(()=> getByText("Take a hike at a local park"))
    debug()
    expect(idea).toBeInTheDocument()
  })

})
