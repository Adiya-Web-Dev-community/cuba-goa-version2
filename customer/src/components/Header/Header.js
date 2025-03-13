/* eslint-disable no-restricted-globals */
/* eslint-disable no-unreachable */
// eslint-disable-next-line
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import "./Header.css";
import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { Icon } from "react-icons-kit";
import { cross } from "react-icons-kit/icomoon/cross";
import cubaGoaLogo from "../../assets/Screenshot_2025-01-30_175934-removebg-preview.png";
import axios from "../../helpers/axios";
import { toast } from "react-hot-toast";

//big screen navbar icon

import { SiIfood } from "react-icons/si";
import { TbSubtask } from "react-icons/tb";
import { GiDiamondRing } from "react-icons/gi";

//dropdown
import { IoIosArrowDown } from "react-icons/io";

//small screen navbar icons
import { MdHome } from "react-icons/md";
// import { FaHotel } from "react-icons/fa";
import { MdSmsFailed } from "react-icons/md";
import { MdHotel } from "react-icons/md";
import { MdCelebration } from "react-icons/md";
import { FaSpa } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { RiContactsFill } from "react-icons/ri";
import { CgMenuRight } from "react-icons/cg";
import { MdLocalFlorist } from "react-icons/md";
import OverLay from "../../ui/OverLay";

const Header = ({ auth, setAuth }) => {
  // console.log(location.pathname);
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState([]);
  const [isError, setError] = useState("");

  //RESPONSIVE NAVBAR
  /*  handling responsive navbar */
  // const [showNavbar, setShowNavbar] = useState("none");
  const [isNavbarHidden, setNavbarToggle] = useState(false);

  //navbar bacground handling state
  const [isScroll, setScrollStyle] = useState(false);

  // //dropDown
  const [isVisible, setVisible] = useState(false);

  // const hotalDropDownhandler = () => {
  //   setDropeDown((prev) => !prev);
  // };
  const [openList, setOpenList] = useState(false);

  // const toggleDropdown = () => {
  //   console.log("hello");
  //   setVisible((prevState) => !prevState);
  // };

  // const handleMouseEnter = () => {

  // };

  // const handleMouseLeave = () => {
  //   setVisible(false);
  // };

  const handleItemClick = (propertyId, resortName) => {
    // Handle the item click event
    console.log(`Clicked on ${resortName} with ID ${propertyId}`);
  };
  let restaurants = ["cuba pure veg", "bebinca"];
  let thingstodo = [
    { id: 0, activity: "north goa", pagelink: "/north-goa" },
    { id: 1, activity: "south goa", pagelink: "/south-goa" },
    { id: 2, activity: "activity", pagelink: "/activity" },
  ];

  const getPropertiesData = async () => {
    await axios
      .get(`/hotelbook`)

      .then((res) => {
        console.log("property list => ", res.data);
        setAllProperties(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  // useEffect(() => {}, []);

  // function tract scroll in direction Y for navbar background  color change
  const settingScrollStyle = () => {
    if (window.scrollY > 100) {
      setScrollStyle(true);
    } else {
      setScrollStyle(false);
    }
  };

  //navbar background changes because of  useEffect
  useEffect(() => {
    document.addEventListener("scroll", settingScrollStyle);

    return () => document.removeEventListener("scroll", settingScrollStyle);
  }, []);

  const token = localStorage.getItem("user");
  useEffect(() => {
    getPropertiesData();
    setAuth(token);
    //eslint-disable-next-line
  }, [token]);

  //funtion to show or hide navbar on clicking menu icon
  const handleOpenNavbar = () => {
    console.log("click");
    setNavbarToggle((prev) => !prev);
  };
  const handleCloseNavbar = () => {
    setNavbarToggle(false);
  };
  /*   handling responsive navbar ends */

  //SHOW ROOMS
  const viewRooms = (id, resortname) => {
    // console.log(id, resortname);
    navigate(`/${resortname}/${id}/rooms`);
    // handleCloseNavbar();
    setNavbarToggle(false);
    // console.log(resortname, id);
  };

  if (!allProperties) {
    return <h6>{isError}</h6>;
  }

  // console.log(auth, "login hai");

  return (
    <div
      className={` ${
        location.pathname === "/chat"
          ? "header_none"
          : location.pathname !== "/"
          ? `visible_header ${isScroll && "header_background"}`
          : `header ${isScroll && "header_background"}`
      }`}
    >
      <div className="menu" onClick={() => handleOpenNavbar()}>
        <section className="appbar_col_small">
          {/* Logo */}

          <Link to={"/"}>
            <img
              src={cubaGoaLogo}
              alt="cuba-goa-logo"
              style={{ width: "8rem", height: "4rem" }}
            />
          </Link>
        </section>
        <FaAlignJustify className="sidebar_icon" />
      </div>
      {/* Desktop Navbar */}

      <div className="desktop_section">
        {/* Logo Section */}
        <div className="logo-wrapper">
          <div className="logo-container">
            {/* <div className="background-shape">
              <svg viewBox="0 0 400 200" preserveAspectRatio="none">
                <path
                  d="M20,50 
                 C50,30 100,20 150,25 
                 C200,30 240,40 300,35 
                 C350,30 360,20 380,50 
                 C380,80 390,120 350,140 
                 C310,160 240,165 200,160 
                 C150,155 100,165 50,150 
                 C0,135 -10,70 20,50 Z"
                  className="shape-path"
                />
              </svg>
            </div> */}
            <section className="appbar_col_2">
              <Link to={"/"}>
                <img
                  src={cubaGoaLogo}
                  alt="cuba-goa-logo"
                  style={{ width: "12.8rem", height: "5.8rem" }}
                />
              </Link>
            </section>
          </div>
        </div>

        {/* Centered Navigation Links */}
        <section className="appbar_col_1">
          <Link to={"/"} className="nav_link nav_header_2">
            Home
          </Link>
          <Link className="nav_link nav_header_2 available" to={"/spa"}>
            Farm Houses
          </Link>

          <Link className="nav_link nav_header_2" to={"/gallery"}>
            {/* <RiGalleryFill className="header_icon" /> */}
            Top Listings
          </Link>
          <Link to={"/aboutus"} className="nav_link nav_header_2">
            {/* <MdSmsFailed className="header_icon" /> */}
            {/* TESTIMONIALS */}
            AboutUs
          </Link>

          <Link to={"/servies"} className="nav_link ">
            {/* <RiContactsFill className="header_icon" /> */}
            Services 
          </Link>

          
          {/* Contact Us */}
          <Link to={"/contactus"} className="nav_link ">
            {/* <RiContactsFill className="header_icon" /> */}
            Contact Us
          </Link>
          <Link to={"/guestex"} className="nav_link nav_header_2">
            Gest Experience
          </Link>

          

          
          {/* <div
            className="drop_more"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <div className="dropDown_container">SERVICES</div>
            <IoIosArrowDown
              className={`${isVisible ? "drop_Icon_open" : "drop_Icon"}`}
            />
            {isVisible && (
              <div className="more_dropdown">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <div className="more_content resturant">
                    <p className="more_heading">Farm space</p>
                    <ul className="list_container">
                      {allProperties
                        .filter(
                          (restaurant) => restaurant.type === "restaurant"
                        )
                        .map((property) => (
                          <li
                            className="list_item"
                            key={property._id}
                            onClick={() =>
                              viewRooms(property._id, property.resortName)
                            }
                          >
                            {property.resortName}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="more_content hotel">
                    <p className="more_heading">Food catering</p>
                    <ul className="list_container">
                      {allProperties
                        .filter((resort) => resort.type === "resort")
                        .map((property) => (
                          <li
                            className="list_item"
                            key={property._id}
                            onClick={() => {
                              viewRooms(property._id, property.resortName);
                            }}
                          >
                            {property.resortName}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="more_content things">
                    <p className="more_heading">Things to Do</p>
                    <ul className="list_container">
                      {thingstodo.map((activity) => (
                        <li
                          className="list_item"
                          key={activity.id}
                          onClick={() => {
                            navigate(`${activity.pagelink}`);
                          }}
                        >
                          {activity.activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="more_bottom">
                  <Link className="more_link" to={"/destination-wedding"}>
                    Destination Weddings
                  </Link>
                  <Link className="isAvailabe" to={"/spa"}>
                    Form House
                  </Link>
                </div>
              </div>
            )}
          </div> */}
        </section>

        {/* Right Section - Get Started */}
       <section className="appbar_col_4">
          <div className="dropdown header_drop">
            <button
              className="dropdown-toggle dropdown_nav"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Get Started
            </button>
            <div className="dropdown-menu">
              {auth ? (
                <div>
                  <Link
                    className="auth"
                    to={"/"}
                    onClick={() => {
                      localStorage.clear("user");
                      handleCloseNavbar();
                      toast.success("Logged out successfully");
                    }}
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="login">
                  <Link className="auth" to={"/signin"}>
                    Login
                  </Link>

                  <Link className="auth" to={"/signin"}>
                   Sign in
                  </Link>
                </div>
              )}
              {auth && <Link to={"/my-booking"}>My Bookings</Link>}
            </div>
          </div>
        </section>
      </div>

      {/* Second Navbar */}
      {/* {isNavbarHidden && ( */}
      {/*small screen navbar */}
      {isNavbarHidden && (
        <div className={`desktop_section_extra`}>
          {/* <OverLay value={isNavbarHidden} onclose={handleCloseNavbar}> */}
          <section
            className={`appbar_col_1_extra ${isNavbarHidden && "visible"}`}
          >
            {/* mobile view navbar */}
            <div className="right-side-navbar">
              <Box
                className="col-2-box"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <div className="sidebarCloseIcon">
                  <div className="close_cross">
                    <Icon
                      className="close-cross-icon"
                      icon={cross}
                      size={15}
                      onClick={handleCloseNavbar}
                    />
                  </div>
                  SideBar
                </div>
                <div className="sideButtons">
                  <Link to={"/"} className="side_link">
                    <MdHome className="sidenav_icon" />
                    Home
                  </Link>
                  {/* </Button> */}
                  <Link to={"/aboutus"} className="side_link">
                    <MdSmsFailed className="sidenav_icon" />
                    About Us
                  </Link>
                  <div className="drop_down">
                    <MdHotel className="sidenav_icon" />
                    <div className="side_drop_content">
                      {/* <FaHotel /> */}
                      <button
                        className="dropdown-toggle dropdown_sidebar"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {/* OUR HOTELS */}
                        Our Farm
                      </button>
                      {/* </div> */}
                      <div className="dropdown-menu">
                        {allProperties
                          .filter((resort) => {
                            if (resort.type === "resort") {
                              return resort;
                            }
                          })
                          .map((property, index) => {
                            return (
                              <div key={property._id}>
                                <p
                                  onClick={() => {
                                    viewRooms(
                                      property._id,
                                      property.resortName
                                    );
                                  }}
                                >
                                  {property.resortName}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  <Link className="side_link" to={"/destination-wedding"}>
                    {/* DESTINATION WEDDINGS */}
                    <MdLocalFlorist className="sidenav_icon" />
                    Destination Weddings
                  </Link>
                  <Link to={"/events"} className="side_link">
                    {/* CELEBRATE WITH US */}
                    <MdCelebration className="sidenav_icon" />
                    Celebrate With Us
                  </Link>
                  <div className="drop_down">
                    <SiIfood className="sidenav_icon" />
                    <div className="side_drop_content">
                      <button
                        className="dropdown-toggle dropdown_sidebar"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {/* OUR RESTAURANTS */}
                        Our Farm
                      </button>
                      <div className="dropdown-menu">
                        {allProperties
                          .filter((restaurant) => {
                            if (restaurant.type === "restaurant") {
                              return restaurant;
                            }
                          })
                          .map((property, index) => {
                            return (
                              <div key={property._id}>
                                <p
                                  onClick={() => {
                                    viewRooms(
                                      property._id,
                                      property.resortName
                                    );
                                  }}
                                >
                                  {property.resortName}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  {/* things to do */}
                  <div className="drop_down">
                    <TbSubtask className="sidenav_icon" />
                    <div className="side_drop_content">
                      <button
                        className="dropdown-toggle dropdown_sidebar"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {/* THINGS TO DO */}
                        Things to Do
                      </button>
                      <div className="dropdown-menu">
                        {thingstodo.map((activity, index) => {
                          return (
                            <div key={activity.id}>
                              <p
                                onClick={() => {
                                  navigate(`${activity.pagelink}`);
                                  handleCloseNavbar();
                                }}
                              >
                                {activity.activity}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <Link to={"/spa"} className="side_link">
                    {/* SPA */}
                    <FaSpa className="sidenav_icon" />
                    Farm Houses
                  </Link>
                  <Link to={"/gallery"} className="side_link">
                    {/* GALLERY */}
                    <RiGalleryFill className="sidenav_icon" />
                    Top Listings
                  </Link>
                  <Link to={"/contactus"} className="side_link">
                    <RiContactsFill className="sidenav_icon" />
                    Contact Us
                  </Link>
                  {/* instead of my bookings menu dropdown for other options */}
                  <div className="drop_down">
                    <CgMenuRight className="sidenav_icon" />
                    <div className="side_drop_content">
                      <button
                        className="dropdown-toggle dropdown_sidebar"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {/* MENU */}
                        Menu
                      </button>
                      <div className="dropdown-menu">
                        {auth ? (
                          <div>
                            <p
                              onClick={() => {
                                localStorage.clear("user");
                                handleCloseNavbar();
                                navigate("/");
                                toast.success("Logged out successfully");
                              }}
                            >
                              Logout
                            </p>
                          </div>
                        ) : (
                          <div>
                            <Link
                              to={"/signin"}
                              onClick={() => {
                                navigate("/signin");
                                handleCloseNavbar();
                              }}
                            >
                              Login
                            </Link>
                          </div>
                        )}
                        {auth ? (
                          <Link
                            to={"/my-booking"}
                            onClick={() => {
                              navigate("/my-bookings");
                              handleCloseNavbar();
                            }}
                          >
                            <p>my bookings</p>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ends */}
              </Box>
            </div>

            {/* mobile view navbar ends */}
          </section>
          {/* </OverLay> */}
          {/* )} */}
        </div>
      )}
    </div>
  );
};

export default Header;
