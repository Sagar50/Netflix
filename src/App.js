import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  
]);

const loginRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
  },
  
]);

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
          dispatch(logout);
          //logged out
        }
    });
    return unsubscribe;
  }, []);

  return ( 
    <div className="app">
    <React.StrictMode>
      {!user ? (<RouterProvider router={loginRouter}/>): (<RouterProvider router={router} />)}
    </React.StrictMode>
    </div>
  );
}

export default App;
