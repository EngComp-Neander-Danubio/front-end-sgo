import axios from "axios";

/* console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("API URL:", process.env.VITE_API_URL); */

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

export default api;
