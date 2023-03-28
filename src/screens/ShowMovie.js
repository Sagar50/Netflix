
import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import Nav from '../Nav';
import './ShowMovie.css';
import ytRequest from '../API/YTRequests';
import axios from 'axios';
import { addToMyList, checkList, removeFromList } from '../firebase';
import CastInfo from '../CastInfo';
import requests from '../API/Requests';
import Row from '../Row';

function ShowMovie() {
  const location = useLocation();
  const [movie, setMovie] = useState(location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name);
  const [showCast, setShowCast] = useState(true);
  const [inList, setInList] = useState()

  useEffect(() => {
    const base_url = "https://youtube.googleapis.com/youtube/v3/search"

    async function fetchVideo (){
      const getVid = await axios.get(base_url + ytRequest.fetchVideo + movie + " trailer")
      setMovie(getVid.data)
      
    }
	
    fetchVideo();
  },[movie])
//   function checkmyList() {
// 	if(movie.length !== 0){
// 		checkList(movie).then((value) => {
// 			setInList(value);
// 		});
		
// 	  }
//   }
  function getGenreString(genreArr){
	var toRet = "";
	const genre = {
		28: "Action",
		12: "Adventure",
		16: "Animation",
		35: "Comedy",
		80: "Crime",
		99: "Documentary",
		18: "Drama",
		10751: "Family",
		14: "Fantasy",
		36: "History",
		27: "Horror",
		10402: "Music",
		9648: "Mystery",
		10749: "Romance",
		878: "Science Fiction",
		10770: "TV Movie",
		53: "Thriller",
		10752: "War",
		37: "Western",
	
	}
	for (var genres of genreArr) {
		if(genre[genres] !== undefined){
			toRet += genre[genres] + ", ";
		}
		
	}
	return toRet.substring(0, toRet.length-2);
  }
  
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
		<div className="showMovie_Screen">
			{/* {inList === "undefined" && checkmyList()} */}
			<Nav />
			<div className="showMovie_banner">
				<div className="movie_info">
					<div className="movieTitle_rating">
						<div className="title"><h1 className="movie_title">{location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name}</h1></div>
						<div className="rating">
							<span className="starSpan"></span>
							<span className="ratingSpan">{location.state.movieInfo.vote_average}</span>
							<span className="voteCount_span">({location.state.movieInfo.vote_count})</span>
						</div>
					</div>
					<div className="otherInfo">
						<div className="otherNames">
							<span>{((location.state.movieInfo?.original_name !== (location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name))
							||(location.state.movieInfo?.original_title !== (location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name)))?
							(location.state.movieInfo?.original_title || location.state.movieInfo.original_name) : console.log("it's the same")}</span>
						</div>
						<div className="yearCountry">
							<span><b>{location.state.movieInfo.first_air_date?.split("-")[0] || location.state.movieInfo.release_date?.split("-")[0]}</b></span>
							<span>|</span>
							<span>{ location.state.movieInfo.hasOwnProperty("origin_country")? location.state.movieInfo.origin_country[0]: location.state.movieInfo.original_language }</span>
						</div>
						<div className="genreDiv">
							<span>Genre(s): {getGenreString(location.state.movieInfo?.genre_ids)}</span>
						</div>
					</div>	
				
					<div className="movie_buttons">
						<button className="movie_button" onClick={ createVideoPlay }>Play trailer</button>
						{!inList  ? (<button className="movie_button" onClick={() => {addedToList(); }}>Add to my list</button>):
								(<button className="movie_button" onClick={() => {addedToList(); }}>Remove from list</button>)}
					</div>
					<h1 className="movie_description">{location.state.movieInfo?.overview}</h1>
				</div>
				<div className="imgContainer">
					<div className="backgroundPic" onResize={() => {
						if (window.matchMedia("(min-width: 600px)").matches) {
							console.log("Screen width is at least 600px")
						} else {
							console.log("Screen less than 600px")
						}
					}} style={{
						background: `url("https://image.tmdb.org/t/p/original/${location.state.movieInfo?.backdrop_path}")`
					}}><div className="gradient">
					</div></div>
					
				</div>
				
			</div>
			<div className="extraInfo_nav">
				<div className="buttonHolders">
					<div className="castNav_bttn bttn_clicked" onClick={() => {setShowCast(true); document.getElementsByClassName("castNav_bttn")[0].classList.add("bttn_clicked"); document.getElementsByClassName("videoNav_bttn")[0].classList.remove("bttn_clicked"); window.location.reload();}}>
						Cast
					</div>
					<div className="videoNav_bttn" onClick={ () => {setShowCast(false); document.getElementsByClassName("videoNav_bttn")[0].classList.add("bttn_clicked"); document.getElementsByClassName("castNav_bttn")[0].classList.remove("bttn_clicked");}}>
						Videos
					</div>
				</div>
			</div>
			
			<div className="castRecommendation_information">
				
				{ showCast && <CastInfo movieInfo={location.state.movieInfo?.title || location.state.movieInfo?.name || location.state.movieInfo?.original_name} movieId={location.state.movieInfo.id} movieInf={location.state.movieInfo} />}
				{ !showCast &&(location.state.movieInfo.hasOwnProperty("first_air_date") ? <Row title='Show' fetchUrl={requests.fetchRecommendations} id={location.state.movieInfo.id} isLargeRow/> : <Row title='Movie' fetchUrl={requests.fetchRecommendations} id={location.state.movieInfo.id} isLargeRow/>)}
        	</div>
			<div className="videoPlayer_holder">
				<span className="close" onClick={ closeVidPlay }>&#10006;</span>
				<iframe title="Video of show/movie" className="video" allowFullScreen="1" ></iframe>
			</div>  
		
		</div>
      
  
    
    
    
  )
  
}

export default ShowMovie