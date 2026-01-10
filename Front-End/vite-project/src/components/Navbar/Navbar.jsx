import React, { useState, useEffect, useContext } from 'react';
import './Navbar.scss'
import menu from '../../assets/menu.png';
import logo from '../../assets/logo1.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext';
import { useNotification } from '../../../Notification';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {currentUser}=useContext(AuthContext)
  const fetch=useNotification(state=>state.fetch)
  const number=useNotification(state=>state.number)
  if(currentUser){
    fetch()
  }
  
  useEffect(() => {
    setOpen(false);
  }, []);

  
  return (
    <nav>
    <div className="left">
      <a href="/" className="logo">
        <img src={logo} alt="" />
        <span>Estate</span>
      </a>
      <a href="/">Home</a>
      <a href="/list">Property Listings</a>
      <a href="/">Contact</a>
      <a href="/">Agents</a>
    </div>
    <div className="right">
      {currentUser ? (
        <div className="user">
          <img
            src={currentUser.image||"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            alt=""
          />
          <span>{currentUser.username}</span>
          <Link to="/profile" className="profile">
            {number > 0 &&<div className="notification">{number}</div>}
            <span>Profile</span>
          </Link>
        </div>
      ) : (
        <>
          <a href="/login">Sign in</a>
          <a href="/register" className="register">
            Sign up
          </a>
        </>
      )}
      <div className="menuIcon">
        <img
          src={menu}
          alt=""
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
      <div className={open ? "menu active" : "menu"}>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
        <a href="/">Sign in</a>
        <a href="/">Sign up</a>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
