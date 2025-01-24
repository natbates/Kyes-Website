import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Photos from "../pages/photos";
import Contact from "../pages/contact";

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
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default ContentHolder;