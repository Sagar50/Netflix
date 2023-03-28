import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);
    const navigate = useNavigate();


    const transitionNavBar = () => {
        if (window.scrollY > 60){
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    
    useEffect(() =>{
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav_contents">
            <img 
                onClick={() => navigate("/")}
                className='nav_logo'
                src='https://imgs.search.brave.com/FCtJ10H3eu8Hq_gFfZgIj8fMP4wvHWwjLMia4CM7fPw/rs:fit:1200:632:1/g:ce/aHR0cHM6Ly9wbGFz/dGljb2NlYW5zLm9y/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OC8wOS9uZXRmbGl4/LWxvZ28tMS5wbmc'
                alt='Netflix Logo'
            />

            <img 
                onClick={() => navigate("/profile")}
                className='nav_avatar'
                src='https://imgs.search.brave.com/fQ8kDEDOLsGnkm1jr6s_4gbghG8ATJkTp-VXbWAhdgc/rs:fit:320:320:1/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9kaXNwLzg0YzIw/MDMzODUwNDk4LjU2/YmE2OWFjMjkwZWEu/cG5n'
                alt='Netflix Profile'
            />
        </div>

        </div>
    );
}

export default Nav