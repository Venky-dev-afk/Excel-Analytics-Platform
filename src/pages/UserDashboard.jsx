import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutClick = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear Redux state
    dispatch(logout());

    // Navigate to login
    navigate('/');
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={logoutClick}>Logout</button>
    </div>
  );
};

export default UserDashboard;
