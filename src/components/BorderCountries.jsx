import React, { useEffect, useState } from "react";
import { useTheme } from "../styles/ThemeContext";

import axios from "axios";
import { useHistory } from "react-router-dom";
import "./BorderCountries.scss";

export default function BorderCountries({ border }) {
  const [borderCountry, setBorderCountry] = useState("");
  const history = useHistory();
  const isDarkMode = useTheme();

  const handleRouteChange = (border) => {
    history.push(`/country/${border}`);
  };

  // const {data, loading, error } = useQuery({
  //   url: `https://restcountries.eu/rest/v2/alpha/${border}`,
  //   onError: () => toast.error('Something bad happened'),
  //   onSuccess: () => toast.success('Some message')
  // });

  // const borderCountries = useBorderCountries();

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/alpha/${border}`).then((response) => {
      setBorderCountry(response.data);
    });
  }, [border]);

  return (
    <li onClick={() => handleRouteChange(border)} className={isDarkMode ? "btn2 darkMode" : "btn2"}>
      {borderCountry.name}
    </li>
  );
}
