import React from 'react';
import { newAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteForm = ({ store }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    store.dispatch(newAnecdote(content));
    store.dispatch(setNotification(`you have created ${content}`));
    setTimeout(() => store.dispatch(removeNotification()), 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
