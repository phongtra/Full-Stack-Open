import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const renderFilter = () => {
    if (!filter) {
      return persons;
    }
    return persons.filter(person => person.name.indexOf(filter) > -1);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with{' '}
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <h3>add a new</h3>
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
        {renderFilter().map(result => {
          return (
            <li key={result.name}>
              {result.name} {result.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
