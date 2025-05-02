import React, { useState, useEffect } from 'react';
import '../../App.css';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from '../../components/Sidebar/sidebar';
import AdminRightPanel from '../../components/Sidebar/rightside';

const ADashboard = () => {
  const [statData, setStatData] = useState([
    { name: 'Students', value: 0 },
    { name: 'Teachers', value: 0 }
  ]);
  const [pieData, setPieData] = useState([
    { name: 'Students', value: 0 },
    { name: 'Teachers', value: 0 }
  ]);
  const [barData, setBarData] = useState([
    { name: 'Mon', students: 0, teachers: 0},
    { name: 'Tue', students: 0, teachers: 0},
    { name: 'Wed', students: 0, teachers: 0},
    { name: 'Thu', students: 0, teachers: 0},
    { name: 'Fri', students: 0, teachers: 0 },
  ]);

  useEffect(() => {
    fetch('http://localhost/phpApi/SMS_project/dashboard.php')
      .then(response => response.json())
      .then(data => {
        // Update statData and pieData based on dashboard data from API
        const updatedStats = [
          { name: 'Students', value: data.dashboard.students },
          { name: 'Teachers', value: data.dashboard.teachers }
        ];

        // Set state for pie chart
        setStatData(updatedStats);
        setPieData(updatedStats);
        console.log("Stat Data: ", updatedStats);
        // Update barData for the bar chart (attendance data)
        const updatedBarData = data.attendance.map(item => ({
          name: item.day,
          students: item.students,
          teachers: item.teachers,
        }));
        setBarData(updatedBarData);
      }).catch(err => console.error("Error fetching data: ", err));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="font-bold text-2xl">Welcome, Admin</div>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <span className="absolute top-0 right-0 w-4 h-4 text-xs text-center bg-red-500 rounded-full">3</span>
              <img src="/notifications-icon.png" alt="Notifications" className="w-6 h-6" />
            </div>
            <div>
              <img src="/profile-image.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {statData.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded shadow-md text-center">
              <div className="font-bold text-xl">{stat.name}</div>
              <div className="text-3xl">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="font-bold text-lg mb-4">Students Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend verticalAlign="bottom" />
  </PieChart>
</ResponsiveContainer>

          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="font-bold text-lg mb-4">Attendance</h2>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#0088FE" name="Students" />
              <Bar dataKey="teachers" fill="#00C49F" name="teachers" />
            </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <AdminRightPanel />
    </div>
  );
};

export default ADashboard;
