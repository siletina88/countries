import React, { useEffect, useState } from "react";
import "./countriesList.scss";
import CountryCard from "./CountryCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchAndFilter from "./SearchAndFilter";
import { useTheme } from "../styles/ThemeContext";

export default function CountriesList() {
  const [isToggled, setIsToggled] = useState(false);
  const [countries, setCountries] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMinSearchLength, setIsMinSearchLength] = useState(false);

  const location = useLocation();
  const isDarkMode = useTheme();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.length > 1) {
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

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
      window.scrollTo(0, 0);
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
    <div className={isDarkMode ? "countriesListContainer darkMode" : "countriesListContainer"} onClick={CloseSubmenus}>
      <SearchAndFilter
        setFilter={setFilter}
        filter={filter}
        isMinSearchLength={isMinSearchLength}
        countries={countries}
        searchTerm={searchTerm}
        isToggled={isToggled}
        handleChange={handleChange}
        handleToggle={handleToggle}
      />
      <ul className='countriesList'>{filteredCountries && filteredCountries.map((country) => <CountryCard key={country.name} country={country} />)}</ul>
    </div>
  );
}
