import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

export const fetchAnecdotes = () => async dispatch => {
  const res = await anecdoteService.getAll();
  return dispatch({ type: 'FETCH_ANECDOTES', data: res });
};

export const addVote = id => async (dispatch, getState) => {
  const votes =
    getState().anecdotes.find(anecdote => anecdote.id === id).votes + 1;
  const res = await anecdoteService.updateVotes(id, votes);
  return dispatch({ type: 'VOTE', data: res });
};

export const newAnecdote = content => async dispatch => {
  const res = await anecdoteService.createAnecdote(content, getId());
  return dispatch({ type: 'NEW_ANECDOTE', data: res });
};

const reducer = (state = [], action) => {
  console.log(action.type);
  switch (action.type) {
    case 'FETCH_ANECDOTES':
      return action.data;
    case 'VOTE':
      return state.map(anecdote => {
        return anecdote.id === action.data.id ? action.data : anecdote;
      });
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export default reducer;
