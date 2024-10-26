import React from 'react';
import { Link } from 'react-router-dom';
import './css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <h1 className="logo-text"><Link to="/">STRAX</Link></h1>
      </div>
      <div className="nav-links"> 
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/donation">Donate</Link></li>
      </div>
      <div className="nav-buttons">
        <Link to="/signup" ><button className=' ml-5'>Signup</button></Link>
        <Link to="/login"><button className=' ml-5'>Login</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
