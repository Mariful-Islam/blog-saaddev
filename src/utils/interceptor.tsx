import axios from 'axios';

export const API_URL =  import.meta.env ? "http://127.0.0.1:8000/" : "https://saaddev.pythonanywhere.com"

const useInterceptor = () => {
    // Create a new axios instance
    const axiosInstance = axios.create({
        baseURL: API_URL,
        timeout: 10000, // Adjust as per your needs
        headers: {
            'Content-Type': 'application/json',
            // Add other headers if needed
        },
    });

    // Request interceptor for adding headers or other configurations
    axiosInstance.interceptors.request.use(async (config) => {
        // Modify config as needed, such as adding headers
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Response interceptor for handling responses or errors
    axiosInstance.interceptors.response.use(async (response) => {
        // Handle response data
        return response;
    },
        async (error) => {
            // Handle response errors
            return Promise.reject(error);
        }
    );
    return axiosInstance
}

export default useInterceptor;
