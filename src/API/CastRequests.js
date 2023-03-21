const OMDb_API = process.env.REACT_APP_OMDb_API;
const API_KEY = process.env.REACT_APP_API_KEY
const castRequest = {
    fetchCast: `${OMDb_API}&`,
    fetchActors: `https://api.themoviedb.org/3/tv/`,
    fetchActorsKey: `/credits?api_key=${API_KEY}`,
    fetchActorsLang: `&language=en-US`
}

export default castRequest