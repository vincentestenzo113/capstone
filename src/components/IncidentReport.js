import React, { useState } from 'react';
import axios from 'axios';
import './IncidentReport.css'; // Ensure to import your CSS file

const IncidentReport = () => {
  const [studentId, setStudentId] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('description', description);
    formData.append('photo', photo);

    axios.post('/api/incident-report', formData) // Adjusted URL to be relative
      .then(response => {
        setMessage('Incident report submitted successfully!');
        // Clear form after submission
        setStudentId('');
        setDescription('');
        setPhoto(null);
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Error submitting incident report');
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Incident Report</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label className="form-label">Student ID</label>
          <input 
            type="text" 
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Upload Photo</label>
          <input 
            type="file" 
            onChange={(e) => setPhoto(e.target.files[0])} 
            required 
            className="form-input"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default IncidentReport;
