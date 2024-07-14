import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://react-real-estate.onrender.com/api',
  withCredentials: true,
});

export default apiRequest;
