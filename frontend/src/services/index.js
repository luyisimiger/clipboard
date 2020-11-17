import axios from "axios";

/* create axios instance */
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

/* config axios instance */
api.interceptors.request.use(
  config => {
    return config;
  },

  function(error) {
    return Promise.reject(error);
  }
);

export default api;
