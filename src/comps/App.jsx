import "../styles/app.css";
import { createContext, useState } from "react";
import ContentHolder from "./contentHolder"

export const ThemeContext = createContext(undefined);

const ThemeProvider = ({children}) =>
{
    const [theme, setTheme] = useState("light");

    const toggleTheme = () =>
    {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


const App = () =>
{
    return (
        <ThemeProvider>
            <ContentHolder/>
        </ThemeProvider>
    );
}

export default App;