import axios, { AxiosError } from "axios";
import { UNEXPECTED_ERROR_MSG } from "lib/constants";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const authClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export { apiClient, authClient };
