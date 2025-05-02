import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    user_id: '',
    username: '',
    password: '',
    role: 'student',
    student_id: '',
    teacher_id: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: credentials.user_id,
      username: credentials.username,
      password: credentials.password,
      role: credentials.role,
      student_id: credentials.role === 'student' ? credentials.student_id : '',
      teacher_id: credentials.role === 'teacher' ? credentials.teacher_id : '',
    };

    try {
      const response = await fetch('http://mypassions.lovestoblog.com/phpApi/SMS_project/add_users.php', {  // Use your actual API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      // Check the response structure
      if (response.ok) {
        alert('User registered successfully!');
        navigate('/login');
      } else {
        alert('Registration failed: ' + (result.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong during registration.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={credentials.user_id}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

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

        <select
          name="role"
          value={credentials.role}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
