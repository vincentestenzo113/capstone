import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [rfid, setRfid] = useState('');
  const [message, setMessage] = useState('');
  const [slotsLeft, setSlotsLeft] = useState(null);

  // Function to handle parking entry
  const handleEnter = () => {
    axios.post('http://<Raspberry_Pi_IP>:5000/api/parking/enter', { rfid })  // Adjust the URL to your Pi's IP
      .then(response => {
        setMessage(response.data.message);
        setSlotsLeft(response.data.slots_left);
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Error entering parking');
      });
  };

  // Function to handle parking exit
  const handleExit = () => {
    axios.post('http://<Raspberry_Pi_IP>:5000/api/parking/exit', { rfid })  // Adjust the URL to your Pi's IP
      .then(response => {
        setMessage(response.data.message);
        setSlotsLeft(response.data.slots_left);
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Error exiting parking');
      });
  };

  return (
    <div>
      <h1>Parking Dashboard</h1>
      <input 
        type="text" 
        placeholder="Enter RFID" 
        value={rfid} 
        onChange={(e) => setRfid(e.target.value)} 
      />
      <button onClick={handleEnter}>Enter Parking</button>
      <button onClick={handleExit}>Exit Parking</button>

      <p>{message}</p>
      {slotsLeft !== null && <p>Slots left: {slotsLeft}</p>}
    </div>
  );
};

export default Dashboard;
