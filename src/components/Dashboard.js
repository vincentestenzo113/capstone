import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [parkingSlots, setParkingSlots] = useState(50);

  useEffect(() => {
    // Fetch available parking slots from the backend
    axios.get('/api/parking-slots')
      .then(response => {
        setParkingSlots(response.data.availableSlots);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>YUSTP PARKTRACK</h2>
      <p>Available Parking Slots: {parkingSlots}</p>
      <Link to="/profile">Go to Profile</Link>
      <br />
      <Link to="/incident-report">Report an Incident</Link>
    </div>
  );
};

export default Dashboard;
