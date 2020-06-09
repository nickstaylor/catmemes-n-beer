import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from './App';
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver
import { catFacts, getCoordinates, getBreweries, getBreweryPhotos, dadJoke, boredIdea, catImages } from "../../apiCalls.js"
jest.mock("../../apiCalls")


describe("App", () => {
  let randomDadJoke
  let sampleBoredIdea
  let sampleCatImages
  let sampleBreweryApiData
  let sampleZipCodeApiData

  beforeEach( async () => {
    sampleCatImages = [{breeds: [], height: 316, id: "bpb",
    url: "https://cdn2.thecatapi.com/images/bpb.jpg", width: 500}]
    await catImages.mockResolvedValueOnce(sampleCatImages)

    let sampleCatFactApiData = [{text: "It was illegal to slay cats in ancient Egypt, in large part because they provided the great service of controlling the rat population.",
    type: "cat", upvotes: 8, user: {_id: "58e007480aac31001185ecef"},userUpvoted: null, _id: "58e00af60aac31001185ed1d"},
    {text: "In the 1960s, the CIA tried to turn a cat into a bonafide spy by implanting a microphone into her ear and a radio transmitter at the base of her skull. She somehow survived the surgery but got hit by a taxi on her first mission.",
    type: "cat", upvotes: 7, user: {_id: "58e007480aac31001185ecef"}, userUpvoted: null, _id: "58e009650aac31001185ed13"},
    {text: "gato loves grace", type: "cat", upvotes: 7, user: {_id: "5a9ac18c7478810ea6c06381"},userUpvoted: null, _id: "5e236d6bdc76630015d4c51f"}]
    await catFacts.mockResolvedValueOnce(sampleCatFactApiData)

    sampleZipCodeApiData = [{formatted_address: "Denver, CO 80202, USA", geometry: {location: {lat: 39.7541032, lng: -105.0002242}, location_type: "APPROXIMATE"},
    place_id: "ChIJwTF6RcN4bIcRWd8aCrbRvX0", types: ["postal_code"]}]
    await getCoordinates.mockResolvedValueOnce(sampleZipCodeApiData)

    sampleBreweryApiData = [{
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
    await getBreweryPhotos.mockResolvedValueOnce(sampleGetBreweryPhoto)
    await getBreweries.mockResolvedValueOnce(sampleBreweryApiData)

    randomDadJoke = {id: 141, type: "general",
    setup: "How many hipsters does it take to change a lightbulb?",
    punchline: "Oh, it's a really obscure number. You've probably never heard of it."}
    await dadJoke.mockResolvedValueOnce(randomDadJoke)

    sampleBoredIdea = "Take a hike at a local park"
    await boredIdea.mockResolvedValueOnce(sampleBoredIdea)
    })



  it("should be able to log users in and out", async ()  => {

    const router = (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const { getByText, getByPlaceholderText, debug, getAllByRole, queryByText } = render(router);
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
    await waitFor(() => {expect(queryByText("A Little Getaway for Kitty-Loving Cheesy Beer Dads")).not.toBeInTheDocument()});

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

    //the following goes to the cheesy dad joke page and shows a fetched dad joke
    fireEvent.click(getByText("MEOW!"));
    const button = getByTestId('Cheesy Dad Jokes!');
    fireEvent.click(button)
    const dadPage = await waitFor(() => getByText('Enjoy a Dad Joke! Tell Your Friends!'))
    expect(dadPage).toBeInTheDocument();
    const dadJoke = getByText("How many hipsters does it take to change a lightbulb?")
    expect(dadJoke).toBeInTheDocument()
    expect(window.location.href).toBe("http://localhost/dadjokes");

  })


  it("User can view random cat facts in footer once fetch call loads", async () =>{

    const {getByText, getByPlaceholderText } = render(<BrowserRouter>
                                <App />
                                </BrowserRouter>)

    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "Khalid" },
    });
    fireEvent.change(getByPlaceholderText("80202"), {
      target: { value: "80202" },
    });
    //sign in. shows fetched cat fact at the bottom
    fireEvent.click(getByText("MEOW!"));
    const randomFact = await waitFor(()=> getByText("It was illegal to slay cats in ancient Egypt, in large part because they provided the great service of controlling the rat population."))
    expect(randomFact).toBeInTheDocument()

  })


  it("User can create a cat meme, save it, view it in favorites, then delete it from favorites", () =>{

    const {getByText, getByPlaceholderText, getByTestId, queryByText } = render(<BrowserRouter>
                                <App />
                                </BrowserRouter>)

    //starts path from signing in, to creating cat meme
    // to saving it, to viewing it again in favorites
    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "Khalid" },
    });
    fireEvent.change(getByPlaceholderText("80202"), {
      target: { value: "80202" },
    });
    fireEvent.click(getByText("MEOW!"));
    const button = getByTestId('Create a Cat Meme!');
    fireEvent.click(button)
    const memeHeader = getByText('Make your own Cat Meme!')
    expect(memeHeader).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText("Top Text"), {
      target: {value: "I love Turing."},
    })
    fireEvent.change(getByPlaceholderText("Bottom Text"),{
      target: {value: "Love it!"}
    })
    fireEvent.click(getByText('Meow'))
    const topOfMeme = getByText("I love Turing.")
    const bottomOfMeme = getByText("Love it!")
    expect(topOfMeme).toBeInTheDocument()
    expect(bottomOfMeme).toBeInTheDocument()
    fireEvent.click(getByText('Save Meme!'))
    expect(getByText("Favorites (1)")).toBeInTheDocument()
    fireEvent.click(getByText('favorites'))
    expect(getByText("Saved Cat Memes (1)")).toBeInTheDocument()
    fireEvent.click(getByText("Saved Cat Memes (1)"))
    expect(getByText("I love Turing.")).toBeInTheDocument();
    fireEvent.click(getByText("Delete"))
    expect(queryByText("I love Turing.")).not.toBeInTheDocument()
    expect(getByText("No favorites yet! Create some")).toBeInTheDocument()

  })

  it('User can view breweries, favorite one, then view and favorite a bored idea, then view both in favorites and delete them', async () => {

    const {getByText, getByPlaceholderText, getByTestId, queryByText, debug, getAllByText } = render(<MemoryRouter>
                                <App />
                                </MemoryRouter>)

    fireEvent.change(getByPlaceholderText("name"), {
      target: { value: "Robbie" },
    });
    fireEvent.change(getByPlaceholderText("80202"), {
      target: { value: "80202" },
    });
    fireEvent.click(getByText("MEOW!"));
    const button = getByTestId('Find Me a Local Brewery, NOW!');
    fireEvent.click(button)
    const breweryHeader = getByText('Breweries Near(ish) You!')
    expect(breweryHeader).toBeInTheDocument();
    const brewery = await waitFor(() => getByText("1634 18th St, Denver"))
    expect(brewery).toBeInTheDocument()
    fireEvent.click(getByTestId("87170c5a51a62f45f5361e357265b6089d8c4370"))
    expect(getByText("Favorites (1)")).toBeInTheDocument()
    fireEvent.click(getByText("Home"))
    fireEvent.click(getByTestId("Bored Kids?"))
    const boredIdea = await waitFor(()=> getByText("Take a hike at a local park"))
    expect(boredIdea).toBeInTheDocument()
    fireEvent.click(getByText("Save Activity"))
    expect(getByText("Favorites (2)")).toBeInTheDocument()
    fireEvent.click(getByText("favorites"))
    expect(getByText("Saved Breweries (1)")).toBeInTheDocument()
    expect(getByText("Saved Bored Advice(1)")).toBeInTheDocument()
    fireEvent.click(getByText("Saved Breweries (1)"))
    expect(getAllByText("Wynkoop Brewing Company")).toHaveLength(2);
    fireEvent.click(getByTestId("87170c5a51a62f45f5361e357265b6089d8c4370"))
    expect(getByText("Favorites (1)")).toBeInTheDocument()
    expect(queryByText("1634 18th St, Denver")).not.toBeInTheDocument()
    fireEvent.click(getByText("Favorites (1)"))
    expect(getByText("Saved Bored Advice(1)")).toBeInTheDocument()
    fireEvent.click(getByText("Saved Bored Advice(1)"))
    expect(getByText("Take a hike at a local park")).toBeInTheDocument()
    fireEvent.click(getByText("Delete"))
    expect(getByText("Bored Kids")).toBeInTheDocument()
    expect(getByText("Favorites (0)")).toBeInTheDocument()
    fireEvent.click(getByText("Favorites (0)"))
    expect(getByText("No Favorites yet!")).toBeInTheDocument()
    expect(getByText("Explore the site!")).toBeInTheDocument()

  })


})
