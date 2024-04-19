const fetchMoviesData = async (movieTitle, idNumbers) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    try {
        if (movieTitle){
        const movieSearchResponse = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apiKey=${apiKey}`);
        const movieSearchData = await movieSearchResponse.json();
        
        const moviesData = movieSearchData.Search ? movieSearchData.Search.slice(0, 5) : [];
        const movieDetailsPromises = moviesData.map(async movie => {
            const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&plot=full&apiKey=${apiKey}`);
            return response.json();
        });
        const movieDetails = await Promise.all(movieDetailsPromises);
        return movieDetails;
    } else {
        const movieDetails = await Promise.all(
            idNumbers.map(id => fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apiKey=` + apiKey).then(res => res.json()))
        );
        return movieDetails;
    }
    } catch (error) {
        throw error;
    }
};


export default fetchMoviesData;