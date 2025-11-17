import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './Layout/HomeLayout';
import Login from './auth/Login';
import SignupPage from './auth/SignupPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route path="/" element={<HomeLayout />}>
        {/* Nested Routes inside HomeLayout */}
        <Route index element={<HomePage />} />     
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
