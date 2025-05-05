import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React from 'react';

// 懶加載頁面組件
const HomePage = React.lazy(() => import('./pages/HomePage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// 頁面布局
import Layout from './components/Layout';

// 加載中的Fallback組件
const LoadingFallback = () => <div className="flex items-center justify-center h-screen">載入中...</div>;

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <React.Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          <Route path="*" element={
            <Layout>
              <NotFound />
            </Layout>
          } />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App; 