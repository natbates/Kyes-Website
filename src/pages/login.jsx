import "../styles/login.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import Loading from "../comps/loading";

const LogIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        setUserName("");
        setPassword("");
        setError("")
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Start the loading state
        console.log("test");
        setLoading(true);

        try {
            const response = await fetch("https://api.gwapes.com/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userName, 
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.auth){
                    auth.login(); 
                    navigate("/dashboard"); 
                } else {
                    setError("Invalid email or password. Please try again.")
                }
            } else {
                setError(data.message || "Invalid email or password. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        } finally {
            // End the loading state
            setLoading(false);
        }
    };

    return (
        <div id="login">
            <h1 id="login-title">Log In</h1>
            {!auth.isAuthenticated ? (
                <div>
                    <p>Log in using the form below.</p>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <div id="user-container">
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                className="login-input"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
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
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? <Loading delay={"0s"} className={"instant"}/> : "Log In"}
                        </button>
                    </form>
                    {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
                </div>
            ) : (
                <>
                    <p>Already logged in</p>
                    <div id="loggedin-button-container">
                        <button onClick={() => navigate("/dashboard")} id="dashboard-button">Dashboard</button>
                        <button onClick={() => auth.logout()} id="dashboard-button">Logout</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default LogIn;
