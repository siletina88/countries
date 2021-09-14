import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "../src/styles/ThemeContext";
import "../src/styles/main.scss";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path="/" component={CountriesList} />
            <Route path="/country/:id" component={CountryDetails} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
