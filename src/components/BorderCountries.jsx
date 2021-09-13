import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";

import axios from "axios";
import { useHistory } from "react-router-dom";
import "./BorderCountries.scss";

export default function BorderCountries({ border }) {
  const [bolid, setBolid] = useState("");
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
