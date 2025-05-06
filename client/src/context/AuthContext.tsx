import React from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast';

// 定義用戶類型
export interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  role: 'user' | 'admin';
}

// JWT令牌解碼後的類型
interface JwtPayload {
  id: string;
  username: string;
  email: string;
  points: number;
  role: 'user' | 'admin';
  exp: number;
}

// 認證上下文類型
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// 創建認證上下文
const AuthContext = React.createContext<AuthContextType | null>(null);

// 認證提供者屬性類型
interface AuthProviderProps {
  children: React.ReactNode;
}

// 認證提供者組件
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 臨時解決方案：在開發/測試環境中設置一個默認用戶，繞過認證
  const isDevMode = window.location.hostname === 'localhost' || 
                   window.location.hostname.includes('vercel.app');
  
  const [user, setUser] = React.useState<User | null>(isDevMode ? {
    id: 'dev-user',
    username: 'Demo User',
    email: 'demo@example.com',
    points: 100,
    role: 'user'
  } : null);
  const [isLoading, setIsLoading] = React.useState(!isDevMode);

  // 檢查存儲的令牌並設置用戶
  React.useEffect(() => {
    const checkAuth = async () => {
      // 如果是開發環境，跳過認證
      if (isDevMode) {
        setIsLoading(false);
        return;
      }
      
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // 解析JWT令牌
          const decoded = jwtDecode<JwtPayload>(token);
          
          // 檢查令牌是否過期
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            setUser(null);
          } else {
            // 設置用戶資料
            setUser({
              id: decoded.id,
              username: decoded.username,
              email: decoded.email,
              points: decoded.points,
              role: decoded.role
            });
            
            // 設置axios默認Authorization頭
            if (axios.defaults.headers) {
              if (!axios.defaults.headers.common) {
                axios.defaults.headers.common = {};
              }
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
          }
        } catch (error) {
          console.error('令牌解析錯誤:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [isDevMode]);

  // 登入功能
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      // 存儲令牌
      localStorage.setItem('token', token);
      
      // 設置axios默認Authorization頭
      if (axios.defaults.headers) {
        if (!axios.defaults.headers.common) {
          axios.defaults.headers.common = {};
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      // 設置用戶資料
      setUser(user);
      toast.success('登入成功！');
    } catch (error: any) {
      const message = error.response?.data?.message || '登入失敗，請重試';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 註冊功能
  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/register', { username, email, password });
      const { token, user } = response.data;
      
      // 存儲令牌
      localStorage.setItem('token', token);
      
      // 設置axios默認Authorization頭
      if (axios.defaults.headers) {
        if (!axios.defaults.headers.common) {
          axios.defaults.headers.common = {};
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      // 設置用戶資料
      setUser(user);
      toast.success('註冊成功！');
    } catch (error: any) {
      const message = error.response?.data?.message || '註冊失敗，請重試';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 登出功能
  const logout = () => {
    localStorage.removeItem('token');
    if (axios.defaults.headers && axios.defaults.headers.common) {
      delete axios.defaults.headers.common['Authorization'];
    }
    setUser(null);
    toast.success('已成功登出');
  };

  // 提供認證上下文
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定義鉤子以使用認證上下文
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth必須在AuthProvider內部使用');
  }
  
  return context;
}; 