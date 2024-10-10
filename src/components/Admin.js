import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Import Supabase client
import axios from 'axios';
import './Admin.css'; // Make sure to create this CSS file

const Admin = () => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    // Fetch reports
    axios.get('/api/reports')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });

    // Fetch users
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
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
              {/* You can add more details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reports found.</p>
      )}
      
      <button onClick={() => setShowUsers(!showUsers)}>
        {showUsers ? 'Hide Users' : 'Show Users'}
      </button>

      {showUsers && (
        <div className="user-list">
          <h3>Registered Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
