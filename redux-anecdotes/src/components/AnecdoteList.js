import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
  const anecdotes = [...store.getState().anecdote]
    .sort((a, b) => b.votes - a.votes)
    .filter(
      anecdote =>
        anecdote.content.toLowerCase().indexOf(store.getState().filter) > -1
    );

  const vote = (id, content) => {
    store.dispatch(addVote(id));
    store.dispatch(setNotification(`you have voted ${content}`));
    setTimeout(() => store.dispatch(removeNotification()), 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
