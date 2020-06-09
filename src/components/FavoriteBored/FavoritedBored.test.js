import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import FavoriteBored from "./FavoriteBored";

describe("FavoriteBored", ()=>{

  let favoriteBored
  let router
  let mockdeleteFavorite
  let name

  beforeEach(()=> {
    favoriteBored = [{activity: "Learn how to beatbox",id: 1591661095192},
                      {activity: "Contribute code or a monetary donation to an open-source software project",
                      id: 1591661098701},
                      {activity: "Have a jam session with your friends", id: 1591661097533},
                      {activity: "Conquer one of your fears", id: 1591661100157}]

    name = "favoriteBoredActivities"
    mockdeleteFavorite= jest.fn()

  router = <BrowserRouter>
    <FavoriteBored
      deleteFavorite={mockdeleteFavorite}
      favoriteBoredActivities={favoriteBored}
      name={name}
    />
    </BrowserRouter>
  })

  it('should display and array of all Favorited Bored Activities on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("Learn how to beatbox")).toBeInTheDocument()
  expect(getByText("Contribute code or a monetary donation to an open-source software project")).toBeInTheDocument()
  expect(getByText("Have a jam session with your friends")).toBeInTheDocument()
  expect(getByText("Conquer one of your fears")).toBeInTheDocument()
  })

  it('should show as many delete buttons as there are the favorited bored activities', ()=>{

    const { getByText, getAllByText } = render(router)
    const button = getAllByText('Delete');
    expect(button).toHaveLength(4)

  })

})
