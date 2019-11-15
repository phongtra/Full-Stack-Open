import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAnecdotes } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = props => {
  useEffect(() => {
    props.fetchAnecdotes();
  });
  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default connect(null, { fetchAnecdotes })(App);
