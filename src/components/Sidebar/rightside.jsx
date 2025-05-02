// components/AdminRightPanel.jsx
import React from 'react';
import Calendar from 'react-calendar'; // install using npm install react-calendar
import 'react-calendar/dist/Calendar.css';

const AdminRightPanel = () => {
  const notices = [
    { id: 1, text: 'Holiday on 1st May - Labour Day' },
    { id: 2, text: 'Staff Meeting at 3 PM on 28th April' },
    { id: 3, text: 'Midterm Exams from 5th May' },
  ];

  return (
    <div className="w-full md:w-[300px] p-4 space-y-6 bg-gray-50 rounded shadow">
      {/* Calendar */}
      <div className="bg-white rounded shadow p-3">
        <h2 className="font-semibold mb-2 text-lg">📅 Calendar</h2>
        <Calendar />
      </div>

      {/* Notice Board */}
      <div className="bg-white rounded shadow p-3">
        <h2 className="font-semibold mb-2 text-lg">📌 Notice Board</h2>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
          {notices.map((notice) => (
            <li key={notice.id}>{notice.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminRightPanel;
