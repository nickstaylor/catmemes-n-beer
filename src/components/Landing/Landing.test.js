import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Landing from "./Landing";
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver



describe("Landing", () => {
  it("should render 4 topics on the page", () => {

    const topics = [{name: 'Create a Cat Meme!', topic: 'catmemes'},
    {name: 'Cheesy Dad Jokes!', topic: 'dadjokes'},
    {name: 'Bored Kids?', topic: 'bored'},
    {name: 'Find Me a Local Brewery, NOW!', topic:'breweries' }]
    const router = (<BrowserRouter>
                    <Landing topics={topics} />
                    </BrowserRouter>)

    const { getByText, getAllByRole, debug } = render(router)

    const images = getAllByRole('img');
    expect(images).toHaveLength(4)
    expect(getByText('Bored Kids?')).toBeInTheDocument()
  })

  it("should take user to specific topic when button clicked", async () => {
    const topics = [{name: 'Create a Cat Meme!', topic: 'catMemes'},
    {name: 'Cheesy Dad Jokes!', topic: 'dadjokes'},
    {name: 'Bored Kids?', topic: 'bored'},
    {name: 'Find Me a Local Brewery, NOW!', topic:'breweries' }]
    const router = (<BrowserRouter>
                    <Landing topics={topics} />
                    </BrowserRouter>)

    const { getByText, getAllByRole, getByTestId } = render(router)

    const button = getByTestId('Cheesy Dad Jokes!');
    fireEvent.click(button)
    expect(window.location.href).toBe("http://localhost/dadjokes");
  })
})
