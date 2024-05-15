import React, { useState, createContext } from 'react';
import Search from './Components/Search';
import Home from './Components/Home';
import Searchresult from './Components/Searchresult';
import './App.scss';

export const TitleContext = createContext();

function App() {
  const [movieTitle, setMovieTitle] = useState('');

  return (
    <TitleContext.Provider value={[movieTitle, setMovieTitle]}>
      <header>
          <button onClick={() => setMovieTitle('')} className='logo'>Thuis.bioscoop</button>
          <Search />
      </header>
      <main>
        <Searchresult />
        <Home />
      </main >
    </TitleContext.Provider>
  );
}

export default App;

