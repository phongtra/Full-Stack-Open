import React from 'react';

const Total = ({ total }) => {
  let sum = 0;
  total.forEach(el => (sum += el.exercises));
  return <p>Number of exercises {sum}</p>;
};

export default Total;
