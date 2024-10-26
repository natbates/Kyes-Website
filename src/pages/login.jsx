import "../styles/login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fake login check for testing purposes
        const fakeUser = "1@2.com";
        const fakePassword = "3";

        if (email === fakeUser && password === fakePassword) {
            auth.login(); // Call login from auth context
            navigate("/dashboard"); // Redirect to the dashboard
        } else {
            setError("Invalid email or password. Please try again."); // Set error message
        }
    };

    return( 
        <div id="login">
            <h1 id="login-title">Log In</h1>
            {!auth.isAuthenticated ? 
            <div>
                <p>Log in using the form below.</p>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div id="user-container">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            required 
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div id="password-container">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-button">Log In</button>
                </form>
                {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
            </div> : 
                <>
                    <p>Already logged in</p>
                    <div id="loggedin-button-container">
                        <button onClick={() => navigate("/dashboard")} id="dashboard-button">Dashboard</button>
                        <button onClick={() => auth.logout()} id="dashboard-button">Logout</button>
                    </div>

                </>
            }
        </div>
    );
}

export default LogIn;
