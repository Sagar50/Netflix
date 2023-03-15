import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase';
import Nav from '../Nav';
import './ProfileScreen.css';

function ProfileScreen() {
    const user = useSelector(selectUser);
    return (
    <div className="profileScreen">
        <Nav />
        <div className="profileScreen_body">
            <h1>Edit Profile</h1>
            <div className="profileScreen_info">
                <img src='https://imgs.search.brave.com/fQ8kDEDOLsGnkm1jr6s_4gbghG8ATJkTp-VXbWAhdgc/rs:fit:320:320:1/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9kaXNwLzg0YzIw/MDMzODUwNDk4LjU2/YmE2OWFjMjkwZWEu/cG5n' alt='Profile logo' />
                <div className="profileScreen_details">
                    <div className="emailContainer_checkbox">
                        <h2>{user.email}</h2>
                        <label class="form-control">
                            <input type="checkbox" className="checkbox" />
                            Kid?
                        </label>
                    </div>
                    <div className="languageContainer">
                        <label for="lang">Language:</label>
                        <select className="languagesDropdown" id="lang">
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="hindi">Hindi</option>
                            <option value="french">French</option>
                            <option value="mandarin">Mandarin</option>
                            <option value="korean">Korean</option>
                        </select>
                    </div>
                    <div className="ratingContainer">
                        <label for="rating">Allowed TV shows and movies:</label>
                        <select className="ratingDropdown" id="rating">
                            <option value="TV-MA">All Maturity Levels</option>
                            <option value="R">May be inappropriate for ages under 17</option>
                            <option value="PG-13">May be inappropriate for ages under 13</option>
                            <option value="PG">Parental Guidance suggested</option>
                            <option value="G">Suitable for General Audiences</option>
                        </select>
                    </div>
                    <div className="autoPlay_settingContainer">
                        <label className="autoPlay_title">Autoplay controls</label>
                        <label className="form-control settings_autoplayEpisodes">
                            <input type="checkbox" className="checkbox" />
                            Autoplay next episode in a series on all devices.
                        </label>
                        <label className="form-control settings_autoplayPreview">
                            <input type="checkbox" className="checkbox" />
                            Autoplay preview while browsing on all devices.
                        </label>
                    </div>
                </div>  
            </div>
            <div className="options_container">
                <button className="profileScreen_button profileScreen_save">Save</button>
                <button className="profileScreen_button profileScreen_signOut" onClick={() => auth.signOut()}>Sign Out</button>
                <button className="profileScreen_button profileScreen_delete">Delete Profile</button>
            </div>
            
        </div>
    </div>
  )
}

export default ProfileScreen