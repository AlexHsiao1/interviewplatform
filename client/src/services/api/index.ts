// @ts-ignore - 忽略axios相關警告
import axios from 'axios';

// 根據環境設置API基礎URL
const apiBaseUrl = '/api';

// 創建API請求實例
// @ts-ignore - 忽略create方法的類型檢查
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加請求攔截器設置令牌
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// 添加響應攔截器處理錯誤
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    // 處理令牌過期
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 