import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import "./SearchAndFilter.scss";

export default function SearchAndFilter({
  filter,
  setFilter,
  isDarkMode,
  isMinSearchLength,
  countries,
  searchTerm,
  isToggled,
  handleChange,
  handleToggle,
}) {
  const history = useHistory();

  const DarkModeCheck = (className) => {
    if (isDarkMode) {
      return className + " darkMode";
    } else return className;
  };

  return (
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
          <div className="filterLeft">
            {filter ? `${filter}` : "Filter by Region"}
          </div>
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
  );
}
