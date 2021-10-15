import React, { useEffect, useState } from "react";
import "./Countrydetails.scss";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import BorderCountries from "./BorderCountries";
import Map from "./Map";
import { useTheme } from "../styles/ThemeContext";

export default function CountryDetails({ match }) {
  const [country, setCountry] = useState("");
  const countryParam = match.params.id;
  const fetchUrl = `
  https://restcountries.com/v2/alpha/${countryParam}`;
  const history = useHistory();
  const location = useLocation();
  const isDarkMode = useTheme();

  const handleOnClick = () => {
    history.push(`/`);
  };

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setCountry(response.data);
      window.scrollTo(0, 0);
    });
  }, [location, fetchUrl]);

  const c = country;

  if (c) {
    return (
      <div className={isDarkMode ? "countryDetails darkMode" : "countryDetails"}>
        <div className='btnContainer'>
          <div onClick={handleOnClick} className={isDarkMode ? "btn darkMode" : "btn"}>
            <i>
              <BsArrowLeft />
            </i>
            <div className='btnInner'>Back</div>
          </div>
        </div>

        <div className='detailsContainer'>
          <div className='leftContainer'>
            <div className='imgContainer'>
              <img src={c.flag} alt='' />
            </div>
          </div>
          <div className='rightContainer'>
            <h1>{c.name}</h1>
            <div className='sections'>
              <div className='leftSection'>
                <p>
                  Native name : <span>{c.nativeName}</span>
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
              <div className='rightSection'>
                <p>
                  Top Level Domain : <span>{c.topLevelDomain[0]}</span>
                </p>
                <p>
                  Currencies : <span> {c.currencies.map((currency) => `${currency.name} (${currency.code})  `)}</span>
                </p>
                <p>
                  Languages : <span>{c.languages.map((language) => `${language.name}  `)}</span>
                </p>
              </div>
            </div>
            <div className='borderContainer'>
              <p>Border Countries :</p>
              <ul>
                {c.borders.map((border) => (
                  <BorderCountries border={border} key={border}></BorderCountries>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Map country={c} />
      </div>
    );
  } else {
    return <div className={isDarkMode ? "loader darkMode" : "loader"}></div>;
  }
}
