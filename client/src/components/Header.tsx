import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            面試資訊分享
          </Link>

          {/* 搜索框 */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索公司、職位或地區..."
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>

          {/* 導航選項 */}
          <nav className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/submit-interview" className="btn btn-primary">
                  分享面試
                </Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">
                  我的面板
                </Link>
                <div className="relative">
                  <button 
                    className="flex items-center text-gray-600 hover:text-primary-600"
                    onClick={toggleMenu}
                  >
                    <span className="mr-1">{user.username}</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        個人資料
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        登出
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600">
                  登入
                </Link>
                <Link to="/register" className="btn btn-primary">
                  註冊
                </Link>
              </>
            )}
          </nav>

          {/* 移動端菜單按鈕 */}
          <button className="md:hidden" onClick={toggleMenu}>
            <svg className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* 移動端菜單 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="搜索公司、職位或地區..."
                className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute mt-2 ml-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
            <div className="space-y-3">
              {user ? (
                <>
                  <Link to="/submit-interview" className="block py-2 text-primary-600 font-medium">
                    分享面試
                  </Link>
                  <Link to="/dashboard" className="block py-2 text-gray-600">
                    我的面板
                  </Link>
                  <Link to="/profile" className="block py-2 text-gray-600">
                    個人資料
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left py-2 text-gray-600"
                  >
                    登出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-gray-600">
                    登入
                  </Link>
                  <Link to="/register" className="block py-2 text-primary-600 font-medium">
                    註冊
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 