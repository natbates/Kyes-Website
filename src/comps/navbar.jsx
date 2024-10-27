import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navBar.css'; 

const Navbar = () => {
    const location = useLocation(); 

    return (
        <div className="nav-bar">
            <nav>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/photos" className={location.pathname === '/photos' ? 'active' : ''}>Photos</Link>
                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
            </nav>
        </div>
    );
};

export default Navbar;
