import React, { useState } from 'react';
import axios from 'axios';

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

    axios.post('http://<Raspberry_Pi_IP>:5000/api/incident-report', formData)  // Adjust the URL to your Pi's IP
      .then(response => {
        setMessage('Incident report submitted successfully!');
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Error submitting incident report');
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
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default IncidentReport;
