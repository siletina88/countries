import React from "react";
import "./Navbar.scss";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";

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
            <HiOutlineMoon></HiOutlineMoon>
          )}
        </p>
        <p>Dark Mode</p>
      </div>
    </div>
  );
}
