import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import Topic from "./Topic";

describe("Topic", ()=>{

  it('should display a given topic on render', ()=>{
  const topic = {name: 'Create a Cat Meme!', topic: 'catmemes'}
  const router = (<BrowserRouter>
                <Topic topic={topic} />
                </BrowserRouter>)

  const { getByText, getAllByRole, getByTestId, debug } = render(router)
  expect(getByText("Create a Cat Meme!")).toBeInTheDocument()
  expect(getByText("Go!")).toBeInTheDocument();
  })

  it('should take user to proper link upon clicking Go! button', ()=>{
    const topic = {name: 'Create a Cat Meme!', topic: 'catmemes'}
    const router = (<BrowserRouter>
                  <Topic topic={topic} />
                  </BrowserRouter>)

    const { getByText, getAllByRole, getByTestId, debug } = render(router)
    const button = getByText('Go!');
    fireEvent.click(button)
    expect(window.location.href).toBe("http://localhost/catmemes");

  })

})
