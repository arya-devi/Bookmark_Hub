import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout=()=>{
      dispatch(logoutUser())
      navigate('/login')
    }
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="#">MyWebsite</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/listingPage'} className="nav-link">Bookmark List</NavLink>
            </li>
          </ul>
        </div>
        <button className="btn btn-info" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavbarComponent;
