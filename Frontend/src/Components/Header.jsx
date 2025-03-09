import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../Redux/Reducer/AuthReducer';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FiHome } from 'react-icons/fi'; 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    dispatch(logOut());
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard'); 
  };

  return (
    <header className="bg-dark p-3">
      <nav className="container d-flex justify-content-end">
       
        <button 
          onClick={handleDashboard} 
          className="btn btn-outline-light d-flex align-items-center me-2"
        >
          <FiHome size={20} className="me-2" />
          Dashboard
        </button>
        
        <button 
          onClick={handleLogout} 
          className="btn btn-outline-light d-flex align-items-center"
        >
          <FiLogOut size={20} className="me-2" />
          Log Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
