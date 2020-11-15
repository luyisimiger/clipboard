import axios from "axios";
// import { auth_token } from "@/util/functions";

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
    // config.headers["Authorization"] = "Bearer " + auth_token();
    return config;
  },

  function(error) {
    return Promise.reject(error);
  }
);

export default api;
