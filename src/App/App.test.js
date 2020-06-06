import React from 'react';
import { render, fireEvent, debug } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
