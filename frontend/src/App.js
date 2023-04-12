import React, { useState } from 'react';
import './App.css';
import Home from './components/home/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Watch from './components/watch/Watch';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './components/pages/SignUp';

export default function App() {

  const [user, setUser] = useState();

  const changeUser = (newUser) => {
    setUser(newUser);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home type="movies" /> : <Register />} />
          <Route path="/login" element={user ? <Home type="movies" /> : <Login login={changeUser} />} />
          <Route path="/signup" element={user ? <Home type="movies" /> : <SignUp signup={changeUser} />} />
          <Route path="/movies" element={<Home type="movies" />} />
          <Route path="watch" element={<Watch />} />
        </Routes>
      </Router>
      {/* <Home></Home> */}
      {/* <Watch></Watch> */}
      {/* <Register></Register> */}
      {/* <Login></Login> */}
    </>
  )
}

/*
Hey, connections
I created this amazing Nextflix web clone using react.js, node.js, and MongoDB.
I learned to create a pure react slider, implement react-router, and backend integration with react frontend. You can create a new account, log in and watch movies available on the app.
This is my first full-stack app and I enjoyed the development process a lot.
*/