import React from 'react';
import "./HomeScreen.css";
import Nav from './Nav';
import Banner from './Banner';
function HomeScreen() {
  return (
    <div className="homeScreen">
        { /* nav */ }
        <Nav />
        
        <Banner />
        { /* banner */ }

        { /* body */ } 
    </div>
  )
}

export default HomeScreen;