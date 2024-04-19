import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('Search movies', () => {
    it('Renders the top 5 movies when searching', async () => {
        const { getByPlaceholderText, findAllByText, findAllByTestId } = render(<App />);
    
        const inputField = getByPlaceholderText('Zoeken...');
    
        await act( () => fireEvent.change(inputField, { target: { value: 'Monster' } }));

        await waitFor(() => expect(findAllByTestId('card')).resolves.toHaveLength(7));
    
        const cards = await findAllByTestId('card');
        expect(cards).toHaveLength(7);
      });
    
      it('Gives back a warning when there are no search results', async () => {
        const { getByPlaceholderText, findAllByText, findByTestId } = render(<App />);
    
        const inputField = getByPlaceholderText('Zoeken...');
 
        await act( () => fireEvent.change(inputField, { target: { value: 'xxxyyyzzz' } }));

        await findAllByText(/Geen resultaten/);
    
        const warning = await findByTestId('warning');
        expect(warning).toHaveTextContent(`Geen resultaten gevonden voor de zoekterm 'xxxyyyzzz'`);
      });
});