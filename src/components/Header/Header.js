/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CButton } from "@coreui/react";

const Header = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const [hidenew, setNavBar] = useState(true);
  let token = localStorage.getItem("user");

  //   useEffect(()=>{
  //      if(user?.username && location1!=='/'){
  //           return
  //      }

  //     if(user?.username  ){
  //       navigate('/')
  //       return
  //     }
  // navigate('/landing-page')
  //   },[])

  function LogOut() {
    localStorage.removeItem("user");
    navigate("/landing-page");
  }

  return (
    <>
      {/* <Navigate to={'/login2'} replace={true}></Navigate> */}

      <header
        className={`${
          location.pathname === "/chat" ? "header_none" : "main-header"
        }`}
      >
        <div className="header-manue">
          <button onClick={() => setNavBar((val) => !val)}>
            <AiOutlineMenu />
          </button>
        </div>
        <nav className={hidenew ? "main-nav deactive-nav" : "main-nav"}>
          <Link
            to="/"
            className={({ isActive }) => (isActive ? "main-nav-active" : "")}
          >
            <span>HOME</span>
          </Link>
          <Link
            to="/bookings"
            className={({ isActive }) => (isActive ? "main-nav-active" : "")}
          >
            <span>BOOKINGS</span>
          </Link>
          {/* <Link to='/our-clients'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>CLIENTS</span></Link> */}
          {/* <Link to='/resorts' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>RESORTS</span></Link> */}
          <Link
            to="/our-properties"
            className={({ isActive }) => (isActive ? "main-nav-active" : "")}
          >
            <span>OUR PROPERTIES </span>
          </Link>
          {/* <Link to='/forSale'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>FOR SALE</span></Link> */}
          <Link
            to="/spa"
            className={({ isActive }) => (isActive ? "main-nav-active" : "")}
          >
            <span>SPA</span>
          </Link>
          <Link
            to="/about"
            className={({ isActive }) => (isActive ? "main-nav-active" : "")}
          >
            <span>ABOUT</span>
          </Link>
          <Link
            to="/contact-us"
            className={({ isActive }) => (isActive ? "main-nav-active" : "")}
          >
            <span>CONTACT US</span>
          </Link>
          {/* <Link to='/contact-us'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>CONTACT US</span></Link>
            <Link to='/gallery'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>GALLERY</span></NavLink> */}

          <div className="logout-btn-cont">
            <CButton variant="outline" onClick={LogOut} color="info">
              Log Out
            </CButton>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
