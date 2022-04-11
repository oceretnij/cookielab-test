import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import User from 'pages/user';
import Users from 'pages/users';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Users /> } />
        <Route path="/user/:id" element={ <User /> } />
      </Routes>
    </Router>
  );
}

export default App;
