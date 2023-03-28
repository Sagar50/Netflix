import React, { useEffect, useRef } from 'react'
import castRequest from './API/CastRequests';
import axios from './axios';
import './CastInfo.css';
import photoRequest from './API/PhotoAPI';



function CastInfo({movie , movieId, movieInf}) {
    const cast = useRef();
    let castImages = useRef();
    const castDataLength = useRef();
    useEffect(() =>{
        async function fetchData(){
            if(movieInf.hasOwnProperty("first_air_date")){
                await axios.get(castRequest.fetchActors + movieId +castRequest.fetchActorsKey + castRequest.fetchActorsLang).then((resp) => {
                    cast.current = resp.data.cast;
                    castDataLength.current = cast.current.length;
                })
            } else {
                await axios.get(castRequest.fetchMovieActors + movieId +castRequest.fetchActorsKey + castRequest.fetchActorsLang).then((resp) => {
                    cast.current = resp.data.cast;
                    castDataLength.current = cast.current.length;
                })
            }
            
        }
        fetchData();
    }, [movieId, movieInf])
    
    function callGetCastPictures() {
        if(cast.current !== "undefined") {
                getCastPictures();
             
        }
    }
    async function getCastPictures (){
        var images = []
        for (let i = 0; i < castDataLength.current; i++){
            await axios.get(photoRequest.image + cast.current[i].id + photoRequest.imageKey).then((resp)=> {
                if(resp.data.profiles.length === 0) {
                    images.push("https://imgs.search.brave.com/vrcr1ytXG0MmHItM5OknTnu1VM4_VX0YsB8jNYL9nA4/rs:fit:610:819:1/g:ce/aHR0cHM6Ly9jdXJh/dGVkY2VyYW1pY3Mu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE3LzEwL2JsYW5r/LXByb2ZpbGUtcGlj/dHVyZS02MTB4ODE5/LmpwZw");
                } else {
                    images.push("https://image.tmdb.org/t/p/original/" + resp.data.profiles[0].file_path);
                }
            });
        }
        castImages.current = images;

    }
   
    return (
        <>
        
        <div className="castContainer">
            <div className="castInfo">
                { callGetCastPictures() }
                { castImages.current !== "undefined" && castImages.current?.map((data,id) =>{

                    const nameContainer = "actor" + id + "Name" + " actorName" ;
                    const imgContainer = "person" + id + " actorImg";
                    const divContainer = "actor" + id + " actorContainer"
                    return (<div key={id} className={divContainer}>
                    <img src={data} alt="" className={imgContainer} />
                    <div className={nameContainer}>{cast.current[id].name}</div>
                    <div className="actorName">-- As --</div>
                    <div className="actorName">{cast.current[id].character}</div>
                </div>)

                })}
                
            </div>
        </div>
        
        </>
        
    )
}

export default CastInfo