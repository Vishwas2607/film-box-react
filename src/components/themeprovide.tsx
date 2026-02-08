import { createContext, useContext, useEffect, type ReactNode } from "react";
import useLocalStorage from "./uselocalstorage";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme : () => void; 
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({children}: {children:ReactNode}) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [theme,setTheme] = useLocalStorage<Theme>("theme",prefersDark ? "dark" : "light");


    useEffect(()=> {
        document.documentElement.classList.remove("light", prefersDark ? "dark" : "light");
        document.documentElement.classList.add(theme);
    },[theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme Must be used within <ThemeProvider>")
    return context;
}