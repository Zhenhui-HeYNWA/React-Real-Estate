import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://react-real-estate.onrender.com',
  withCredentials: true,
});

export default apiRequest;
