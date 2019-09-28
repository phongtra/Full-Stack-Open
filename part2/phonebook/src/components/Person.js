import React from 'react';

const Person = ({ result }) => {
  return (
    <>
      <li key={result.name}>
        {result.name} {result.number}
      </li>
    </>
  );
};

export default Person;
