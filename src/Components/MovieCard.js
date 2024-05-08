import './MovieCard.scss';
import logoimage from '../Images/logoimage.png';

const MovieCard = ({ data, index, showDetail, cards, setCards }) => {
    const { Poster, Title, Year, Plot, Awards, Director, Writer, Actors, Rated, Genre, Type, isOpen } = data;

    const getListFromArray = (array) => {
        return array ? array.split(',').map(item => item.trim()) : [];
    }
    
    const actorList = getListFromArray(Actors);
    const genreList = getListFromArray(Genre);
    const writerList = getListFromArray(Writer);

    const toggleOpen = (index) => {
        const updatedHighlights = cards.map((cards, i) => ({
            ...cards,
            isOpen: i === index ? !cards.isOpen : false
        }));
        setCards(updatedHighlights);
    };

    return (
        <div key={index} className='card' data-testid="card">
            <img className='card-image' src={Poster === "N/A" ? logoimage : Poster} alt="Movie Poster" />
            <div style={isOpen ? { height: '100%' } : null} className={showDetail ? 'card-text-search' : 'card-text-home'}>
                <h1 className='card-title'>{Title}</h1>
                <ul className='card-movietype'>
                    {Year !== "N/A" && <li>{Year} {showDetail && '|'}</li>}
                    {showDetail && Rated !== "N/A" && <li>{Rated} |</li>}
                    {showDetail && Type !== "N/A" && <li>{Type} |</li>}
                    {showDetail && genreList.map((genre, index) =>
                        <li key={index}>{genre}{index !== genreList.length - 1 && ','}</li>
                    )}
                </ul>
                {Plot === "N/A" ? '' : <p className='card-plot'>{Plot}</p>}
                {showDetail && <p className='card-director'>Director: {Director}</p>}
                {showDetail && <div className='card-writers'>
                    <p>Writer(s):</p>
                    <ul>
                        {writerList.map((writer, index) => (
                            <li key={index}>{writer}{index !== writerList.length - 1 && ','}</li>
                        ))}
                    </ul>
                </div>}
                {showDetail && <div className='card-actors'>
                    <p>Actors:</p>
                    <ul>
                        {actorList.map((actor, index) => (
                            <li key={index}>{actor}{index !== actorList.length - 1 && ','}</li>
                        ))}
                    </ul>
                </div>}
                <p className='card-awards'>Awards: {Awards}</p>
                {Plot !== "N/A" && (
                    <button onClick={() => toggleOpen(index)} className='readMore'>{isOpen ? 'Lees minder' : 'Lees meer'}</button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;