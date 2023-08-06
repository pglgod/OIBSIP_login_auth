

import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import StudentDtl from './components/StudentDtl'
import Signup from './components/Signup';

function App() {
  return (
   <>
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<StudentDtl/>} />
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/signup' element={<Signup/>} />
          </Routes>
        </div>
      </Router>

   </>
  );
}

export default App;
