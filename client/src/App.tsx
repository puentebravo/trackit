import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css';
import Landing from './pages/landing';
import Login from './pages/login';
import Home from './pages/home';
import Signup from './pages/signup';

function App() {
  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
