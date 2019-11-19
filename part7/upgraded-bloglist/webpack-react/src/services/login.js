import axios from 'axios';
const baseUrl = `${BACKEND_URL}/api/users/login`;

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getUsers = async () => {
  const res = await axios.get(`${BACKEND_URL}/api/users`);
  return res.data;
};

export default { login, getUsers };
