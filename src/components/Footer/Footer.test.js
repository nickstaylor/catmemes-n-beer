import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from 'react-router-dom'
import Footer from "./Footer";


describe("Footer", ()=>{

  let randomFact
  let mockGetNewFact
  let mockRandomFactVote
  let router

  beforeEach(()=> {
  randomFact={id: "58e00af60aac31001185ed1d",
  text: "It was illegal to slay cats in ancient Egypt, in large part because they provided the great service of controlling the rat population.",
  upVotes: 8,voted: false}
  mockGetNewFact = jest.fn();
  mockRandomFactVote = jest.fn()

  router = <BrowserRouter>
    <Footer randomFact={randomFact}
    getNewFact={mockGetNewFact}
    randomFactVote={mockRandomFactVote}
    />
    </BrowserRouter>
  })

  it('should display the footer on render', ()=>{

  const { getByText } = render(router)

  expect(getByText("It was illegal to slay cats in ancient Egypt, in large part because they provided the great service of controlling the rat population.")).toBeInTheDocument()
  expect(getByText("New Fact!")).toBeInTheDocument();
  })

  it('should take a user vote on clicking the thumbs up', ()=>{

    const { getByAltText } = render(router)
    const button = getByAltText('thumbs up');
    fireEvent.click(button)
    expect(mockRandomFactVote).toHaveBeenCalled()

  })

  it('should get new random fact when new-fact button is clicked', ()=>{

    const { getByText } = render(router)
    const button = getByText('New Fact!');
    fireEvent.click(button)
    expect(mockGetNewFact).toHaveBeenCalled()

  })


})
