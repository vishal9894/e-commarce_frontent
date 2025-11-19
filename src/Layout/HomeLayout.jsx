import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1  overflow-y-scroll this-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
