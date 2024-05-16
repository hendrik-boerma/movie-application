import React, { useContext } from 'react';
import { DataContext } from '../DataProvider';
import { TitleContext } from '../App';
import MovieCard from './MovieCard';

function SearchResult() {
    const [ movies, setMovies ] = useContext(DataContext).searchresults;
    const [movieTitle] = useContext(TitleContext);
    
    if (movieTitle === '') {
        return;
    }

    if (movies.length === 0) {
        return (
            <section>
                <h1>Zoekresultaten</h1>
                <p data-testid="warning">Geen resultaten gevonden voor de zoekterm '{movieTitle}'</p>
            </section>
        );
    }

    return (
        <section>
            <h1>Zoekresultaten</h1>
            <div className='card-grid'>
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

export default SearchResult;