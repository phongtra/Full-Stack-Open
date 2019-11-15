import React from 'react';
import { connect } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteForm = ({ newAnecdote, setNotification, removeNotification }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    newAnecdote(content);
    setNotification(`you have created ${content}`);
    setTimeout(() => removeNotification(), 5000);
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

export default connect(null, {
  newAnecdote,
  setNotification,
  removeNotification
})(AnecdoteForm);
