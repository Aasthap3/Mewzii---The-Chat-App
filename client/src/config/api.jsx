import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4500", // Back to original port
  withCredentials: true,
});

export default axiosInstance;
