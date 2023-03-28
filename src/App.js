import React, { useEffect, useState } from 'react';
import './App.css';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from './screens/ProfileScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, logout, selectUser } from './features/userSlice';
import ShowMovie from './screens/ShowMovie';
import ListScreen from './screens/ListScreen';

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    }
  }, [])

  return ( 
    <div className="app">
    <Router>
        {!authUser ? (
            <Routes>
              <Route exact path="/" element={<LoginScreen />}/>
              <Route exact path="/signUp" element={<SignupScreen />} />
              <Route exact path="/signIn" element={<SigninScreen />} />
            </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />}/>
            
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/showMovie" element={<ShowMovie />} />
            <Route exact path="/myListScreen" element={<ListScreen />} />
          </Routes>
          )
        }
        
    </Router>
    </div>
  );
}

export default App;
