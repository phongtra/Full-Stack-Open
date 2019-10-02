import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Contents from './components/Contents';

const App = () => {
  const [text, setText] = useState('');
  const [oneCountry, setOneCountry] = useState(false);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const fetchCountries = async () => {
      if (!text) {
        return;
      }
      const res = await axios.get(
        `https://restcountries.eu/rest/v2/name/${text}`
      );
      setCountries(res.data);
    };
    fetchCountries();
  }, [text]);
  useEffect(() => {
    const fetchWeather = async () => {
      if (!oneCountry) {
        return;
      }
      const res = await axios.get('http://api.weatherstack.com/current', {
        params: {
          access_key: '8dac8c609ddd8311c407d756327af6d6',
          query: countries[0].capital
        }
      });
      setWeather(res.data);
    };
    fetchWeather();
  }, [oneCountry, countries]);
  const onChange = async event => {
    event.preventDefault();
    setText(event.target.value);
  };

  return (
    <div>
      <Search text={text} setText={setText} onChange={onChange} />
      <Contents
        setOneCountry={setOneCountry}
        countries={countries}
        setText={setText}
        weather={weather}
      />
    </div>
  );
};

export default App;
