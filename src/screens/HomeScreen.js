import React from 'react';
import "./HomeScreen.css";
import Nav from '../Nav';
import Banner from '../Banner';
import requests from '../API/Requests';
import Row from '../Row';



function HomeScreen() {
  
  return (
    <div className="homeScreen">
        <Nav />
        
        <Banner />

        <Row 
          title='NETFLIX ORIGINALS'
          fetchUrl={requests.fetchNetflixOriginals}
          id={0}
          isLargeRow
        />
        <Row title='Trending Now' fetchUrl={requests.fetchNetflixOriginals} id={0}/>
        <Row title='Top Rated' fetchUrl={requests.fetchTopRated} id={0} />
        <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} id={0}/>
        <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} id={0}/>
        <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} id={0}/>
        <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} id={0}/>
        <Row title='Documentaries' fetchUrl={requests.fetchDocumentariesMovies} id={0}/>
        
        
        
    </div>
  )
}
export default HomeScreen;