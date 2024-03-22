import { useState, useEffect } from 'react';
import '../App.css';

function Home() {
    const config = require('../config.js');
    const apiKey = config.apiKey;
    const [highlights, setHighlights] = useState([]);
    const [idNumbers] = useState(['tt0114709', 'tt0109830']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    idNumbers.map(id => fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apiKey=` + apiKey).then(res => res.json()))
                );
                setHighlights(responses);
            } catch (error) {
                console.error('Error fetching detailed data:', error);
            }
        };
        fetchData();
    }, [idNumbers, apiKey]);

    const toggleOpen = (index) => {
        const updatedHighlights = highlights.map((highlights, i) => ({
            ...highlights,
            isOpen: i === index ? !highlights.isOpen : false
        }));
        setHighlights(updatedHighlights);
    };

    return (
        <section>
            <h1>Uitgelicht</h1>
            <div className='card-grid'>
                {highlights.map((highlight, index) => (
                    <HighlightItem key={index} {...highlight} index={index} toggleOpen={toggleOpen} />
                ))}
            </div>
        </section>
    );
}

const HighlightItem = ({ Poster, Title, Year, Plot, Awards, index, toggleOpen, isOpen }) => {
    return (
        <div className='card' key={index}>
            <img className='card-image' src={Poster} alt="Movie Poster" />
            <div style={isOpen ? { height: '100%'} : null} className='card-text-home'>
                <h1 className='card-title'>{Title}</h1>
                <p className='card-year'>{Year}</p>
                <p className='card-plot'>{Plot}</p>
                <p className='card-awards'>{Awards}</p>
                <button onClick={() => toggleOpen(index)} className='readMore'>{isOpen ? 'Lees minder' : 'Lees meer'}</button>
            </div>
        </div>
    );
};

export default Home;