import axios from "axios";

const getAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { getAPI };
