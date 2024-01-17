import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const authClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export { apiClient, authClient };
