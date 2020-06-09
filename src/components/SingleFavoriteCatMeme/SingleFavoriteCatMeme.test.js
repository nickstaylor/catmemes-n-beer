import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import SingleFavoriteCatMeme from "./SingleFavoriteCatMeme";



describe("SingleFavoriteCatMeme", () => {

  let favoriteCatMeme
  let router
  let mockDeleteFavorite
  let id
  let name

  beforeEach(()=> {
    favoriteCatMeme = {bottomText: "beer", id: 1591659294571,
      image: "https://cdn2.thecatapi.com/images/cpf.png", topText: "mmmm"}
    id = 1591659294571
    name = "favoriteCatMemes"
    mockDeleteFavorite= jest.fn()

  router = <BrowserRouter>
    <SingleFavoriteCatMeme
      deleteFavorite={mockDeleteFavorite}
      data={favoriteCatMeme}
      id={id}
      name={name}
    />
    </BrowserRouter>
  })

  it('should display the Individual Favorited Cat Meme on render', () => {

  const { getByText, getByRole } = render(router)

  expect(getByText("mmmm")).toBeInTheDocument()
  expect(getByText("beer")).toBeInTheDocument()
  expect(getByRole("img", {src:"https://cdn2.thecatapi.com/images/cpf.png"})).toBeInTheDocument()
  expect(getByText("Delete")).toBeInTheDocument();
  })

  it('should delete the favorited cat meme on click of delete button', () => {

    const { getByText } = render(router)
    const button = getByText('Delete');
    fireEvent.click(button)
    expect(mockDeleteFavorite).toHaveBeenCalled()

  })

})
