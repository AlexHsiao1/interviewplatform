import { useAuth as originalUseAuth } from '../context/AuthContext';

/**
 * 自定義Hook用於訪問認證上下文
 * 提供用戶登入、登出、註冊和用戶資訊等功能
 */
const useAuth = originalUseAuth;

export default useAuth; 