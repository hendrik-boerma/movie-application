import React, { useState, useEffect } from 'react';

const Fetch = ({ movieTitle }) => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        if (!movieTitle) return;
        fetch(`https://www.omdbapi.com/?s=${movieTitle}&apiKey=6c3a2d45`)
            .then((res) => res.json())
            .then((data) => {
                const moviesData = data.Search ? data.Search.slice(0, 5) : [];
                Promise.all(moviesData.map(async movie => {
                    const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apiKey=6c3a2d45`);
                    const detailedData = await response.json();
                    return detailedData;
                })).then(detailedMovies => {
                    setMovies(detailedMovies);
                    console.log(moviesData);
                    console.log(detailedMovies);
                }).catch((error) => {
                    console.error('Error fetching detailed data:', error);
                });
            });
    }, [movieTitle]);


    if (movieTitle === '') {
        return;
    }

    if (!movies) {
        return <h1>Nog geen resultaten gevonden...</h1>;
    }

    if (movies.Response === 'False') {
        return <h1>Geen film gevonden</h1>;
    }

    return (
        <>
            {movies.map((movie, index) => (
                <div key={index} className='card'>
                    <img className='card-image' src={movie.Poster} alt="Movie Poster" />
                    <div className='card-text'>
                        <h1 className='card-title'>{movie.Title}</h1>
                        <p className='card-year'>{movie.Year} | {movie.Rated} | {movie.Genre}</p>
                        <div className='card-collapse'>
                            <p className='card-plot'>{movie.Plot}</p>
                            <p className='card-director'>Director: {movie.Director}</p>
                            <p className='card-actors'>Actors: {movie.Actors}</p>
                            <p className='card-awards'>Awards: {movie.Awards}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>

    )
};

export default Fetch;