import axios from "axios";
import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;
const Weather = ({ weather, countryName }) => {
  if (!weather.main) return <div>loading</div>;
  const iconSrc = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <>
      <h2>Weather In {countryName}</h2>
      <div>temperature {weather.main.temp} Celsius</div>
      <img src={iconSrc} alt="weather icon" />
      <div>Wind {weather.wind.speed} m/s</div>
    </>
  );
};

const Country = ({ country, weather }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>{country.capital}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => {
          return <li key={lang}>{lang}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <Weather countryName={country.name.common} weather={weather} />
    </>
  );
};

const Countries = ({ countries, searchBar }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState({});
  const link = "https://api.openweathermap.org";
  useEffect(() => {
    setSelectedCountry(null);
  }, [searchBar]);

  useEffect(() => {
    if (!selectedCountry) return;
    const [lat, lon] = selectedCountry.capitalInfo.latlng;
    axios
      .get(
        `${link}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      .then((e) => setWeather(e.data));
  }, [selectedCountry]);

  const CurrentSearchedItems = countries.filter((country) => {
    if (!country.name.common) return;
    return country.name.common.toLowerCase().includes(searchBar.toLowerCase());
  });
  if (selectedCountry) {
    return <Country country={selectedCountry} weather={weather} />;
  }

  if (searchBar.length === 0)
    return (
      <>
        <div>Please Search something</div>
      </>
    );
  if (CurrentSearchedItems.length === 0)
    return (
      <>
        <div>No results</div>
      </>
    );
  if (CurrentSearchedItems.length === 1) {
    const country = CurrentSearchedItems[0];
    return setSelectedCountry(country);
  }
  if (CurrentSearchedItems.length > 10)
    return (
      <>
        <div>Too many matches, specify another filter</div>
      </>
    );
  if (CurrentSearchedItems.length < 10)
    return (
      <>
        <ul>
          {CurrentSearchedItems.map((country) => {
            return (
              <li key={country.name.common}>
                {country.name.common}{" "}
                <button onClick={() => setSelectedCountry(country)}>
                  Show
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
};

export default Countries;
