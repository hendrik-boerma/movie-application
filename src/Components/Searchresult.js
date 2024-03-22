import React, { useState, useEffect } from 'react';
import logoimage from '../Images/logoimage.png';

const Searchresult = ({ movieTitle }) => {
    const [movies, setMovies] = useState([]);

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
                }).catch((error) => {
                    console.error('Error fetching detailed data:', error);
                });
            });
    }, [movieTitle]);

    if (movieTitle === '') {
        return;
    }

    if (movies.length === 0) {
        return  (
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
                <MovieItem key={index} {...movie} index={index} />
            ))}
        </div>
        </section>
    );
}

const MovieItem = ({ Poster, Title, Year, Plot, Awards, Director, Actors, Rated, Genre, Type, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div key={index} className='card' data-testid="card">
            <img className='card-image' src={Poster === "N/A" ? logoimage : Poster} alt="Movie Poster" />
            <div style={isOpen ? { height: '100%', paddingBottom: '4rem'  } : null} className='card-text-search'>
                <h1 className='card-title'>{Title}</h1>
                <p className='card-year'>{Year} | {Rated === "N/A" ? '' : `${Rated} |`} {Genre} | {Type}</p>
                <p className='card-plot'>{Plot}</p>
                <p className='card-director'>Director: {Director}</p>
                <p className='card-actors'>Actors: {Actors}</p>
                <p className='card-awards'>Awards: {Awards}</p>
                <button onClick={() => setIsOpen(!isOpen)} className='readMore'>{isOpen ? 'Lees minder' : 'Lees meer'}</button>
            </div>
        </div>
    );
};

export default Searchresult;