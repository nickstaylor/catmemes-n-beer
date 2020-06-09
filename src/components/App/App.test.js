import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from './App';
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver
import { catFacts, getCoordinates, getBreweries, getBreweryPhotos, dadJoke } from "../../apiCalls.js"
jest.mock("../../apiCalls")


describe("App", () => {
  let randomDadJoke

  beforeEach( async () => {

    let sampleCatFactApiData = [{text: "It was illegal to slay cats in ancient Egypt, in large part because they provided the great service of controlling the rat population.",
    type: "cat", upvotes: 8, user: {_id: "58e007480aac31001185ecef"},userUpvoted: null, _id: "58e00af60aac31001185ed1d"},
    {text: "In the 1960s, the CIA tried to turn a cat into a bonafide spy by implanting a microphone into her ear and a radio transmitter at the base of her skull. She somehow survived the surgery but got hit by a taxi on her first mission.",
    type: "cat", upvotes: 7, user: {_id: "58e007480aac31001185ecef"}, userUpvoted: null, _id: "58e009650aac31001185ed13"},
    {text: "gato loves grace", type: "cat", upvotes: 7, user: {_id: "5a9ac18c7478810ea6c06381"},userUpvoted: null, _id: "5e236d6bdc76630015d4c51f"}]
    await catFacts.mockResolvedValueOnce(sampleCatFactApiData)

    let sampleZipCodeApiData = [{formatted_address: "Denver, CO 80202, USA", geometry: {location: {lat: 39.7541032, lng: -105.0002242}, location_type: "APPROXIMATE"},
    place_id: "ChIJwTF6RcN4bIcRWd8aCrbRvX0", types: ["postal_code"]}]
    getCoordinates.mockResolvedValueOnce(sampleZipCodeApiData)

    let sampleBreweryApiData = [{
      id: "87170c5a51a62f45f5361e357265b6089d8c4370",
      name: "Wynkoop Brewing Company",
      photos: [{height: 600,
      photo_reference: "CmRaAAAAdcUrdM-aC5Q6GA1O_AkefrnjEwU4sUF8ou7-JdM32DmMc6vKjStoGIeTVxzMWMBmA4hyuZbbhFE1r51tSEY2tbCEkxWMoZ3yeaTmu3Ka9pnfndNXDLOvn6dBl7jGF7GtEhDadgJ0Rbw1HdlBe5uNebWUGhQbzp0qxjBHILeQvlK9GQpwBik3zA",
      width: 900}],
      place_id: "ChIJBadAhB95bIcR1h_loSGkaR0",
      geometry:{location:{lat: 39.7397474,lng: -104.9454461}},
      rating: 4.2,
      reference: "ChIJBadAhB95bIcR1h_loSGkaR0",
      vicinity: "1634 18th St, Denver"
    }]

    let sampleGetBreweryPhoto = "https://lh3.googleusercontent.com/p/AF1QipNu4SE4z4WPcSewxeiG5Zr70WEFUlHj5rhx5pa3=s1600-w500"
    getBreweryPhotos.mockResolvedValueOnce(sampleGetBreweryPhoto)
    getBreweries.mockResolvedValueOnce(sampleBreweryApiData)

    randomDadJoke = {id: 141, type: "general",
    setup: "How many hipsters does it take to change a lightbulb?",
    punchline: "Oh, it's a really obscure number. You've probably never heard of it."}
    await dadJoke.mockResolvedValueOnce(randomDadJoke)
    })



  it("should be able to log users in and out", ()  => {
  const router = (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const { getByText, getByPlaceholderText, debug, getAllByRole } = render(router);
  fireEvent.change(getByPlaceholderText("name"), {
    target: { value: "Khalid" },
  });
  fireEvent.change(getByPlaceholderText("80202"), {
    target: { value: "80202" },
  });
  //sign in.
  fireEvent.click(getByText("MEOW!"));
  expect(getByText("The Thirsty Cat Dad's Escape.")).toBeInTheDocument();
  expect(getByText("Khalid")).toBeInTheDocument()
  // (need to set up a MUTATION OBSERVER for the below test)
  // await waitFor(()=> {expect(queryByText("A Little Getaway for Kitty-Loving Cheesy Beer Dads")).not.toBeInTheDocument()});

  const images = getAllByRole('img');
  const buttons = getAllByRole('button')
  expect(buttons).toHaveLength(6)
  expect(images).toHaveLength(5)

  //sign out
  fireEvent.click(getByText("Sign Out"));
  expect(getByText("A Little Getaway for Kitty-Loving Cheesy Beer Dads")).toBeInTheDocument();
  });

  it("should take user to a specific topic when button clicked", async () => {
    const topics = [{name: 'Create a Cat Meme!', topic: 'catMemes'},
    {name: 'Cheesy Dad Jokes!', topic: 'dadjokes'},
    {name: 'Bored Kids?', topic: 'bored'},
    {name: 'Find Me a Local Brewery, NOW!', topic:'breweries' }]
    const router = (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const { getByText, getAllByRole, getByTestId, getByPlaceholderText } = render(router)
    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "Khalid" },
    });
    fireEvent.change(getByPlaceholderText("80202"), {
      target: { value: "80202" },
    });
    //sign in.
    fireEvent.click(getByText("MEOW!"));
    const button = getByTestId('Cheesy Dad Jokes!');
    fireEvent.click(button)
    const dadPage = await waitFor(() => getByText('Enjoy a Dad Joke! Tell Your Friends!'))
    expect(dadPage).toBeInTheDocument();
    expect(window.location.href).toBe("http://localhost/dadjokes");
})


  it("can view random cat facts in footer once fetch call loads", async () =>{

    const {getByText, getByPlaceholderText } = render(<BrowserRouter>
                                <App />
                                </BrowserRouter>)

    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "Khalid" },
    });
    fireEvent.change(getByPlaceholderText("80202"), {
      target: { value: "80202" },
    });
    //sign in.
    fireEvent.click(getByText("MEOW!"));
    const randomFact = await waitFor(()=> getByText("It was illegal to slay cats in ancient Egypt, in large part because they provided the great service of controlling the rat population."))
    expect(randomFact).toBeInTheDocument()
  })

})
