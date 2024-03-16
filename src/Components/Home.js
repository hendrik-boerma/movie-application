import { useState, useEffect } from 'react';
import '../App.css';

function Home() {
    const [highlights, setHighlights] = useState([]);
    const idNumbers = ['tt0114709', 'tt0109830', 'tt7137906'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    idNumbers.map(id => fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apiKey=6c3a2d45`).then(res => res.json()))
                );
                setHighlights(responses);
            } catch (error) {
                console.error('Error fetching detailed data:', error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className='card-grid'>
            {highlights.map((highlight, index) => (
                <div className='card' key={index}>
                    <img className='card-image' src={highlight.Poster} alt="Movie Poster" />
                    <div className='card-text-home'>
                        <h1 className='card-title'>{highlight.Title}</h1>
                        <p className='card-year'>{highlight.Year}</p>
                        <p className='card-plot'>{highlight.Plot}</p>
                        <p className='card-awards'>{highlight.Awards}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default Home;