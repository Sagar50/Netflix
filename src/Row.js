import React, { useEffect, useState} from 'react'
import './Row.css';
import axios from './axios'
import { useNavigate } from 'react-router-dom';


function Row({ title, fetchUrl, id, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const base_url = "https://image.tmdb.org/t/p/original/";
    const baseMURL = "https://api.themoviedb.org/3/movie/";
    const baseTURL = "https://api.themoviedb.org/3/tv/";

    useEffect(() =>{
        async function fetchData(){
            if(title === "Show"){
                const request = await axios.get(baseTURL + id +fetchUrl);
                setMovies(request.data.results);
                return request;
            } else if (title === "Movie"){
                const request = await axios.get(baseMURL + id + fetchUrl);
                setMovies(request.data.results);
                return request;
            } else {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
                return request;
            }
        }
        fetchData();
        
    }, [fetchUrl,title, id])
    

    return (
    <div className="row">
        {(title !== "Show" && title !== "Movie") && <h2>{title}</h2>}
        
        <div className="row_posters">
            {movies.map((movie) => (
                
                ((isLargeRow && movie?.poster_path) || 
                (!isLargeRow && movie?.backdrop_path)) && (
                <img 
                    className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                    key={movie.id} 
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}
                    onClick={() => navigate('/showMovie',{state:{movieInfo: movie}})}
                    
                />)
            ))}
        </div>
    </div>
  );
}

export default Row