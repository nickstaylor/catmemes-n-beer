import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Login from "./Login";


describe("Login", () => {
  it("should render a login form", () => {
    const router = (
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const { getByText, getByPlaceholderText } = render(router);
    expect(getByText("(Zip Code? For Beer! You'll See)")).toBeInTheDocument()
    expect(getByText("MEOW!")).toBeInTheDocument();

  });

  it("should display an error message if inputs are not completed", () => {

    const mockAddUser = jest.fn();
    const router = (
    <BrowserRouter>
      <Login addUser={mockAddUser} />
    </BrowserRouter>
    );

    const { getByText } = render(router)
    fireEvent.click(getByText("MEOW!"))
    expect(getByText("One moment Daddy-O. Please complete the inputs")).toBeInTheDocument()

  })

  it("should submit the form if it's been filled out correctly", () => {
    const mockAddUser = jest.fn();
    const router = (
      <BrowserRouter>
        <Login addUser={mockAddUser} />
      </BrowserRouter>
    );

    const { getByText, getByPlaceholderText } = render(router);
    fireEvent.change(getByPlaceholderText("name"), {
    target: { value: "Robbie" },
    });
    fireEvent.change(getByPlaceholderText("80202"), {
    target: { value: "80202" },
    });
    fireEvent.click(getByText("MEOW!"))
    expect(mockAddUser).toHaveBeenCalled()

})
})
