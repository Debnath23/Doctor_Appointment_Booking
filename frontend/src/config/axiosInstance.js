import axios from "axios";

const BASE_URI = import.meta.env.REACT_APP_BASE_URI || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URI,
  withCredentials: true
});

export default axiosInstance;
