import React, { useEffect, useState, useContext } from "react";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}
export function useThemeToggle() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const persistedTheme = JSON.parse(localStorage.getItem("theme"));
  const [isDarkMode, setIsDarkMode] = useState(!!persistedTheme);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode);
  }, [isDarkMode]);

  const themeToggle = () => {
    setIsDarkMode((prevState) => !prevState);
  };
  return (
    <ThemeContext.Provider value={isDarkMode}>
      <ThemeUpdateContext.Provider value={themeToggle}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
