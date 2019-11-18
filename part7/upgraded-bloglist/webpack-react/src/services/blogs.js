import axios from 'axios';
const baseUrl = `${BACKEND_URL}/api/blogs`;

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

const update = async (updateBlog, id) => {
  const res = await axios.put(`${baseUrl}/${id}`, updateBlog, {
    headers: { Authorization: token }
  });
  return res.data;
};

const deleteBlog = async id => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token }
  });
};

export default { getAll, setToken, create, update, deleteBlog };
