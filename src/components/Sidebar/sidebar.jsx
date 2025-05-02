import React from 'react';
import { Link } from 'react-router-dom'; // React Router ke liye import karo

function Sidebar() {
  return (
    <div className="w-1/4 bg-gray-800 text-white h-screen p-5">
      <div className="text-2xl font-semibold mb-8"> Dashboard</div>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <Link to="/student/dashboard" className="block text-lg hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        
        <Link to="/attendance" className="block text-lg hover:bg-gray-700 p-2 rounded">
          Attendance
        </Link>
        <Link to="/Notic" className="block text-lg hover:bg-gray-700 p-2 rounded">
          Notice
        </Link>
        <Link to="/Calendar" className="block text-lg hover:bg-gray-700 p-2 rounded">
          Calendar
        </Link>
        <Link to="#" className="block text-lg hover:bg-gray-700 p-2 rounded">
          Library
        </Link>
        <Link to="#" className="block text-lg hover:bg-gray-700 p-2 rounded">
          Messages
        </Link>
        <div className="mt-8 border-t border-gray-600 pt-4">
          <Link to="/profile" className="block text-lg hover:bg-gray-700 p-2 rounded">
            Profile
          </Link>
          <Link to="#" className="block text-lg hover:bg-gray-700 p-2 rounded">
            Settings
          </Link>
          <Link to="/logout" className="block text-lg hover:bg-gray-700 p-2 rounded">
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
