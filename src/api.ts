import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
