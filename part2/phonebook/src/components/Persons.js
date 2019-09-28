import React from 'react';

import Person from './Person';

const Persons = ({ renderFilter }) => {
  return (
    <>
      <ul>
        {renderFilter().map(result => {
          return <Person key={result.id} result={result} />;
        })}
      </ul>
    </>
  );
};

export default Persons;
