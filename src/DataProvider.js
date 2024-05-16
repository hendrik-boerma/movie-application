import React, { createContext, useState, useEffect, useContext } from 'react';
import { TitleContext } from './App';

const DataContext = createContext();

const DataProvider = ({children}) => {
    const [movieTitle] = useContext(TitleContext);
    const [idNumbers] = useState(['tt0114709', 'tt0109830']);
    const [movies, setMovies] = useState([]);
    const [highlight, setHighlights] = useState([]);
    const [title, setTitle] = useState('Uitgelicht')

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const movieSearchResponse = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apiKey=${apiKey}`);
                const movieSearchData = await movieSearchResponse.json();
    
                const moviesData = movieSearchData.Search ? movieSearchData.Search.slice(0, 5) : [];
                const movieDetailsPromises = moviesData.map(async movie => {
                    const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apiKey=${apiKey}`);
                    return response.json();
                });
                const movieDetails = await Promise.all(movieDetailsPromises);
                console.log(movieDetails)
                setMovies(movieDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [movieTitle]);
    
    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const movieHighlights = await Promise.all(
                    idNumbers.map(id => fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apiKey=${apiKey}`).then(res => res.json()))
                );
                setHighlights(movieHighlights);
            } catch (error) {
                setTitle('Kan de pagina niet laden. Controleer de verbinding en probeer opnieuw');
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [idNumbers]);

    return (
        <DataContext.Provider value={{ highlights: [highlight, setHighlights, title], searchresults: [movies, setMovies] }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
