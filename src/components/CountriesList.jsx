import React, { useEffect, useState } from "react";
import "./countriesList.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import Country from "./Country";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

export default function CountriesList({ isDarkMode, setIsDarkMode }) {
  const [isToggled, setIsToggled] = useState(false);
  const [countries, setCountries] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMinSearchLength, setIsMinSearchLength] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.length > 2) {
      setIsMinSearchLength(true);
    } else {
      setIsMinSearchLength(false);
    }
  };

  const CloseSubmenus = () => {
    if (isToggled) {
      setIsToggled(false);
    } else if (searchTerm) {
      setIsMinSearchLength(false);
    }
  };

  const DarkModeCheck = (className) => {
    if (isDarkMode) {
      return className + " darkMode";
    } else return className;
  };

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, [location]);

  useEffect(() => {
    if (countries && filter) {
      const filtered = countries.filter((country) => country.region === filter);
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
      setIsLoading(false);
    }
  }, [filter, countries]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  return isLoading ? (
    <div className={isDarkMode ? "loader darkMode" : "loader"}>Loading...</div>
  ) : (
    <div
      className={
        isDarkMode
          ? "countriesListContainer darkMode"
          : "countriesListContainer"
      }
      onClick={CloseSubmenus}
    >
      <div className="searchAndFilter">
        <div className={DarkModeCheck("search")}>
          <i>
            <AiOutlineSearch />
          </i>
          <input
            type="text"
            onChange={handleChange}
            value={searchTerm}
            className={DarkModeCheck("search-bar")}
            placeholder="Search for a country..."
          />
          <div
            className={
              isMinSearchLength
                ? DarkModeCheck("SearchDropdown") + " toggle"
                : DarkModeCheck("SearchDropdown")
            }
          >
            <div className="filterLeft">
              <ul>
                {searchTerm.length > 2 &&
                  countries.map((country) => {
                    if (
                      country.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return (
                        <li
                          onClick={() =>
                            history.push(`/country/${country.alpha3Code}`)
                          }
                          key={country.name}
                        >
                          {country.name}
                        </li>
                      );
                    } else return null;
                  })}
              </ul>
            </div>
          </div>
        </div>
        <div className="filterContainer">
          <div onClick={handleToggle} className={DarkModeCheck("filterBtn")}>
            <div className="filterLeft">Filter by region</div>
            <i
              className={
                isToggled
                  ? DarkModeCheck("filterRight") + " toggle"
                  : DarkModeCheck("filterRight")
              }
            >
              <BiChevronDown />
            </i>
          </div>
          <div
            className={
              isToggled
                ? DarkModeCheck("filterDropdown") + " toggle"
                : DarkModeCheck("filterDropdown")
            }
          >
            <div className="filterLeft">
              <ul>
                <li onClick={() => setFilter("")}>All</li>
                <li onClick={() => setFilter("Africa")}>Africa</li>
                <li onClick={() => setFilter("Americas")}>America</li>
                <li onClick={() => setFilter("Asia")}>Asia</li>
                <li onClick={() => setFilter("Europe")}>Europe</li>
                <li onClick={() => setFilter("Oceania")}>Oceania</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul className="countriesList">
        {filteredCountries &&
          filteredCountries.map((country) => (
            <Country
              key={country.name}
              country={country}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          ))}
      </ul>
    </div>
  );
}
