import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">找不到頁面</h2>
      <p className="text-lg mb-8">
        抱歉，您請求的頁面不存在或已被移除。
      </p>
      
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        返回首頁
      </Link>
    </div>
  );
};

export default NotFound; 