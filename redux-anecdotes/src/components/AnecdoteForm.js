import React from 'react';
import { newAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ store }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    store.dispatch(newAnecdote(content));
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
