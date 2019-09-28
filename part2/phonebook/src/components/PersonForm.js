import React from 'react';

const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber
}) => {
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          let existingNumber = persons.find(person => person.name === newName);
          if (existingNumber) {
            return alert(`${newName} has already been added to phone book`);
          }
          setPersons(persons.concat({ name: newName, number: newNumber }));
          setNewName('');
          setNewNumber('');
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
