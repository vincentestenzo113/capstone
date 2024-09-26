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

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear user session, redirect to login page)
    // For example:
    // localStorage.removeItem('user');
    navigate('/login'); // Change this to the actual path for your login page
  };

  return (
    <div className="login-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
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
