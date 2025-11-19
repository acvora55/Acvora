import React, { useState } from 'react';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Welcome Back Event', content: 'Join us for the annual welcome back event on Sept 1, 2025.', date: '2025-08-10' },
    { id: 2, title: 'Exam Schedule', content: 'Midterm exams start on Oct 15, 2025.', date: '2025-08-12' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDate, setNewDate] = useState('');
  const [error, setError] = useState('');

  const handleAddAnnouncement = () => {
    if (!newTitle.trim() || !newContent.trim() || !newDate) {
      setError('All fields are required!');
      return;
    }

    const newAnnouncement = {
      id: announcements.length + 1,
      title: newTitle.trim(),
      content: newContent.trim(),
      date: newDate,
    };

    setAnnouncements([...announcements, newAnnouncement]);
    setNewTitle('');
    setNewContent('');
    setNewDate('');
    setError('');
    setShowModal(false);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
  };

  const handleCloseModal = () => {
    setNewTitle('');
    setNewContent('');
    setNewDate('');
    setError('');
    setShowModal(false);
  };

  return (
    <div className="announcements-container">
      <h2 className="title">Announcements</h2>

      <button
        onClick={() => setShowModal(true)}
        className="add-btn"
      >
        Add Announcement
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add New Announcement</h3>
            {error && <p className="error-message">{error}</p>}
            <input
              type="text"
              placeholder="Announcement Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="modal-input"
            />
            <textarea
              placeholder="Announcement Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="modal-textarea"
              rows="4"
            ></textarea>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button
                onClick={handleCloseModal}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAnnouncement}
                className="submit-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="announcements-list">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-row">
            <div className="announcement-info">
              <span className="announcement-title">{announcement.title}</span>
              <span>{announcement.content}</span>
              <span className="announcement-date">Posted on: {announcement.date}</span>
            </div>
            <div className="announcement-actions">
              <button className="edit-btn">Edit</button>
              <button
                onClick={() => handleDeleteAnnouncement(announcement.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Announcements;