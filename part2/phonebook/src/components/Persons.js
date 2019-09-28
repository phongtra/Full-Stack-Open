import React from 'react';

import Person from './Person';

const Persons = ({ renderFilter }) => {
  return (
    <>
      <ul>
        {renderFilter().map(result => {
          return <Person result={result} />;
        })}
      </ul>
    </>
  );
};

export default Persons;
