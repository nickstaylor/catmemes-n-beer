import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import FavoriteCatMemes from "./FavoriteCatMemes";



describe("FavoriteBored", ()=>{

  let favoriteCatMemes
  let router
  let mockdeleteFavorite
  let name

  beforeEach(()=> {
    favoriteCatMemes = [{bottomText: "beer",
                        id: 1591659294571,
                        image: "https://cdn2.thecatapi.com/images/cpf.png",
                        topText: "mmmm"},{bottomText: "I sleep",
                        id: 1591661598936,
                        image: "https://cdn2.thecatapi.com/images/4sk.jpg",
                        topText: "today"},{bottomText: "an incredible athlete",
                        id: 1591661616730,
                        image: "https://cdn2.thecatapi.com/images/398.jpg",
                        topText: "I am "}]
    name = "favoriteCatMemes"
    mockdeleteFavorite= jest.fn()

  router = <BrowserRouter>
    <FavoriteCatMemes
      deleteFavorite={mockdeleteFavorite}
      favoriteCatMemes={favoriteCatMemes}
      name={name}
    />
    </BrowserRouter>
  })

  it('should display and array of all Favorited Cat Memes on render', ()=>{

  const { getByText, getAllByRole } = render(router)

  expect(getByText("beer")).toBeInTheDocument()
  expect(getAllByRole('img')).toHaveLength(3)
  expect(getByText("I sleep")).toBeInTheDocument()
  expect(getByText("an incredible athlete")).toBeInTheDocument()

  })

  it('should show as many delete buttons as there are the favorited cat memes', ()=>{

    const { getAllByText } = render(router)
    const button = getAllByText('Delete');
    expect(button).toHaveLength(3)

  })

})
