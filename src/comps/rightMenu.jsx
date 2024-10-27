import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/rightMenu.css';
import { useAuth } from '../contexts/authContext';

const RightMenu = () => {
    const location = useLocation(); 
    const auth = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false); 


    useEffect(() => {
        setIsLoggedIn(auth.isAuthenticated)
    }, [auth.isAuthenticated, auth.loading]);

    return (
        <div id="right-menu-bar">
            <nav>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                    {isLoggedIn ?
                    <img className = "right-menu-bar-icon" src="svgs/login.svg" alt="Login Icon"></img> :
                    <img className = "right-menu-bar-icon" src="svgs/logout.svg" alt="Logout Icon"></img> }
                </Link>
            </nav>
        </div>
    );
};

export default RightMenu;
