import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css'
import SignupScreen from './SignupScreen'


function LoginScreen() {
    const [signin, setSignIn] = useState(false)
    const navigate = useNavigate();

    function refreshPage(){ 
        window.location.reload(); 
    }
    
    return (
    <div className="loginScreen">
        <div className="loginScreen_background">
            <img 
                onClick={ refreshPage }
                className='loginScreen_logo'
                src='https://imgs.search.brave.com/FCtJ10H3eu8Hq_gFfZgIj8fMP4wvHWwjLMia4CM7fPw/rs:fit:1200:632:1/g:ce/aHR0cHM6Ly9wbGFz/dGljb2NlYW5zLm9y/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OC8wOS9uZXRmbGl4/LWxvZ28tMS5wbmc'
                alt='Netflix Logo'
            />
            <button className="loginScreen_button" onClick={() => setSignIn(true)}>Sign in</button>
            <div className="loginScreen_gradient" />
        </div>
        <div className="loginScreen_body">
            {signin ? (<SignupScreen />) : (
                <>
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere and anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className="loginScreen_input">
                        <form>
                            <input type="email" placeholder="Email Address"/>
                            <button className="loginScreen_getStarted" onClick={() => setSignIn(true)}>GET STARTED</button>
                        </form>
                    </div>
                </>
            )}
        </div>
    </div>
    )
}

export default LoginScreen