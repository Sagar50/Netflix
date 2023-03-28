import React, { useEffect, useState } from 'react';
import "./Banner.css";
import axios from "./axios";
import requests from "./API/Requests";
import { useNavigate } from 'react-router-dom';


function Banner() {
    const navigate = useNavigate();
    function truncate(string, n){
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }

    const [movie, setMovie] = useState([]);
    useEffect(() => {

        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            
            return request;
        }
        fetchData();
    }, [])
    

    return (
        <>
            <header className='banner' style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}>
                <div className="banner_contents">
                    <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                    <div className="banner_buttons">
                        {/* <button className="banner_button" onClick={createVideoPlay}>Play trailer</button> */}
                        <button className="banner_button" onClick={() => navigate('/showMovie',{state:{movieInfo: movie}})}> <div className=" information">i</div>More details</button>
                        
                    </div>
                    <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
                </div>
                <div className="banner--fadeBottom" />
            </header>
            {/* <div className="videoPlayer_holder">
                <span className="close" onClick={closeVidPlay}>&#10006;</span>
                <iframe title="Video of show/movie" className="video" allowFullScreen="1"></iframe>
            </div> */}
        </>    
        
    )
}

export default Banner