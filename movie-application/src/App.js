import React, { useState } from 'react';
import Search from './Components/Search';
import Home from './Components/Home';
import Fetch from './Fetch';
import './App.css';

function App() {
  const [movieTitle, setMovieTitle] = useState('');

  const handleInputChange = (event) => {
    setMovieTitle(event.target.value);
  };

  return (
    <>
      <header>
        <Search movieTitle={movieTitle} handleInputChange={handleInputChange} />
      </header>
      <main>
        <section className='card-grid'>
          <Home />
        </section>
        <section className='card-grid'>
          <Fetch movieTitle={movieTitle} />
        </section>
      </main>

    </>
  );
}

export default App;

