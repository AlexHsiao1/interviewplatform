import api from './index';

interface InterviewsParams {
  page?: number; 
  limit?: number; 
  query?: string; 
  filters?: Record<string, any>;
}

interface InterviewData {
  company: string;
  position: string;
  date: string;
  experience: string;
  rating: number;
  location?: string;
  salary?: number;
  questions?: string[];
  tips?: string;
  [key: string]: any;
}

// 面試相關API
const interviewsApi = {
  // 獲取面試列表
  getInterviews: (params: InterviewsParams = {}) => 
    api.get('/interviews', { params }),
  
  // 獲取面試詳情
  getInterviewById: (id: string) => 
    api.get(`/interviews/${id}`),
  
  // 創建面試經驗
  createInterview: (data: InterviewData) => 
    api.post('/interviews', data),
  
  // 更新面試經驗
  updateInterview: (id: string, data: Partial<InterviewData>) => 
    api.put(`/interviews/${id}`, data),
  
  // 刪除面試經驗
  deleteInterview: (id: string) => 
    api.delete(`/interviews/${id}`),
  
  // 搜索面試經驗
  searchInterviews: (params: {query: string; filters?: Record<string, any>}) => 
    api.get('/interviews/search', { params }),
};

export default interviewsApi; 