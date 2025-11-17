import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
