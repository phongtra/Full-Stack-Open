import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
