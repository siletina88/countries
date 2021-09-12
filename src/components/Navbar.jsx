import React from "react";
import "./navbar.scss";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const handleToggler = () => {
    setIsDarkMode((prevState) => !prevState);
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
