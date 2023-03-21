
import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import './ShowMovie.css';
import ytRequest from '../API/YTRequests';
import axios from 'axios';
import { addToMyList, checkList, removeFromList } from '../firebase';
import CastInfo from '../CastInfo';

function ShowMovie() {
  const location = useLocation();
  const [movie, setMovie] = useState(location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name);
  var inList;


  useEffect(() => {
    const base_url = "https://youtube.googleapis.com/youtube/v3/search"

    async function fetchVideo (){
      const getVid = await axios.get(base_url + ytRequest.fetchVideo + movie + " trailer")
      setMovie(getVid.data)
      
    }
    fetchVideo();
    if(movie.length !== 0){
      checkList(movie).then((value) => {
          inList = value;
      });
      //console.log(inList);
    }
  },[])

  
  
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

  function addedToList() {
   
    const bttn = document.getElementsByClassName("movie_button")[1];
    bttn.classList.add("clicked");
    if(bttn.innerHTML === "Remove from list"){
      bttn.innerHTML = "Add to my list"
      removeFromList(location.state.movieInfo);
    } else {
      bttn.innerHTML = "Remove from list";
      addToMyList(location.state.movieInfo);
    }
  }

  return (
    
    <div className="showMovie_screen">
        <Nav />
        <div className="backgroundPic" style={{
           // background: `linear-gradient(60deg, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${location.state.movieInfo?.backdrop_path}")`,
             background: `linear-gradient(90deg, rgba(0, 0, 0, 0.95) 35%, rgba(0, 0, 0, 0) 60%), linear-gradient(0deg, rgba(0, 0, 0, 0.95) 20%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${location.state.movieInfo?.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}>
          <div className="movie_info">
            <h1 className="movie_title">{location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name}</h1>
            <div className="movie_buttons">
              <button className="movie_button" onClick={ createVideoPlay }>Play trailer</button>
              {!inList  ? (<button className="movie_button" onClick={() => {addedToList(); }}>Add to my list</button>):
                        (<button className="movie_button" onClick={() => {addedToList(); }}>Remove from list</button>)}
            </div>
            <h1 className="movie_description">{location.state.movieInfo?.overview}</h1>
          </div>

          <div className="castInformation">
          <CastInfo movieInfo={location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name} movieId={location.state.movieInfo.id}/>
          </div>
        </div>
        
        
        <div className="videoPlayer_holder">
          <span className="close" onClick={ closeVidPlay }>&#10006;</span>
          <iframe title="Video of show/movie" className="video" allowFullScreen="1" ></iframe>
        </div>  
        
    </div>
    
    
  )
  
}

export default ShowMovie