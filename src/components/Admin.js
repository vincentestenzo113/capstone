import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { supabase } from './supabaseClient'; // Import Supabase client
import axios from 'axios'; // Import axios
import './Admin.css'; // Make sure to create this CSS file

const Admin = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch reports from your reports API (adjust the endpoint as necessary)
    const fetchReports = async () => {
      try {
        const response = await axios.get('/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports(); // Fetch reports on component mount
  }, []);

  // Logout function
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      // Redirect to login page or perform other actions after logout
      window.location.href = '/'; // Redirect to the login page
    }
  };

  // Function to navigate to the Users page
  const navigateToUsers = () => {
    navigate('/users'); // Navigate to the Users page
  };

  return (
    <div className="admin-container">
      <h2>Incident Reports</h2>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      
      {reports.length > 0 ? (
        <ul>
          {reports.map((report) => (
            <li key={report.id}>
              <p><strong>Student ID:</strong> {report.studentId}</p>
              <p><strong>Description:</strong> {report.description}</p>
              <p><strong>Date:</strong> {report.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports found.</p>
      )}
      
      {/* Button to navigate to the Users page */}
      <button onClick={navigateToUsers} className="show-users-button">
        Show Registered Users
      </button>
    </div>
  );
};

export default Admin;
