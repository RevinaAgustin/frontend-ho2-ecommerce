import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sistech-ecommerce-api.leficullen.xyz/api',
});

export default axiosInstance;