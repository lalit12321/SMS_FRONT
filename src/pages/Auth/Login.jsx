import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: '',
    student_id: '',
    teacher_id: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUser = JSON.parse(localStorage.getItem(credentials.username));

    if (!existingUser) {
      alert("User not found. Please register.");
      navigate('/register');
    } else if (existingUser.password === credentials.password && existingUser.role === credentials.role) {
      // Check ID based on role
      if (credentials.role === 'student' && existingUser.student_id !== credentials.student_id) {
        alert("Invalid Student ID");
        return;
      }

      if (credentials.role === 'teacher' && existingUser.teacher_id !== credentials.teacher_id) {
        alert("Invalid Teacher ID");
        return;
      }

      // Store user in context
      login(existingUser);

      // Navigate based on role
      if (credentials.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (credentials.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      alert("Incorrect credentials!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <select
          name="role"
          value={credentials.role}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        {credentials.role === 'student' && (
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={credentials.student_id}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
        )}

        {credentials.role === 'teacher' && (
          <input
            type="text"
            name="teacher_id"
            placeholder="Teacher ID"
            value={credentials.teacher_id}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
