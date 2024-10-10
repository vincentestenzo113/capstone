import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; // Import Supabase client
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Users.css'; // Make sure to create this CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    // Fetch users from the profiles table in Supabase
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('student_id, name, email'); // Fetch the required fields

      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        setUsers(data); // Set users state with the fetched data
      }
      setLoading(false); // Set loading to false after fetching
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>Registered Users</h2>
      <button className="back-button" onClick={() => navigate('/admin')}>
        Return
      </button>
      
      {loading ? ( // Show loading state
        <p>Loading users...</p>
      ) : users.length > 0 ? ( // Show users if data is available
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.student_id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.student_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registered users found.</p> // Message if no users are found
      )}
    </div>
  );
};

export default Users;
