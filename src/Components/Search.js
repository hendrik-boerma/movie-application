import './Search.scss';
import searchicon from "../Images/search.png"
import { useContext } from 'react'
import { TitleContext } from '../App';

function Search() {

    const [movieTitle, setMovieTitle] = useContext(TitleContext)
    const handleInputChange = (event) => {
        setMovieTitle(event.target.value);
      };

    return (
        <div className="search">
        <input type="text" value={movieTitle} onChange={handleInputChange} placeholder="Zoeken..."/>
                <i>
                    <img id="search-icon" src={searchicon} alt='search-icon'/>
                </i>
            </div>
    );
}

export default Search;
