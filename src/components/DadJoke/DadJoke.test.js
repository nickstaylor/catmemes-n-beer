import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import DadJoke from "./DadJoke";
import { dadJoke } from '../../apiCalls.js'
jest.mock('../../apiCalls.js')
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver



describe("Dad Joke", ()=>{

  let router
  let mockFavoriteDadJoke
  let randomDadJoke

  beforeEach( async () => {

  mockFavoriteDadJoke= jest.fn()

  randomDadJoke = {id: 141, type: "general",
  setup: "How many hipsters does it take to change a lightbulb?",
  punchline: "Oh, it's a really obscure number. You've probably never heard of it."}

  await dadJoke.mockResolvedValueOnce(randomDadJoke)
  router = <MemoryRouter>
    <DadJoke
    favoriteDadJoke={mockFavoriteDadJoke}
    />
    </MemoryRouter>
  })

  // afterEach(cleanup)

  it('should display the Dad Joke page on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("Enjoy a Dad Joke! Tell Your Friends!")).toBeInTheDocument()
  expect(getByText("Answer")).toBeInTheDocument();
  })

  it('should favorite a dad joke if they like it!', ()=>{

    const { getByText } = render(router)
    const button = getByText('Answer');
    fireEvent.click(button)
    const favorite = getByText("Save Joke!")
    fireEvent.click(favorite)
    expect(mockFavoriteDadJoke).toHaveBeenCalled()

  })

  it('can view a random dad joke when the component loads', async () => {

    const { getByText, debug } = render(router)
    const joke = await waitFor(()=> getByText("How many hipsters does it take to change a lightbulb?"))
    debug()
    expect(joke).toBeInTheDocument()
  })

})
