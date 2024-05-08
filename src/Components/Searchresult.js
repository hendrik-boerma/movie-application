import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import fetchMoviesData from '../FetchAPI'
import { useContext } from 'react'
import { TitleContext } from '../App';

const Searchresult = () => {
    const [movies, setMovies] = useState([]);
    const [movieTitle] = useContext(TitleContext)

    useEffect(() => {
        fetchMoviesData(movieTitle, [])
            .then(data => setMovies(data))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [movieTitle]);

    if (movieTitle === '') {
        return;
    }

    if (movies.length === 0) {
        return (
            <section>
                <h1>Zoekresultaten</h1>
                <p id='result-warning' data-testid="warning">Geen resultaten gevonden voor de zoekterm '{movieTitle}'</p>
            </section>
        );
    }

    return (
        <section>
            <h1>Zoekresultaten</h1>
            <div id='search-result' className='card-grid'>
                {movies.map((movie, index) => (
                    <MovieCard 
                        key={index} 
                        index={index} 
                        data={movie} 
                        showDetail={true} 
                        highlight={false} 
                        cards={movies} 
                        setCards={setMovies} 
                    />
                ))}
            </div>
        </section>
    );
}

export default Searchresult;