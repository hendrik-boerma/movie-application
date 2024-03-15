import '../App.css';

function Search({ movieTitle, handleInputChange }) {
    return (
        <>
        <input type="text" value={movieTitle} onChange={handleInputChange}/>
        </>
    );
}

export default Search;
