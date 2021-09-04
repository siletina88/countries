import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../src/styles/main.scss";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import Navbar from "./components/Navbar";

function App() {
  const themeStorage = JSON.parse(localStorage.getItem("theme"));

  const [isDarkMode, setIsDarkMode] = useState(
    themeStorage ? themeStorage : false
  );

  useEffect(() => {
    localStorage.setItem("theme", Boolean(isDarkMode));
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div className="container">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <CountriesList
                {...props}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            )}
          />
          <Route
            path="/country/:id"
            render={(props) => (
              <CountryDetails
                {...props}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
