import api from './index';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  bio?: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

interface PasswordChangeData {
  currentPassword: string; 
  newPassword: string;
}

interface ProfileUpdateData {
  name?: string;
  bio?: string;
  avatar?: string;
}

// 用戶相關API
const usersApi = {
  // 獲取當前用戶資料
  getProfile: () => 
    api.get<{data: UserProfile}>('/users/profile'),
  
  // 更新用戶資料
  updateProfile: (data: ProfileUpdateData) => 
    api.put<{data: UserProfile}>('/users/profile', data),
  
  // 更改密碼
  changePassword: (data: PasswordChangeData) => 
    api.put('/users/change-password', data),
    
  // 獲取用戶積分歷史
  getPointsHistory: () => 
    api.get('/users/points-history'),
};

export default usersApi; 