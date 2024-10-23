import axios from 'axios';
import { cookies } from 'next/headers';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You may want to handle specific error responses here
    return Promise.reject(error);
  }
);

export default axiosInstance;
