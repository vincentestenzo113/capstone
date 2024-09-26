import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page1.css'; // Ensure to import your CSS file

const Page1 = () => {
  const navigate = useNavigate();
  
  // Sample user info; replace this with actual user data
  const userInfo = {
    studentId: '123456',
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  return (
    <div className="login-container">
      <h2 className="login-header">User Information</h2>
      <div className="user-info">
        <p><strong>Student ID:</strong> {userInfo.studentId}</p>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </div>
      <div className="button-group">
        <button className="submit-button" onClick={() => navigate('/incident-report')}>
          REPORT AN INCIDENT
        </button>
      </div>
    </div>
  );
};

export default Page1;
