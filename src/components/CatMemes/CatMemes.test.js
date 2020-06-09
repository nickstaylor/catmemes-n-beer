import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom'
import CatMemes from "./CatMemes";
import { catImages } from '../../apiCalls.js'
jest.mock('../../apiCalls.js')
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver


describe("Cat Memes", ()=>{

  let router
  let mockFavoriteCatMeme
  let catImagesApi

  beforeEach( async () => {

  mockFavoriteCatMeme= jest.fn()

  catImagesApi = [{breeds: [], height: 316, id: "bpb",
  url: "https://cdn2.thecatapi.com/images/bpb.jpg", width: 500}]

  await catImages.mockResolvedValueOnce(catImagesApi)
  router = <MemoryRouter>
    <CatMemes
    favoriteCatMeme={mockFavoriteCatMeme}
    />
    </MemoryRouter>
  })


  it('should display the Cat Meme page on render', () => {

  const { getByText, getByPlaceholderText } = render(router)

  expect(getByText("Make your own Cat Meme!")).toBeInTheDocument()
  expect(getByPlaceholderText("Top Text")).toBeInTheDocument()
  expect(getByPlaceholderText("Bottom Text")).toBeInTheDocument()
  expect(getByText("Meow")).toBeInTheDocument();
  })

  it('should favorite a cat meme if they like it!', ()=>{

    const { getByText } = render(router)
    const button = getByText('Meow');
    fireEvent.click(button)
    const favorite = getByText("Save Meme!")
    fireEvent.click(favorite)
    expect(mockFavoriteCatMeme).toHaveBeenCalled()

  })

  it('can view a fetched cat image when the meow button is clicked', async () => {

    const { getByText, getByRole } = render(router)
    const originalImage = getByRole('img', {src: 'https://cdn2.thecatapi.com/images/vh.jpg'})
    expect(originalImage).toBeInTheDocument()
    fireEvent.click(getByText("Meow"))
    const catMeme = await waitFor(()=> getByRole('img', {src:"https://cdn2.thecatapi.com/images/bpb.jpg"}))
    expect(catMeme).toBeInTheDocument()
    
  })

})
