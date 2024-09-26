import React, { useEffect, useState } from 'react';
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

  return (
    <div className="admin-container">
      <h2>Incident Reports</h2>
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
