import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response)=> response,(error)=> {
    if (error.message && error.response.status === 401){
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
)

export default api;