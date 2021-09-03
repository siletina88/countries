import React from "react";
import "./navbar.scss";
import { HiMoon } from "react-icons/hi";

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const handleToggler = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div
      className={isDarkMode ? "navbarContainer darkMode" : "navbarContainer"}
    >
      <h1>Where in the world?</h1>
      <div onClick={handleToggler} className="darkModeToggle">
        <p>
          {isDarkMode ? (
            <HiMoon style={{ color: "white" }}></HiMoon>
          ) : (
            <HiMoon></HiMoon>
          )}
        </p>
        <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
      </div>
    </div>
  );
}
