import axios from 'axios';

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 使用环境变量
  withCredentials: true,
});

export default apiRequest;
