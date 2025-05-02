// src/pages/Teachers/TDashboard.js

import React from 'react';

const TDashboard = () => {
  const students = [
    { name: 'John Doe', attendance: 90, marks: 85 },
    { name: 'Jane Smith', attendance: 80, marks: 92 }
  ];

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Teacher Dashboard</h2>

      <h3 className="text-xl mb-4">Student Performance</h3>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Attendance (%)</th>
            <th className="border p-2">Marks</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.attendance}</td>
              <td className="border p-2">{student.marks}</td>
              <td className="border p-2">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit Marks</button>
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 ml-2">View Attendance</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TDashboard;
