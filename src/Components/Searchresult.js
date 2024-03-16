import React, { useState, useEffect } from 'react';
import logoimage from '../Images/logoimage.png';

const Searchresult = ({ movieTitle }) => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=${movieTitle}&apiKey=6c3a2d45`)
            .then((res) => res.json())
            .then((data) => {
                const moviesData = data.Search ? data.Search.slice(0, 5) : [];
                Promise.all(moviesData.map(async movie => {
                    const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apiKey=6c3a2d45`);
                    const detailedData = await response.json();
                    return detailedData;
                })).then(detailedMovies => {
                    setMovies(detailedMovies);
                    console.log(detailedMovies);
                }).catch((error) => {
                    console.error('Error fetching detailed data:', error);
                });
            });
    }, [movieTitle]);

    if (movieTitle === '') {
        return;
    }

    if (!movies || movies.length === 0) {
        return <p id='result-warning'>Geen resultaten gevonden voor de zoekterm.</p>;
    }

    return (

        <section id='search-result' className='card-grid'>
            {movies.map((movie, index) => (
                <div key={index} className='card'>
                    <img className='card-image' src={movie.Poster === "N/A" ? logoimage : movie.Poster} alt="Movie Poster" />
                    <div className='card-text-search'>
                        <h1 className='card-title'>{movie.Title}</h1>
                        <p className='card-year'>{movie.Year} | {movie.Rated === "N/A" ? '' : `${movie.Rated} |`} {movie.Genre} | {movie.Type}</p>
                        <p className='card-plot'>{movie.Plot}</p>
                        <p className='card-director'>Director: {movie.Director}</p>
                        <p className='card-actors'>Actors: {movie.Actors}</p>
                        <p className='card-awards'>Awards: {movie.Awards}</p>

                    </div>
                </div>
            ))}
        </section>


    )
};

export default Searchresult;