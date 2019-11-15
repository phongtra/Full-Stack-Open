import React from 'react';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer';

const AnecdoteList = ({
  anecdotes,
  addVote,
  setNotification,
  removeNotification
}) => {
  const vote = (id, content) => {
    addVote(id);
    setNotification(`you have voted ${content}`);
    setTimeout(() => removeNotification(), 5000);
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
const anecdotesList = ({ anecdotes, filter }) =>
  [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.toLowerCase().indexOf(filter) > -1);

const mapStateToProps = state => {
  return {
    anecdotes: anecdotesList(state),
    filter: state.filter
  };
};
export default connect(mapStateToProps, {
  setNotification,
  removeNotification,
  addVote
})(AnecdoteList);
