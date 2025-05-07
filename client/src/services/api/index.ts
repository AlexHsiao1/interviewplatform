// @ts-ignore - 忽略axios相關警告
import axios from 'axios';

// 根據環境設置API基礎URL
// 在本地環境使用localhost，在生產環境使用部署的後端API地址
const apiBaseUrl = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : 'https://interview-platform-api.onrender.com/api';

console.log('API基礎URL:', apiBaseUrl);
console.log('當前環境:', window.location.hostname);

// 創建API請求實例
// @ts-ignore - 忽略create方法的類型檢查
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  // 在本地開發環境關閉withCredentials，因為我們使用的是不同端口的服務
  // 在生產環境中，通過Nginx代理時不需要withCredentials
  withCredentials: false,
});

// 添加請求攔截器設置令牌
api.interceptors.request.use(
  (config: any) => {
    console.log('請求URL:', `${config.baseURL}${config.url}`);
    console.log('請求方法:', config.method);
    console.log('請求頭:', config.headers);
    console.log('請求數據:', config.data);
    
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
  (response: any) => {
    console.log('收到響應:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error: any) => {
    console.error('API錯誤詳情:', {
      message: error.message,
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      },
      request: error.request ? '請求已發送但無響應' : '請求未發送'
    });
    
    // 處理令牌過期
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 获取API基础URL的辅助方法（用于调试）
// @ts-ignore - 忽略getBaseUrl方法的类型检查
api.getBaseUrl = () => apiBaseUrl;

export default api; 