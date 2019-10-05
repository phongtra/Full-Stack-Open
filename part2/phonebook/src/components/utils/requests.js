import axios from 'axios';
const baseURL = 'http://localhost:3001/people';

const getAll = async () => {
  try {
    const res = await axios.get(baseURL);
    return res.data;
  } catch (e) {
    console.log('fail');
  }
};

const create = async newObject => {
  try {
    const res = await axios.post(baseURL, newObject);
    return res.data;
  } catch (e) {
    console.log('fail');
  }
};

const update = async (id, newObject) => {
  const res = await axios.put(`${baseURL}/${id}`, newObject);
  return res.data;
};

const remove = async id => {
  try {
    await axios.delete(`${baseURL}/${id}`);
  } catch (e) {
    console.log('fail');
  }
};

export default { getAll, create, update, remove };
