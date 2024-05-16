import React, { useState, createContext } from 'react';
import Search from './Components/Search';
import SearchResult from './Components/Searchresult';
import Home from './Components/Home';
import { DataProvider } from './DataProvider'
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
        <DataProvider>
          <SearchResult />
          <Home />
        </DataProvider>
      </main >
    </TitleContext.Provider>
  );
}

export default App;