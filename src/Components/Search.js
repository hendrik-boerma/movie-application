import '../App.css';
import searchicon from "../Images/search.png"

function Search({ movieTitle, handleInputChange }) {
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
