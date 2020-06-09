import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import IndBoredAdvice from "./IndBoredAdvice";


describe("Individual Bored Activity", ()=>{

  let favoriteBoredActivity
  let router
  let mockDeleteFavorite
  let id
  let name

  beforeEach(()=> {
    favoriteBoredActivity = "Make homemade ice cream"
    id = 1591658643472
    name = "favoriteBoredActivities"
    mockDeleteFavorite= jest.fn()

  router = <BrowserRouter>
    <IndBoredAdvice
      deleteFavorite={mockDeleteFavorite}
      activity={favoriteBoredActivity}
      id={id}
      name={name}
    />
    </BrowserRouter>
  })

  it('should display the Individual Favorited Bored Advice Idea on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("Make homemade ice cream")).toBeInTheDocument()
  expect(getByText("Delete")).toBeInTheDocument();
  })

  it('should delete the favorited advice on click of delete button', ()=>{

    const { getByText } = render(router)
    const button = getByText('Delete');
    fireEvent.click(button)
    expect(mockDeleteFavorite).toHaveBeenCalled()

  })

})
