import React, { useEffect, useRef } from 'react'
import castRequest from './API/CastRequests';
import axios from './axios';
import './CastInfo.css';
import photoRequest from './API/PhotoAPI';



function CastInfo({movie , movieId}) {
    
    const cast = useRef();
    const castImages = useRef();
    const castDataLength = useRef();
 
    useEffect(() =>{
        async function fetchData(){
    
            await axios.get(castRequest.fetchActors + movieId +castRequest.fetchActorsKey + castRequest.fetchActorsLang).then((resp) => {
                cast.current = resp.data.cast;
                castDataLength.current = cast.current.length;
            })
        }
        fetchData();
    }, [])
    
    function callGetCastPictures() {
        if(cast.current !== "undefined") {
             getCastPictures();
        }
    }
    async function getCastPictures (){
        var images = []
        for (let i = 0; i < castDataLength.current; i++){
            
            await axios.get(photoRequest.image + cast.current[i].id + photoRequest.imageKey).then((resp)=> {
                images.push(resp.data.profiles[0].file_path);

            });
        }
        if(images.length !== 0){
            castImages.current = images;
        }
    }
   
    return (
        <>
        <div className="castContainer"><h1>Cast:</h1>
            <div className="castInfo">
                { callGetCastPictures()}
                { castImages.current !== "undefined" && castImages.current?.map((data,id) =>{

                    const nameContainer = "actor" + id + "Name" + " actorName" ;
                    const imgContainer = "person" + id + " actorImg";
                    const divContainer = "actor" + id + " actorContainer"
                    const url = "https://image.tmdb.org/t/p/original/" + castImages.current[id];

                    return <div key={id} className={divContainer}>
                    <img src={url} alt="" className={imgContainer} />
                    <div className={nameContainer}>{cast.current[id].name}</div>
                    <div className="actorName">-- As --</div>
                    <div className="actorName">{cast.current[id].character}</div>
                </div>
                
                })}
                
            </div>
        </div>
        
        </>
        
    )
}

export default CastInfo