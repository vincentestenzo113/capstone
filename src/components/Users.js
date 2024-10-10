import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Import Supabase client
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Users.css'; // Ensure you have the appropriate CSS file

const Users = () => {
  const [users, setUsers] = useState([]); // State for storing users data
  const [loading, setLoading] = useState(true); // State for managing loading
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch users from the 'profiles' table in Supabase
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('student_id, created_at'); // Select student ID and creation date
      
      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        console.log('Fetched users:', data); // Log the fetched data to inspect the structure
        setUsers(data); // Set users state with the fetched data
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchUsers(); // Call fetchUsers on component mount
  }, []); // Empty dependency array to ensure this runs once

  return (
    <div className="users-container">
      <h2>Registered Users</h2>
      <button className="back-button" onClick={() => navigate('/admin')}>
        Return
      </button>

      {/* Show loading message if data is still being fetched */}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th> {/* Column for numbering */}
              <th>Student ID</th> {/* Column for Student ID */}
              <th>Date Created</th> {/* Column for creation date */}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.student_id}>
                <td>{index + 1}</td> {/* Display index as row number */}
                <td>{user.student_id}</td> {/* Display student ID */}
                <td>{new Date(user.created_at).toLocaleDateString()}</td> {/* Format and display creation date */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registered users found.</p> // Show message if no users are found
      )}
    </div>
  );
};

export default Users;
