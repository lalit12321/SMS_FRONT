import React, { useState } from 'react';

const Notic = () => {
  const [notices, setNotices] = useState([
    { id: 1, title: 'Holiday Notice', description: 'There will be a holiday on 25th December.' },
    { id: 2, title: 'Exam Schedule', description: 'Exams will begin from 5th January.' },
  ]);

  const [newNotice, setNewNotice] = useState({
    title: '',
    description: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({ ...newNotice, [name]: value });
  };

  // Add new notice
  const handleAddNotice = (e) => {
    e.preventDefault();
    const newId = notices.length + 1;
    setNotices([...notices, { id: newId, ...newNotice }]);
    setNewNotice({ title: '', description: '' });
  };

  // Delete notice
  const handleDeleteNotice = (id) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  return (
    <div className="notice-page">
      <h1 className="text-2xl font-semibold mb-4">Manage Notices</h1>

      {/* Add New Notice Form */}
      <div className="add-notice-form mb-6">
        <h2 className="text-xl font-semibold">Add New Notice</h2>
        <form onSubmit={handleAddNotice} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={newNotice.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              name="description"
              id="description"
              value={newNotice.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Add Notice
          </button>
        </form>
      </div>

      {/* Display Notices */}
      <div className="notices-list">
        <h2 className="text-xl font-semibold mb-4">Notices</h2>
        <ul>
          {notices.map((notice) => (
            <li key={notice.id} className="mb-4 border-b pb-4">
              <h3 className="font-semibold text-lg">{notice.title}</h3>
              <p>{notice.description}</p>
              <div className="mt-2 flex justify-end space-x-4">
                <button className="text-blue-500">Edit</button>
                <button
                  onClick={() => handleDeleteNotice(notice.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notic;
