import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content, id) => {
  const res = await axios.post(baseUrl, { content, id, votes: 0 });
  return res.data;
};

const updateVotes = async (id, votes) => {
  const res = await axios.patch(`${baseUrl}/${id}`, { votes });
  return res.data;
};

export default { getAll, createAnecdote, updateVotes };
