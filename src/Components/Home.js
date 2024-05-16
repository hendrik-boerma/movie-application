import MovieCard from './MovieCard';
import { useContext } from 'react'
import { DataContext } from '../DataProvider';

function Home() {
    const [highlights, setHighlights, title ] = useContext(DataContext).highlights;

    return (
        <section>
            <h1>{title}</h1>
            <div className='card-grid'>
                {highlights.map((highlight, index) => (
                    <MovieCard
                        key={index}
                        index={index}
                        data={highlight}
                        showDetail={false}
                        cards={highlights}
                        setCards={setHighlights}
                    />
                ))}
            </div>
        </section>
    );
}

export default Home;