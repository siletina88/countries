import React, { useEffect, useState } from "react";
import "./Countrydetails.scss";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

export default function CountryDetails({ isDarkMode, setIsDarkMode, match }) {
  const [country, setCountry] = useState("");
  const countryParam = match.params.id;
  const fetchUrl = `
  https://restcountries.eu/rest/v2/alpha/${countryParam}`;
  const history = useHistory();
  const location = useLocation();

  const handleOnClick = () => {
    history.push(`/`);
  };
  const handleRouteChange = (border) => {
    history.push(`/country/${border}`);
  };

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setCountry(response.data);
    });
  }, [location, fetchUrl]);

  const c = country;

  if (c) {
    return (
      <div
        className={isDarkMode ? "countryDetails darkMode" : "countryDetails"}
      >
        <div onClick={handleOnClick} className="btnContainer">
          <div className={isDarkMode ? "btn darkMode" : "btn"}>
            <i>
              <BsArrowLeft />
            </i>
            <div className="btnInner">Back</div>
          </div>
        </div>

        <div className="detailsContainer">
          <div className="leftContainer">
            <div className="imgContainer">
              <img src={c.flag} alt="" />
            </div>
          </div>
          <div className="rightContainer">
            <h1>{c.name}</h1>
            <div className="sections">
              <div className="leftSection">
                <p>
                  Native name : <span>{c.name}</span>
                </p>
                <p>
                  Population : <span>{c.population.toLocaleString()}</span>
                </p>
                <p>
                  Region : <span>{c.region}</span>
                </p>
                <p>
                  Sub region : <span>{c.subregion}</span>
                </p>
                <p>
                  Capital : <span>{c.capital}</span>
                </p>
              </div>
              <div className="rightSection">
                <p>
                  Top Level Domain : <span>{c.topLevelDomain[0]}</span>
                </p>
                <p>
                  Currencies :{" "}
                  <span>
                    {" "}
                    {c.currencies.map(
                      (currency) => `${currency.name} (${currency.code})  `
                    )}
                  </span>
                </p>
                <p>
                  Languages :{" "}
                  <span>
                    {c.languages.map((language) => `${language.name}  `)}
                  </span>
                </p>
              </div>
            </div>
            <div className="borderContainer">
              <p>Border Countries :</p>
              <ul>
                {c.borders.map((border) => (
                  <div
                    key={border}
                    onClick={() => handleRouteChange(border)}
                    className={isDarkMode ? "btn darkMode" : "btn"}
                  >
                    {border}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className={isDarkMode ? "loader darkMode" : "loader"}></div>;
  }
}
