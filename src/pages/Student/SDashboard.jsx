import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Sidebar from '../../components/Sidebar/sidebar';

const StudentDashboard = () => {
  // Define state variables for student info, attendance, marks, and activity
  const [studentInfo, setStudentInfo] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Fetch student dashboard data on component mount
  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch('http://localhost/phpApi/SMS_project/sd.php', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setStudentInfo(data.student_info);
        setAttendance(data.attendance);
        setMarks(data.marks);
        setRecentActivity(data.recent_activity);
      })
      .catch((err) => console.error('Error fetching student data:', err));
  }, []);

  if (!studentInfo) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        {/* Top Welcome Card */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-2xl font-semibold">Welcome, {studentInfo.name}</h2>
          <p>Class: {studentInfo.class_name} | Notifications: 3 | GPA: {studentInfo.gpa}</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* GPA Progress */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">GPA Progress</h3>
            <div className="h-32 flex items-center justify-center text-3xl">{studentInfo.gpa}%</div>
          </div>

          {/* Weekly Chart Placeholder */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Weekly Performance</h3>
            <div className="h-32 flex items-center justify-center text-sm text-gray-500">[BarChart]</div>
          </div>

          {/* Grade by Subject */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Grades by Subject</h3>
            <div className="h-32 flex items-center justify-center text-sm text-gray-500">[BarChart]</div>
          </div>
        </div>

        {/* Calendar + Messages + Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Calendar */}
          <div className="bg-white p-4 rounded shadow col-span-1">
            <h3 className="font-bold mb-4">Calendar</h3>
            <Calendar />
          </div>

          {/* Messages */}
          <div className="bg-white p-4 rounded shadow col-span-1">
            <h3 className="font-bold mb-4">Messages</h3>
            <div className="h-64 overflow-y-auto text-sm text-gray-600">
              {attendance.map((record, index) => (
                <p key={index}>
                  <strong>{record.teacher}</strong>: {record.message}
                </p>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="bg-white p-4 rounded shadow col-span-1">
            <h3 className="font-bold mb-4">Assignments</h3>
            <ul className="text-sm">
              {marks.map((mark, index) => (
                <li key={index}>
                  {mark.subject} - {mark.assignment} | Due: {mark.due_date}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-bold mb-4">Recent Activity</h3>
          <ul className="text-sm">
            {recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
