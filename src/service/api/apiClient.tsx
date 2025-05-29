import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Envoie les cookies avec chaque requête
});

let isRefreshing = false;
let failedQueue: { resolve: Function; reject: Function }[] = [];

const processQueue = (error: any, tokenRefreshed: boolean) => {
  failedQueue.forEach(prom => {
    if (tokenRefreshed) {
      prom.resolve();
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Si la requête échoue avec un 401 (et qu’on n’a pas déjà essayé de refresh)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // On met la requête en attente
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve: () => resolve(apiClient(originalRequest)), reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.get('/token/refresh'); // Le backend renvoie un nouveau bearerToken
        processQueue(null, true);
        return apiClient(originalRequest); // Rejoue la requête originale
      } catch (refreshError) {
        processQueue(refreshError, false);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
