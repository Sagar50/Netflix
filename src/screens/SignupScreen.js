import React, { useState } from 'react';
import { addUserDetails, auth } from '../firebase';
import './SignupScreen.css';
import { useNavigate } from 'react-router-dom';

function SignupScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const register = (e) => {
        e.preventDefault();
        const isKid = "no";
        const lang = "English";
        const rating = "TV-MA";

        const isAutoEp = "yes";
        const isAutoPre = "yes";



        

        auth.createUserWithEmailAndPassword(email, password)
        .then(addUserDetails({isKid, lang, rating, isAutoEp, isAutoPre}))
        .catch((error) => {
            alert(error.message);
        });
        navigate("/");
    };
    
    return (

        <div className="signUpScreen">
            <div className="signUpScreen_background">
                <img 
                    onClick={(() => {navigate("/")}) }
                    className='signUpScreen_logo'
                    src='https://imgs.search.brave.com/FCtJ10H3eu8Hq_gFfZgIj8fMP4wvHWwjLMia4CM7fPw/rs:fit:1200:632:1/g:ce/aHR0cHM6Ly9wbGFz/dGljb2NlYW5zLm9y/Zy93cC1jb250ZW50/L3VwbG9hZHMvMjAx/OC8wOS9uZXRmbGl4/LWxvZ28tMS5wbmc'
                    alt='Netflix Logo'
                />
                <button className="signUpScreen_button" onClick={ (() => {navigate("/signIn")})}>Sign in</button>
                <div className="signUpScreen_gradient" />
                <div className="signUpScreen_body">
                    <div className="signUpScreen_bodyContainer">
                        <form> 
                            <h1>Create Account</h1>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password"onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit"  onClick={ register}>Sign up</button>
                            <h4>
                                <span className="signupScreen_gray">Already a member?</span>
                                <span className="signupScreen_link" onClick={ (() => {navigate("/signIn")})}>Sign in now.</span>
                            </h4>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    
    )
}

export default SignupScreen