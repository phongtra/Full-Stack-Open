import React, { useState, useEffect } from 'react';
import request from './components/utils/requests';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import Error from './components/Error';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [submit, setSubmit] = useState(false);
  const [added, setAdded] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const peopleRes = await request.getAll();
      setPeople(peopleRes);
    };
    fetchData();
  }, [submit]);
  const onSubmit = async e => {
    e.preventDefault();
    let existingNumber = people.find(person => person.name === newName);
    if (existingNumber) {
      const confirm = window.confirm(
        `${newName} has already been added to the phonebook, replace the old number with new one?`
      );
      if (confirm) {
        try {
          const newUser = await request.update(existingNumber.id, {
            ...existingNumber,
            number: newNumber
          });

          return setPeople(
            people.map(person =>
              person.id !== existingNumber.id ? person : newUser
            )
          );
        } catch (e) {
          setErrorMessage(
            `Information of '${existingNumber.name}' was already removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          return setSubmit(!submit);
        }
      }
    }
    await request.create({ name: newName, number: newNumber });
    setNewName('');
    setNewNumber('');
    setSubmit(!submit);
    setAdded(`Added ${newName} to the phonebook`);
    return setTimeout(() => {
      setAdded(null);
    }, 5000);
  };
  const renderFilter = () => {
    if (!filter) {
      return people;
    }
    return people.filter(person => person.name.indexOf(filter) > -1);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Notification message={added} />
      <Error message={errorMessage} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={onSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        renderFilter={renderFilter}
        remove={request.remove}
        setPeople={setPeople}
        people={people}
      />
    </div>
  );
};

export default App;
