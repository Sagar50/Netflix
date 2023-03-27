import { auth } from '../firebase';
import './SigninScreen.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SigninScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            navigate('/');
        }).catch((error) => alert(error.message));
    };
    
    return (

        <div className="signInScreen">
            <div className="signInScreen_background">
                <img 
                    onClick={ (() => {navigate("/")}) }
                    className='signInScreen_logo'
                    src='https://imgs.search.brave.com/FCtJ10H3eu8Hq_gFfZgIj8fMP4wvHWwjLMia4CM7fPw/rs:fit:1200:632:1/g:ce/aHR0cHM6Ly9wbGFz/dGljb2NlYW5zLm9y/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OC8wOS9uZXRmbGl4/LWxvZ28tMS5wbmc'
                    alt='Netflix Logo'
                />
                <button className="signInScreen_button" onClick={ (() => {navigate("/signIn")})}>Sign in</button>
                <div className="signInScreen_gradient" />
                <div className="signInScreen_body">
                    <div className="signInScreen_bodyContainer">
                        <form> 
                            <h1>Sign In</h1>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password"onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit"  onClick={ signIn}>Sign in</button>
                            <h4>
                                <span className="signInScreen_gray">New to Netflix?</span>
                                <span className="signInScreen_link" onClick={ (() => {navigate("/signUp")})}>Sign up now.</span>
                            </h4>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default SigninScreen