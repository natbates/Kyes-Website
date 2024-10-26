import { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate a login function
    const login = (username, password) => {
        // Add your login logic here (e.g., call an API)
        const fakeUser = { username: username };
        setUser(fakeUser);
        localStorage.setItem("user", JSON.stringify(fakeUser));
    };

    // Simulate a logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Check if user is already logged in on app load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Value provided by the context
    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
