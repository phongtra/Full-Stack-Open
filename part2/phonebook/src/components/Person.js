import React from 'react';

const Person = ({ result }) => {
  return (
    <>
      <li>
        {result.name} {result.number}
      </li>
    </>
  );
};

export default Person;
