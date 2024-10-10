import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // Import your Supabase client
import './IncidentReport.css'; // Ensure to import your CSS file

const IncidentReport = () => {
  const [studentId, setStudentId] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the photo is selected
    if (!photo) {
      setMessage('Please upload a photo.');
      return;
    }

    // Upload the photo to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('incident-report-images') // Use your bucket name
      .upload(`reports/${studentId}/${photo.name}`, photo);

    if (uploadError) {
      setMessage(`Failed to upload image: ${uploadError.message}`);
      return;
    }

    // Get the public URL of the uploaded image (optional, based on your use case)
    const { publicURL, error: urlError } = supabase
      .storage
      .from('incident-report-images')
      .getPublicUrl(uploadData.path);

    if (urlError) {
      setMessage(`Failed to get image URL: ${urlError.message}`);
      return;
    }

    // Prepare data to send to your server (you can adjust as needed)
    const reportData = {
      studentId,
      description,
      imageUrl: publicURL // Use the public URL of the uploaded image
    };

    // Now send reportData to your backend or Supabase table
    // Example:
    // const response = await axios.post('/api/incident-report', reportData);

    setMessage('Incident report submitted successfully!');
    // Clear form after submission
    setStudentId('');
    setDescription('');
    setPhoto(null);
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
