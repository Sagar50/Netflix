const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_grenres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_grenres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_grenres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_grenres=10749`,
    fetchDocumentariesMovies: `/discover/movie?api_key=${API_KEY}&with_grenres=99`,
    
};

export default requests;