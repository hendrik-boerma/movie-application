import { useState, useEffect } from 'react';
import '../App.css';

function Home() {
    const [highlight, setHighlight] = useState([])

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=tt0109830&apiKey=6c3a2d45`)
            .then((res) => res.json())
            .then((data) => {
                setHighlight(data)
            }).catch((error) => {
                console.error('Error fetching detailed data:', error);
            });
    }, []);

    return (
        <>
        <div className='card'>
            <img className='card-image' src={highlight.Poster} alt="Movie Poster" />
            <div className='card-text'>
                <h1 className='card-title'>{highlight.Title}</h1>
                <p className='card-year'>{highlight.Year}</p>
            </div>
        </div>
        </>
    );
}

export default Home;