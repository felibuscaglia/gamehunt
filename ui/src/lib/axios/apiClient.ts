import axios, { AxiosError } from "axios";
import { UNEXPECTED_ERROR_MSG } from "lib/constants";
import toast from "react-hot-toast";

const errorHandler = ({ response }: AxiosError<{ errors: any }>) => {
  return response?.data?.errors
    ? Promise.reject(response?.data?.errors)
    : toast.error(UNEXPECTED_ERROR_MSG);
};

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

const authClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(null, errorHandler);
authClient.interceptors.response.use(null, errorHandler);

export { apiClient, authClient };
