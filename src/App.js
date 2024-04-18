import React, { useState } from 'react';
import Search from './Components/Search';
import Home from './Components/Home';
import Searchresult from './Components/Searchresult';
import './App.css';

function App() {
  const [movieTitle, setMovieTitle] = useState('');
  const handleInputChange = (event) => {
    setMovieTitle(event.target.value);
  };

  return (
    <>
      <header>
        <button onClick={() => setMovieTitle('')} className='logo'>Thuis.bioscoop</button>
        <Search movieTitle={movieTitle} handleInputChange={handleInputChange} />
      </header>
      <main>
          <Searchresult movieTitle={movieTitle} />
          <Home />
      </main>

    </>
  );
}

export default App;

