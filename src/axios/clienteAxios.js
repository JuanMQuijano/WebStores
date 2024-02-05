import axios from "axios";

export const clienteAxio = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
