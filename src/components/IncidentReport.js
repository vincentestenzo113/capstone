import React, { useState } from 'react';
import axios from 'axios';

const IncidentReport = () => {
  const [studentId, setStudentId] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState(''); // New state for description
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('studentId', studentId);
    formData.append('photo', photo);
    formData.append('description', description); // Append description to form data

    axios.post('/api/incident-report', formData)
      .then(response => {
        alert('Report submitted successfully!');
      })
      .catch(error => {
        setError('You can only submit one report.');
      });
  };

  return (
    <div>
      <h2>Incident Report</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID</label>
          <input 
            type="text" 
            value={studentId} 
            onChange={(e) => setStudentId(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Upload Photo</label>
          <input 
            type="file" 
            onChange={(e) => setPhoto(e.target.files[0])} 
            required 
          />
        </div>
        <div>
          <label>Description</label> {/* Description box */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe the incident in detail..."
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IncidentReport;
