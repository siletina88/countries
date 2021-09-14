import React, { useEffect, useState, useContext } from "react";

const ThemeContext = React.createContext();

export function useTheme() {
  const { isDarkMode } = useContext(ThemeContext);
  return isDarkMode;
}
export function useThemeToggle() {
  const { themeToggle } = useContext(ThemeContext);
  return themeToggle;
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
    <ThemeContext.Provider value={{ isDarkMode, themeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
