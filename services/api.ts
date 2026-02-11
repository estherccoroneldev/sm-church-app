// import axios, { AxiosError, AxiosInstance } from 'axios';
// import * as SecureStore from 'expo-secure-store';

// // Create axios instance
// const api: AxiosInstance = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   async (config) => {
//     const token = await SecureStore.getItemAsync('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.defaults.timeout = 30000;

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response) {
//       // Handle different error status codes
//       switch (error.response.status) {
//         case 401:
//           // TO DO: Handle unauthorized - Redirect to login
//           console.error('Unauthorized access');
//           break;
//         case 404:
//           console.error('Resource not found');
//           break;
//         case 500:
//           console.error('Server error');
//           break;
//         default:
//           console.error('An error occurred');
//       }
//     } else if (error.request) {
//       // Network error
//       console.error('Network error');
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
