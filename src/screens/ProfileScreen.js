
import { addUserDetails, auth, db } from '../firebase';
import Nav from '../Nav';
import './ProfileScreen.css';
import { useNavigate } from 'react-router-dom';

function ProfileScreen() {
    const user = auth.currentUser;
    const navigate = useNavigate();

    function saveInfo() {
        const isKid = document.getElementsByClassName("autoKid")[0].value;
        const lang = document.getElementsByClassName("languagesDropdown")[0].value;
        const rating = document.getElementsByClassName("ratingDropdown")[0].value;

        const isAutoEp = document.getElementsByClassName("autoEp")[0].value;
        const isAutoPre = document.getElementsByClassName("autoPrev")[0].value;

        addUserDetails({isKid, lang, rating, isAutoEp, isAutoPre});
    }

    function getArr(){
        const list = []
        db.collection("users").doc(`${auth.currentUser.uid}`).collection("my-movie-list").get()
            .then(querySnapshot => {
            querySnapshot.forEach((doc) => {    
                list.push(doc.data());
            })
        })
        console.log(list);
        return list;
    }
    return (
    <div className="profileScreen">
        <Nav />
        <div className="profileScreen_body">
            <h1>Edit Profile</h1>
            <div className="profileScreen_info">
                <div className="leftCol_container">
                    <img src='https://imgs.search.brave.com/fQ8kDEDOLsGnkm1jr6s_4gbghG8ATJkTp-VXbWAhdgc/rs:fit:320:320:1/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9kaXNwLzg0YzIw/MDMzODUwNDk4LjU2/YmE2OWFjMjkwZWEu/cG5n' alt='Profile logo' />
                    {/* potentially add this to the button -> onClick={ () =>  navigate('/myListScreen', {state:{listArr: getArr() }})} */}
                    <button className="viewList_button">View List</button>
                </div>
                <div className="profileScreen_details">
                    <div className="emailContainer_checkbox">
                        <h2>{user.email}</h2>
                        <label className="form-control">
                            <input type="checkbox" className="checkbox autoKid" />
                            Kid?
                        </label>
                    </div>
                    <div className="languageContainer">
                        <label htmlFor="lang">Language:</label>
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
                        <label htmlFor="rating">Allowed TV shows and movies:</label>
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
                            <input type="checkbox" className="checkbox autoEp" />
                            Autoplay next episode in a series on all devices.
                        </label>
                        <label className="form-control settings_autoplayPreview">
                            <input type="checkbox" className="checkbox autoPrev" />
                            Autoplay preview while browsing on all devices.
                        </label>
                    </div>
                </div>  
            </div>
            <div className="options_container">
                <button className="profileScreen_button profileScreen_save" onClick={ saveInfo }>Save</button>
                <button className="profileScreen_button profileScreen_signOut" onClick={() => {auth.signOut(); navigate("/");}}>Sign Out</button>
                <button className="profileScreen_button profileScreen_delete">Delete Profile</button>
            </div>
            
        </div>
    </div>
  )
}

export default ProfileScreen