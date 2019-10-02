import React from 'react';

import { renderCountries } from './renderCountries';

const Contents = ({ countries, setText, setOneCountry, weather }) => {
  return (
    <div>{renderCountries(countries, setText, setOneCountry, weather)}</div>
  );
};

export default Contents;
