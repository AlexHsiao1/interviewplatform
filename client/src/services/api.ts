import axios from 'axios';

// 根據環境設置API基礎URL
const apiBaseUrl = '/api';

// 創建API請求實例
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加請求攔截器設置令牌
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 添加響應攔截器處理錯誤
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 處理令牌過期
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 面試相關API
export const interviewsApi = {
  // 獲取面試列表
  getInterviews: (params: { page?: number; limit?: number; query?: string; filters?: any }) => 
    api.get('/interviews', { params }),
  
  // 獲取面試詳情
  getInterviewById: (id: string) => api.get(`/interviews/${id}`),
  
  // 創建面試經驗
  createInterview: (data: any) => api.post('/interviews', data),
  
  // 更新面試經驗
  updateInterview: (id: string, data: any) => api.put(`/interviews/${id}`, data),
  
  // 刪除面試經驗
  deleteInterview: (id: string) => api.delete(`/interviews/${id}`),
  
  // 搜索面試經驗
  searchInterviews: (params: { query: string; filters?: any }) => 
    api.get('/interviews/search', { params }),
};

// 用戶相關API
export const usersApi = {
  // 獲取當前用戶資料
  getProfile: () => api.get('/users/profile'),
  
  // 更新用戶資料
  updateProfile: (data: any) => api.put('/users/profile', data),
  
  // 更改密碼
  changePassword: (data: { currentPassword: string; newPassword: string }) => 
    api.put('/users/change-password', data),
    
  // 獲取用戶積分歷史
  getPointsHistory: () => api.get('/users/points-history'),
};

// 公司相關API
export const companiesApi = {
  // 獲取公司列表
  getCompanies: (params: { page?: number; limit?: number; query?: string }) => 
    api.get('/companies', { params }),
  
  // 獲取公司詳情
  getCompanyById: (id: string) => api.get(`/companies/${id}`),
  
  // 搜索公司
  searchCompanies: (query: string) => api.get('/companies/search', { params: { query } }),
};

// 行業和職位相關API
export const categoriesApi = {
  // 獲取行業列表
  getIndustries: () => api.get('/categories/industries'),
  
  // 獲取職位類型列表
  getPositions: () => api.get('/categories/positions'),
  
  // 獲取地區列表
  getLocations: () => api.get('/categories/locations'),
};

// 管理員相關API
export const adminApi = {
  // 獲取待審核的面試經驗
  getPendingInterviews: (params: { page?: number; limit?: number }) => 
    api.get('/admin/pending-interviews', { params }),
  
  // 審核面試經驗
  reviewInterview: (id: string, data: { status: 'approved' | 'rejected'; feedback?: string }) => 
    api.put(`/admin/interviews/${id}/review`, data),
  
  // 獲取用戶列表
  getUsers: (params: { page?: number; limit?: number; query?: string }) => 
    api.get('/admin/users', { params }),
  
  // 更新用戶角色
  updateUserRole: (id: string, role: 'user' | 'admin') => 
    api.put(`/admin/users/${id}/role`, { role }),
};

export default api; 