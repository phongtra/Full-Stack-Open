import React from 'react';

import Person from './Person';

const Persons = ({ renderFilter, remove, people, setPeople }) => {
  return (
    <>
      <ul>
        {renderFilter().map(result => {
          return (
            <Person
              key={result.id}
              result={result}
              remove={remove}
              people={people}
              setPeople={setPeople}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Persons;
