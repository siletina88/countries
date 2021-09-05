import React, { useEffect, useState } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import "./BorderCountries.scss";

export default function BorderCountries({ border, isDarkMode }) {
  const [bolid, setBolid] = useState("");
  const history = useHistory();

  const handleRouteChange = (border) => {
    history.push(`/country/${border}`);
  };

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/alpha/${border}`)
      .then((response) => {
        setBolid(response.data);
      });
  }, [border]);

  return (
    <li
      onClick={() => handleRouteChange(border)}
      className={isDarkMode ? "btn2 darkMode" : "btn2"}
    >
      {bolid.name}
    </li>
  );
}
