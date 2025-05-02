// src/routes/AppRoutes.js

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';  // Import Register page
import ADashboard from '../pages/Admin/ADashboard';
import TDashboard from '../pages/Teachers/TDashboard';
import SDashboard from '../pages/Student/SDashboard';
import Attendance from '../pages/Admin/Attendance';
import Notic from '../pages/Admin/Notic';
import Calender from '../components/Calender/Calender'; // Import Calendar component
import Profile from '../components/Profile/Profile';
import Logout from '../pages/Auth/Logout';

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/attendance" element={<Attendance />} /> 
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/Calendar" element={<Calender />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/Notic" element={<Notic />} />  
      <Route path="/admin/dashboard" element={user?.role === 'admin' ? <ADashboard /> : <Navigate to="/login" />} />
      <Route path="/teacher/dashboard" element={user?.role === 'teacher' ? <TDashboard /> : <Navigate to="/login" />} />
      <Route path="/student/dashboard" element={user?.role === 'student' ? <SDashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
