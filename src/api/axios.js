import axios from "axios";
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${window.accessToken}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + window.accessToken;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
