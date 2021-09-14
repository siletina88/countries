import React from "react";
import "./navbar.scss";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";
import { useTheme, useThemeToggle } from "../styles/ThemeContext";

export default function Navbar() {
  const isDarkMode = useTheme();
  const themeToggle = useThemeToggle();

  return (
    <div
      className={isDarkMode ? "navbarContainer darkMode" : "navbarContainer"}
    >
      <h1>Where in the world?</h1>
      <div onClick={themeToggle} className="darkModeToggle">
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
