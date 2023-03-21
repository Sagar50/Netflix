const photos_key = process.env.REACT_APP_API_KEY;

const photoRequest = {
    client: `http://api.themoviedb.org/3/search/person?query=`,
    image: `https://api.themoviedb.org/3/person/`,
    clientKey: `&api_key=${photos_key}`,
    imageKey: `/images?api_key=${photos_key}`
}
export default photoRequest