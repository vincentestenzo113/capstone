import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import IncidentReport from './components/IncidentReport';
import Admin from './components/Admin';
import Users from './components/Users';
import Page1 from './components/Page1';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Page1 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incident-report" element={<IncidentReport />} />
      </Routes>
    </Router>
  );
}

export default App;
