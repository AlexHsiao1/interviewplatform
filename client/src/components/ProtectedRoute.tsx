import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // 如果認證狀態正在加載中，顯示加載提示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // 如果用戶未登入，重定向到登入頁面，同時保存當前URL以便登入後可以返回
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 用戶已登入，渲染子路由
  return <Outlet />;
};

export default ProtectedRoute; 