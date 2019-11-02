import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async newBlogs => {
  const res = await axios.post(baseUrl, newBlogs, {
    headers: { Authorization: token }
  });
  return res.data;
};

export default { getAll, setToken, create };
