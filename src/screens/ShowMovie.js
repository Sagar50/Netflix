
import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import './ShowMovie.css';
import ytRequest from '../YTRequests';
import axios from 'axios';


function ShowMovie() {
  const location = useLocation();
  const [movie, setMovie] = useState(location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name);
  
  

  useEffect(() => {
    const base_url = "https://youtube.googleapis.com/youtube/v3/search"

    async function fetchVideo (){
      const getVid = await axios.get(base_url + ytRequest.fetchVideo + movie + " trailer")
      setMovie(getVid.data)
      return getVid;
    }
    fetchVideo();
  },[ytRequest])
  

  function createVideoPlay() {
    const video = document.getElementsByClassName("video");
    const movie1 = movie.items[0].id.videoId;
    video[0].src = "http://www.youtube.com/embed/" + movie1;

    const bgImg = document.getElementsByClassName("backgroundPic")[0];
    bgImg.style.filter="blur(3px)";
    document.getElementsByClassName("videoPlayer_holder")[0].classList.add('show');
  };

  function closeVidPlay() {
    const bgImg = document.getElementsByClassName("backgroundPic")[0];
    bgImg.style.filter="none";
    document.getElementsByClassName("videoPlayer_holder")[0].classList.remove('show');

    
  }
  return (
    
    <div className="showMovie_screen">
        <Nav />
        <div className="backgroundPic" style={{
            background: `linear-gradient(60deg, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${location.state.movieInfo?.backdrop_path}")`,
            // background: `linear-gradient(90deg, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0) 60%), linear-gradient(0deg, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${location.state.movieInfo?.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}>
          <div className="movie_info">
            <h1 className="movie_title">{location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name}</h1>
            <div className="movie_buttons">
              <button className="movie_button" onClick={ createVideoPlay }>Play trailer</button>
              <button className="movie_button">Add to my list</button>
            </div>
            <h1 className="movie_description">{location.state.movieInfo?.overview}</h1>
          </div>
        </div>
        
        <div className="videoPlayer_holder">
          <span className="close" onClick={ closeVidPlay }>&#10006;</span>
          <iframe title="Video of show/movie" className="video" allowfullscreen="1" ></iframe>
        </div>  
        
    </div>
    
    
  )
  
}

export default ShowMovie