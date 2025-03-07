
import axios from 'axios';
import { API_BASE_URL } from './app/utlis';


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log(token,"token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    const originalRequest = error.config;

    // Handle unauthorized error (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
  
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(refreshToken,"refreshtoken>>>>>>>>>>>>>>>>>>>>>")
        if (!refreshToken) {
          console.error('Refresh token missing. Redirecting to login.');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_BASE_URL}/admins/refresh`, {
          refreshToken,
        });

        // Save new tokens
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        // Retry the failed request
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError.message);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle server error (500)
    if (error.response?.status === 500) {
      console.error('Server Error:', error.response.data?.message || 'An internal server error occurred.');
      alert('Something went wrong on the server. Please try again later.');
    }

    // Handle other errors
    const status = error.response?.status;
    if (status && status !== 401 && status !== 500) {
      console.error(`HTTP ${status}:`, error.response.data?.message || 'An error occurred.');
      alert(error.response.data?.message || `An error occurred: ${status}`);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
// import axios from 'axios';
// import Cookies from 'js-cookie'; // Ensure js-cookie is installed
// import { API_BASE_URL } from './src/app/utils'; // Make sure this path is correct

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 1000, // Adjust timeout as needed
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// const subdomain = Cookies.get("subdomain")
// // Debugging: Check API Base URL
// console.log('API_BASE_URL:', API_BASE_URL);

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     console.log('Access Token (Request):', token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error.message);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response, // Return response if successful
//   async (error) => {
//     const originalRequest = error.config;
//     console.error('Error Response:', error.response);

//     // Handle unauthorized error (401)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent infinite retry loops
   

//       // if (!subdomain) {
//         console.error('Subdomain cookie is missing. Redirecting to login.');
//         window.location.href = `/login`;
//         return Promise.reject(error);
//       }

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         console.log('Refresh Token:', refreshToken);

//         if (!refreshToken) {
//           console.error('Refresh token missing. Redirecting to login.');
//           window.location.href = `/login`;
//           return Promise.reject(error);
//         }

//         // Refresh the token
//         const response = await axios.post(`${API_BASE_URL}/admins/refresh`, {
//           refreshToken,
//         });

//         console.log('Refresh Token Response:', response.data);

//         // Save new tokens
//         localStorage.setItem('accessToken', response.data.accessToken);
//         localStorage.setItem('refreshToken', response.data.refreshToken);

//         // Retry the failed request with the new token
//         originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError.message);
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle server error (500)
//     if (error.response?.status === 500) {
//       console.error('Server Error:', error.response.data?.message || 'An internal server error occurred.');
//       alert('Something went wrong on the server. Please try again later.');
//     }

//     // Handle other errors
//     const status = error.response?.status;
//     if (status && status !== 401 && status !== 500) {
//       console.error(`HTTP ${status}:`, error.response.data?.message || 'An error occurred.');
//       alert(error.response.data?.message || `An error occurred: ${status}`);
//     }

//     return Promise.reject(error);
//   }
// );

// // Test endpoint for debugging (optional)

// axiosInstance.get(`/user/${subdomain}`)
//   .then((response) => console.log('Test Endpoint Success:', response.data))
//   .catch((error) => console.error('Test Endpoint Error:', error));

// export default axiosInstance;

