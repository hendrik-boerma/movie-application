import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('Highlight movies', () => {
    it('Renders the movies "Toy Story" and "Forrest Gump" on page load', async () => {
      const { findByText } = render(<App />);
  
      await findByText('Uitgelicht');
  
      expect(await findByText('Toy Story')).toBeInTheDocument();
      expect(await findByText('Forrest Gump')).toBeInTheDocument();
    });

});