import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Components/Home';
import App from './App'

describe('Searching and highlight movies', () => {
  it('Renders the movies "Toy Story" and "Forrest Gump" on page load', async () => {
    const { findByText } = render(<Home />);

    await findByText('Uitgelicht');

    expect(await findByText('Toy Story')).toBeInTheDocument();
    expect(await findByText('Forrest Gump')).toBeInTheDocument();
  });

  it('Renders the top 5 movies when searching', async () => {
    const { getByPlaceholderText, findAllByText, findAllByTestId } = render(<App />);

    const inputField = getByPlaceholderText('Zoeken...');

    fireEvent.change(inputField, { target: { value: 'Monster' } });

    await findAllByText(/Monster/);

    const cards = await findAllByTestId('card');
    expect(cards).toHaveLength(5);
  });

  it('Gives back a warning when there are no search results', async () => {
    const { getByPlaceholderText, findAllByText, findByTestId } = render(<App />);

    const inputField = getByPlaceholderText('Zoeken...');

    fireEvent.change(inputField, { target: { value: 'xxxyyyzzz' } });

    await findAllByText(/Geen resultaten/);

    const warning = await findByTestId('warning');
    expect(warning).toHaveTextContent(`Geen resultaten gevonden voor de zoekterm 'xxxyyyzzz'`);
  });

});