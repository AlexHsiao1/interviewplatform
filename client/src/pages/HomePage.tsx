import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center my-12">
        <h1 className="text-4xl font-bold mb-4">歡迎來到面試趣</h1>
        <p className="text-xl mb-8">分享你的面試經驗，幫助他人成功</p>
        
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            立即註冊
          </Link>
          <Link
            to="/search"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
          >
            瀏覽面試經驗
          </Link>
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-2xl font-bold text-center mb-8">如何使用面試趣</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">分享經驗</h3>
            <p>分享你的面試過程、問題和心得，幫助其他求職者了解公司情況</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">獲取積分</h3>
            <p>每次分享面試經驗可獲得積分，用於查看其他人的面試心得</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">交流學習</h3>
            <p>透過面試資訊交流，提升自己的面試技巧和表現</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 