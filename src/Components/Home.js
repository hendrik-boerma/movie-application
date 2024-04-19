import { useState, useEffect } from 'react';
import './MovieCard.scss';
import MovieCard from './MovieCard';
import fetchMoviesData from '../FetchAPI'

function Home() {
    const [highlights, setHighlights] = useState([]);
    const [title, setTitle] = useState('Uitgelicht')
    const [idNumbers] = useState(['tt0114709', 'tt0109830']);

    useEffect(() => {
        fetchMoviesData('', idNumbers)
            .then(data => setHighlights(data))
            .catch(error => {
                setTitle('Kan de pagina niet laden. Controleer de verbinding en probeer opnieuw');
                console.error('Error fetching data:', error);
            });
    }, [idNumbers]);

    return (
        <section>
            <h1>{title}</h1>
            <div className='card-grid'>
                {highlights.map((highlight, index) => (
                    <MovieCard key={index} {...highlight} index={index} showDetail={false} cards={highlights} setCards={setHighlights} />
                ))}
            </div>
        </section>
    );
}

export default Home;