import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 