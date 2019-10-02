import React from 'react';

export const renderCountries = (countries, setText, setOneCountry, weather) => {
  if (countries.length > 10) {
    setOneCountry(false);
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length > 1 && countries.length < 10) {
    setOneCountry(false);
    return (
      <ul>
        {countries.map(country => {
          return (
            <div key={country.numericCode}>
              <li>{country.name}</li>
              <button
                onClick={() => {
                  setText(country.name);
                }}
              >
                show
              </button>
            </div>
          );
        })}
      </ul>
    );
  }
  if (countries.length === 0) {
    setOneCountry(false);
    return <div>Not found</div>;
  }
  setOneCountry(true);
  if (Object.keys(weather).length > 0) {
    return (
      <>
        <h1>{countries[0].name}</h1>
        <p>capital {countries[0].capital}</p>
        <p>population {countries[0].population}</p>
        <p>languages</p>
        <ul>
          {countries[0].languages.map(language => {
            return <li key={language.name}>{language.name}</li>;
          })}
        </ul>
        <img width="200px" height="200px" src={countries[0].flag} alt="flag" />
        <h3>Weather in {weather.location.name}</h3>
        <p>
          <b>temperature</b>: {weather.current.temperature} Celsius
        </p>
        <img src={weather.current.weather_icons[0]} alt="weather icon" />
        <p>
          <b>wind: </b>
          {weather.current.wind_speed} kph {weather.current.wind_dir}
        </p>
      </>
    );
  }
};
