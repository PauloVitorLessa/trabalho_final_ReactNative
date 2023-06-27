import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://apilivraria-production.up.railway.app/api",
});

export default AxiosInstance;
