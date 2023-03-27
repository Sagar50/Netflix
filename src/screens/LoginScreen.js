import './LoginScreen.css'
import { useNavigate } from 'react-router-dom';


function LoginScreen() {
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
            <button className="loginScreen_button" onClick={ (() => {navigate("/signIn")})}>Sign in</button>
            <div className="loginScreen_gradient" />
        </div>
        <div className="loginScreen_body">

            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere and anytime.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className="loginScreen_input">
                <form>
                    <input id="emailInp" type="email" placeholder="Email Address"/>
                    <button type="button" className="loginScreen_getStarted" onClick={ (() => {navigate("/signUp")})} >GET STARTED</button>
                </form>
            </div>
            
        </div>
    </div>
    )
}

export default LoginScreen