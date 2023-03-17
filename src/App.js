import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from './screens/ProfileScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ShowMovie from './screens/ShowMovie';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth) => {
        if (userAuth){
          //logged in
          dispatch(
            login({
              uid: userAuth.uid,
              email: userAuth.email
            })
          );
        } else {
          dispatch(logout());
        }
    });
    return unsubscribe;
  }, [dispatch]);

  return ( 
    <div className="app">
    <Router>
        {!user ? (
            <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />}/>
            
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/showMovie" element={<ShowMovie />}/>
          </Routes>
          )
        }
    </Router>
    </div>
  );
}

export default App;
