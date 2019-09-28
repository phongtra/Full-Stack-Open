import React from 'react';
import axios from 'axios';

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  submit,
  setSubmit
}) => {
  return (
    <>
      <form
        onSubmit={async e => {
          e.preventDefault();
          let existingNumber = persons.find(person => person.name === newName);
          if (existingNumber) {
            return alert(`${newName} has already been added to phone book`);
          }

          await axios.post('http://localhost:3001/persons', {
            name: newName,
            number: newNumber
          });
          setNewName('');
          setNewNumber('');
          setSubmit(!submit);
        }}
      >
        <div>
          name:{' '}
          <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          number:{' '}
          <input
            value={newNumber}
            onChange={e => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
