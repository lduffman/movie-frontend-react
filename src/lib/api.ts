import axios from "axios";
import { env } from "@/lib/env";
import { clearToken, getToken } from "@/lib/token";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Sur 401, on supprime le jeton stocké. L'utilisateur sera redirigé vers la page de login */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(error);
  },
);
