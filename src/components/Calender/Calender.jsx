// src/pages/Admin/AdminCalendar.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({}); // Store events in an object with date as key

  // Mockup event data (this would come from an API in a real-world scenario)
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || {};
    setEvents(savedEvents);
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEventChange = (e) => {
    const updatedEvents = { ...events, [date.toLocaleDateString()]: e.target.value };
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save to local storage for demo purposes
  };

  return (
    <div className="admin-calendar">
      <h2 className="text-center text-xl mb-4">Admin Calendar</h2>
      <div className="flex justify-between">
        <Calendar onChange={handleDateChange} value={date} />
        <div className="event-details ml-8">
          <h3 className="text-lg mb-4">Agenda for {date.toLocaleDateString()}</h3>
          <textarea
            value={events[date.toLocaleDateString()] || ''}
            onChange={handleEventChange}
            rows={5}
            className="w-full border border-gray-300 p-2"
            placeholder="Add your agenda for this day..."
          />
        </div>
      </div>
    </div>
  );
};

export default Calender;
