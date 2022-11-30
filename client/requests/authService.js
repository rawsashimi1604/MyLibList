import axios from "axios";

// TODO
// Add auth service into requests and backend...

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Get access token from local storage
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

    // Do something before request is sent
    config.headers.Authorization = `Bearer ${accessToken}`;
    // OR config.headers.common['Authorization'] = `Bearer ${your_token}`;
    config.baseURL = `http://localhost:8085/api/`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
