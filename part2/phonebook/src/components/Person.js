import React from 'react';

const Person = ({ result, remove, people, setPeople }) => {
  return (
    <>
      <li>
        {result.name} {result.number}
        <button
          onClick={() => {
            const confirm = window.confirm(`Delete ${result.name}`);
            if (confirm) {
              remove(result.id);
              setPeople(people.filter(person => person.id !== result.id));
            } else {
              return;
            }
          }}
        >
          delete
        </button>
      </li>
    </>
  );
};

export default Person;
