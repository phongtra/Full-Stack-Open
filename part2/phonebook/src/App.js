import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3001/persons');
      console.log(res.data);
      setPersons(res.data);
    };
    fetchData();
  }, [submit]);

  const renderFilter = () => {
    if (!filter) {
      return persons;
    }
    return persons.filter(person => person.name.indexOf(filter) > -1);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        submit={submit}
        setSubmit={setSubmit}
      />
      <h2>Numbers</h2>
      <Persons renderFilter={renderFilter} />
    </div>
  );
};

export default App;
