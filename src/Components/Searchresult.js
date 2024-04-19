import React, { useState, useEffect } from 'react';
import { act } from '@testing-library/react';
import MovieCard from './MovieCard';
import fetchMoviesData from '../FetchAPI'

const Searchresult = ({ movieTitle }) => {
    const [movies, setMovies] = useState([]);

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
                    <MovieCard key={index} {...movie} highlight={false} index={index} showDetail={true} cards={movies} setCards={setMovies} />
                ))}
            </div>
        </section>
    );
}

export default Searchresult;