import axios from "axios";
import * as process from "process";

const axiosInstance = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BACKEND_URL"],
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
//todo 401 interceptor

export default axiosInstance;
