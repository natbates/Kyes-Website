import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Photos from "../pages/photos";
import Contact from "../pages/contact";
import Discord from "../pages/discord";
import RightMenu from "./rightMenu";
import LogIn from "../pages/login";
import Dashboard from "../pages/dashboard";

const ContentHolder = () =>
{
    return(
        <div className="page">
            <Router>
                <div className = "top-bar-holder">
                    <NavBar />
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/photos" element={<Photos/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/discord" element={<Discord/>} />
                        <Route path="/login" element = {<LogIn/>} />
                        <Route path="/dashboard" element = {<Dashboard/>} />
                    </Routes>
                </div>
                <RightMenu />
            </Router>
        </div>
    );
}

export default ContentHolder;