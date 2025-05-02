import React, { useState, useEffect } from "react";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState("2025-04-24");
  const [studentsData, setStudentsData] = useState([]);

  // Fetching the student attendance data
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost/phpApi/SMS_project/mark_attendance.php', {
          method: 'GET',
        });
        const data = await response.json();
        
        // Log to verify the structure of the data
        console.log("Fetched Data:", data);
        
        setStudentsData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    
    fetchAttendanceData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📅 Attendance Record</h2>

      {/* Date Selector */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label className="font-medium mr-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-3 py-1 rounded"
          />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Export CSV
        </button>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded">
          <thead className="bg-indigo-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border text-left">Student ID</th>
              <th className="p-2 border text-left">Name</th>
              <th className="p-2 border text-left">Class</th>
              <th className="p-2 border text-left">Subject ID</th>
              <th className="p-2 border text-center">Date</th>
              <th className="p-2 border text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student, index) => {
              // Handle attendance status based on the selected date
              const attendanceStatus = student.attendance?.[selectedDate] || "-";

              // Use student.student_id, selectedDate, student.subject_id, and index for the key
              return (
                <tr key={`${student.student_id}-${selectedDate}-${student.subject_id}-${index}`} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border text-center">{student.student_id}</td>
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.class}</td>
                  <td className="p-2 border text-center">{student.subject_id}</td>
                  <td className="p-2 border text-center">{selectedDate}</td>
                  <td className={`p-2 border text-center font-bold ${attendanceStatus === "Absent" ? "text-red-500" : "text-green-600"}`}>
          {student.status}
        </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
