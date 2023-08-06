import React from 'react'

import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {

    const loginBtn = document.getElementById('loginBtn');
    const logOutBtn = document.getElementById('logOutBtn');
    // logOutBtn.style.display='none';

    const location = useLocation();

    const usenavigate = useNavigate();

    const navigatLogin = ()=>{
        usenavigate("/login")
    }

    const proseedLogout = ()=>{
        sessionStorage.clear();
        alert("Loged Out!")
        usenavigate('/login');
        logOutBtn.style.display="none";
        loginBtn.style.display="unset";
    }
  return (
    <>
        <nav className="navbar">
                <div className="logo">
                    <h1>KORERO</h1>
                </div>
                <div className="nav-menu">
                    <ul className="menu">
                        <li className="menu-item">
                            <Link className={`menu-link ${location.pathname === "/"? "active" : "inactive"}`} to="/">Profile</Link>
                        </li>
                    </ul>
                </div>
                <div className="nav-btns">
                    <button className="login-btn" id='loginBtn' onClick={navigatLogin} >Login</button>
                    <button className="logout-btn" id='logOutBtn'  onClick={proseedLogout} >Logout</button>
                </div>
        </nav> 
    </>
  )
}
