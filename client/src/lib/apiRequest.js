import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://react-real-estate-o5wr.vercel.app/',
  withCredentials: true,
});

export default apiRequest;
