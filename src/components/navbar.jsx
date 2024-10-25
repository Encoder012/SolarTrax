import React from 'react';
import './css/navbar.css';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 navbar">
        <div>
            <h1 className='logo-text'>STRAX</h1>
        </div>
        <div className="nav-links"> 
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
        </div>
        <div className="nav-buttons">
            <button>Signup</button>
            <button>Login</button>
        </div>
    </nav>
  );
};

export default Navbar;
