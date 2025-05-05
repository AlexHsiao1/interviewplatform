// 用戶相關類型
export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

// 積分歷史記錄類型
export interface PointsHistory {
  id: string;
  userId: string;
  amount: number;
  action: 'earned' | 'spent';
  description: string;
  createdAt: string;
}

// 面試經驗類型
export interface Interview {
  id: string;
  title: string;
  company: Company;
  position: string;
  industry: string;
  location: string;
  date: string;
  process: string;
  questions: string;
  experience: string;
  tips: string;
  rating: number;
  difficulty: number;
  result: 'offer' | 'rejected' | 'pending' | 'withdraw';
  isAnonymous: boolean;
  status: 'pending' | 'approved' | 'rejected';
  viewCount: number;
  cost: number; // 查看該面試經驗需要的積分
  user?: {
    id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 公司類型
export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  description?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

// 分頁響應類型
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

// 搜索過濾器類型
export interface SearchFilters {
  industry?: string[];
  position?: string[];
  location?: string[];
  rating?: number;
  difficulty?: number;
  result?: ('offer' | 'rejected' | 'pending' | 'withdraw')[];
  dateRange?: {
    start: string;
    end: string;
  };
}

// 搜索請求參數類型
export interface SearchParams {
  query?: string;
  filters?: SearchFilters;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// API錯誤響應類型
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
} 