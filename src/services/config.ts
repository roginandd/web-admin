import axios from "axios";
import { useAuthStore } from "../stores/auth_store";

export const BASE_URL = `http://192.168.1.5:5126/api`;

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    console.log("TOKEN CHECK:", token, "for URL:", config.url);

    const requestUrl = config.url?.toLowerCase() || "";

    const publicEndpoints = ["/authentication"]; // 👈 Use lowercase!

    const isPublic = publicEndpoints.some((endpoint) =>
      requestUrl.startsWith(endpoint)
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
  // ... error handler
);
