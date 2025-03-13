/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import Video from "../../video/Video";

import cloud from "../../../assets/spaCloud.jpg";
// import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
// import { Image } from 'react-bootstrap'
import axios from "../../../helpers/axios";

// import HomeList from '../home-list/HomeList';
// import Pagination from '../home-list/Pagination';
// import resortImage from '../../../assets/CUBA_PATNEM_BEACH_BUNGALOWS.jpg'
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../../assets/arrow.png";
import { location2 } from "react-icons-kit/icomoon/location2";
import { Icon } from "react-icons-kit";
import { cross } from "react-icons-kit/icomoon/cross";
import Footer from "../Footer/Footer";
import { Box, Button, Typography, Modal } from "@mui/material";
import cubaIcon from "../../../assets/logocubagoa.png";
import { toast } from "react-hot-toast";
import FeaturedProperties from "./FeaturedProperties";
import { useDispatch } from "react-redux";

//calender
import { Calendar, DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import { SlCalender } from "react-icons/sl";

//dropdown
import { IoIosArrowDown, IoIosChatbubbles } from "react-icons/io";

//chat icon
import { IoLogoSnapchat } from "react-icons/io5";
import ChatOpeningButton from "../Chat/ChatOpeningButton";

import ListingsPage from "./ListingsPage";

import Testimonials from "./Testimonials";

import FarmDeals from "./FarmDeals";
import TravelCarousel from "./TravelCarousel";
import WhatsAppIcon from './../../whatsapp/whatsapp';

const Home = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [isBox, setBox] = useState(false);

  const [resortData, setResortData] = useState("");
  const [resortId, setResortId] = useState("");

  const [checkindate, setCheckindate] = useState("");
  const [checkoutdate, setCheckoutdate] = useState("");

  const [isDropDown, setDropDown] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // const viewRooms = (id, resortname) => {
  //   navigate(`/${resortname}/${id}/rooms`);
  //   console.log(resortname, id);
  // };

  // const [allProperties, setAllProperties] = useState([]);
  // const getPropertiesData = async () => {
  //   await axios
  //     .get(`/hotelbook`)
  //     // await axios(`http://localhost:4001/hotelbook`)
  //     .then((res) => {
  //       // console.log(res.data)
  //       setAllProperties(res.data);
  //       //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getPropertiesData();
  // }, []);

  useEffect(() => {
    if (resortId === "") {
      console.log("empty reosrt id");
    } else {
      console.log();
      const resortData = allProperties.find((el) => el._id === resortId);
      setResortData(resortData);
      console.log(resortData);
    }

    // eslint-disable-next-line
  }, [resortId]);

  // const [isIntersecting, setIsIntersecting] = useState(false);

  //calender range
  const [selecteDated, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  //date calender toggler
  const [toggler, setToggler] = useState(false);

  //
  const [isScreenSmall, setScreenSmallCondition] = useState("");

  const handleResize = (e) => {
    setScreenSmallCondition(e.matches);
  };

  const handlingSelectDate = (range) => {
    // console.log(range);
    setSelectedDate(range.selection);
  };

  //calenderToggling
  const handlingToggling = () => {
    setToggler((prev) => !prev);
  };

  //calender responsive
  const orientation = window.matchMedia("(max-width: 900px)").matches
    ? "vertical"
    : "horizontal";

  // const ref = useRef(null);

  const style = {
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid dakblue",
    boxShadow: 1000,
    borderRadius: "1rem",
  };

  //reducer dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  //SHOW ROOMS
  const viewRooms = (id, resortname) => {
    navigate(`/${resortname}/${id}/rooms`);
    // console.log(resortname, id);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getPropertiesData = async () => {
    await axios

      .get(`/hotelbook`)
      .then((res) => {
        console.log(res.data);

        setAllProperties(res.data);
        //  setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log("allProperties =>", allProperties);
  useEffect(() => {
    handleOpen();
    getPropertiesData();

    const mediaQueryList = window.matchMedia("(max-width: 900px)");

    // Set initial state based on the media query
    setScreenSmallCondition(mediaQueryList.matches);

    // Add event listener for changes in media query status

    mediaQueryList.addEventListener("change", handleResize);

    // Remove event listener on component unmount
    return () => {
      mediaQueryList.removeEventListener("change", handleResize);
    };
  }, []);

  //check_availability
  const handleCheckAvailable = () => {
    if (resortId === "") {
      toast.error("Choose resort to check availability");
    } else {
      console.log("resortdata", resortData);

      if (checkindate !== "" && checkoutdate !== "") {
        dispatch({
          type: "set_checkin",
          payload: { checkindate: checkindate },
        });
        dispatch({
          type: "set_checkout",
          payload: { checkoutdate: checkoutdate },
        });
        viewRooms(resortData._id, resortData.resortName);
      } else {
        toast.error("Select dates to check availability");
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState({ visible: false, text: '', position: { top: 0, left: 0 } });
  const dropdownRef = useRef(null);

  const options = [
    { id: 'farm-stay', label: 'Farm Stay', description: 'Comfortable stays for relaxation' },
    { id: 'corporate', label: 'Corporate', description: 'Corporate retreats and meetings' },
    { id: 'short-stay', label: 'Short stay', description: 'Perfect for short weekend getaways' },
    { id: 'occasion', label: 'Occasion', description: 'Celebrate your special occasions' },
    { id: 'holiday', label: 'Holiday', description: 'Relaxing holiday experiences' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    // setIsOpen(false);
  };

  const handleMouseEnter = (e, description) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipInfo({
      visible: true,
      text: description,
      position: {
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX + 10 // Position to the right of the option
      }
    });
  };

  const handleMouseLeave = () => {
    setTooltipInfo({ ...tooltipInfo, visible: false });
  };


  const handleCouponSubmit = async () => {
    // console.log(email);
    navigate("/");
    handleClose();
    toast.success("You're are eligible for discounts and offers");
  };

  if (!allProperties) {
    return <h1>.</h1>;
  }

  const showDropDownhandler = () => {
    setDropDown((prev) => !prev);
  };

  return (
    <div className="home-wrap">
      <div className="banner">
        <h2 className="banner_text">
          Reconnect with Nature, Recharge <br /> Your Soul
        </h2>
        {/* <div className="">
          <div>Contact Now</div>
          <button
            className="search_box"
            onClick={() => setBox((prev) => !prev)}
          >
            Book Now
          </button>
        </div> */}

        <div className="home-search-box-desktop">
          <div className="select-btnwrap">
            {!isScreenSmall && (
              <label className="select_label">Looking For?</label>
            )}
            {/* <select
              id="select"
              name="resort"
              value={resortId}
              onChange={(e) => setResortId(e.target.value)}
            >
              {isScreenSmall && <option>Looking For Resort?</option>}
              {!isScreenSmall && <option>Select Resort</option>}
              {allProperties.map((resort, i) => {
                return (
                  <option key={i} value={resort._id}>
                    {resort.resortName}
                  </option>
                );
              })}
                
            </select> */}
           
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <div 
        className="dropdown-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : 'Select an option'}
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <div className="dropdown-options">
          {options.map(option => (
            <div 
              key={option.id}
              className="dropdown-option" 
              onClick={() => handleSelect(option)}
              onMouseEnter={(e) => handleMouseEnter(e, option.description)}
              onMouseLeave={handleMouseLeave}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {tooltipInfo.visible && (
        <div 
          className="option-tooltip"
          style={{
            top: `${tooltipInfo.position.top}px`,
            left: `${tooltipInfo.position.left}px`
          }}
        >
          {tooltipInfo.text}
        </div>
      )}
    </div>
            {/* <div className="select_drop" onClick={() => showDropDownhandler()}>
              <input
                type="text"
                className="select_resort"
                placeholder="Select Resort"
                value={resortData ? resortData.resortName : ""}
                // onChange={(e) => setResortId(e.target.value)}

                onChange={(e) => {}}
                readOnly
              />
              <div className="select_div">
                <IoIosArrowDown
                  className={`select_icon_close ${
                    isDropDown && "select_icon_open"
                  } `}
                />
              </div>
            </div>
            {isDropDown && (
              <ol className="select_option">
                {allProperties.map((resort, i) => {
                  return (
                    <li
                      onClick={() => {
                        setResortId(resort._id);
                        setDropDown(false);
                      }}
                      className="option_item"
                      key={i}
                      value={resort._id}
                    >
                      {resort.resortName}
                    </li>
                  );
                })}
              </ol>
            )} */}
            </div> 

          <div className="dates_container">
            <div className="containt_wraper">
              <h2 className="dates_heading">Start to End Dates</h2>
              <div className="dates_wrapper">
                <label className="date_holder">
                  {`${format(selecteDated.startDate, "MM/dd/yyyy")} to ${format(
                    selecteDated.endDate,
                    "MM/dd/yyyy"
                  )}`}
                </label>
                <button
                  className="toggle_calender"
                  onClick={() => handlingToggling()}
                >
                  <SlCalender className="calender_icon" />
                </button>
              </div>
            </div>
          </div>

          <div className="card_check">
            <Button
              variant="contained"
              className="check_availability"
              onClick={handleCheckAvailable}
              style={{
                background: "#edae6f",
                fontSize: "0.8rem",
                color: "#fff",
              }}
            >
              CHECK AVAILABILITY
            </Button>
          </div>
        </div>
        {/* )} */}
        {!isScreenSmall && toggler && (
          <DateRangePicker
            className="dateRange"
            ranges={[selecteDated]}
            onChange={(range) => handlingSelectDate(range)}
            direction="horizontal"
            minDate={new Date()}
            preventSnapRefocus={true}
          />
        )}

        {isScreenSmall && toggler && (
          <DateRange
            editableDateInputs={true}
            className="dateRange"
            ranges={[selecteDated]}
            onChange={(range) => handlingSelectDate(range)}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
          />
        )}

        {/* {toggler && (
          <div
            onClick={() => handlingToggling()}
            className="date_overlay"
          ></div>
        )} */}
      </div>
      <Video />
      {/* <div style={{ marginTop: '1rem' }} className=''>
        <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2.5rem' }}>FEATURED PROPERTIES</h2>
        <HomeList currentList={currentList} />
        <Pagination totalPosts={allProperties.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div> */}

      <ListingsPage />
      {/* <HotelListing/>
      <BookingPreview/> */}
      <TravelCarousel />
      <FarmDeals />
      <Testimonials />

      {/* <div className="home-content">
        <div className="content-wrapper" data-aos="zoom-in" data-aos-delay="60">
          <h6>
            Discover Mayi Farms , a prestigious collection of independent luxury
            hotels in the alluring area of Goa, India. Discover a world of
            unrivalled luxury and hospitality. Check out our beautiful
            properties right away!
          </h6>
          <div className="inner-wrapper">
            <p>
              Experience the ideal getaway in Cuba Goa, where your family can
              take pleasure in sand beaches, sports courts, and playgrounds.
              This resort is the ideal city vacation because it offers stunning
              views and a variety of outdoor excursions that can be rented.
              Expect to find all the comforts you want while travelling,
              together with breathtaking scenery. We provide a break from the
              ordinary with extravagant hospitality offerings.
            </p>
            <p>
              A treasure trove of leisure can be found in the sun-kissed beaches
              and stunning scenery. Hotels in Cuba Goa is an unmatched haven for
              both leisure and business, creating the ideal getaway for families
              and productive conclaves. A broad international and local cuisine
              awaits, nestled in the embrace of nature. These delicious foods go
              nicely with our exotic drinks, adding to South Goa's serene vibe
              as an oasis of elegant beauty
            </p>
          </div>
        </div>
      </div> */}

      <div className="">
        <div className="headers">
          <div className="monthly-tag">
            Farms Featured <span className="line"></span>
          </div>
          <h1 className="title">Featured Properties</h1>
          <p className="description">
            our forms houes offers a variety of experience
          </p>
        </div>

        <div
          style={{
            border: "0.2px solid lightgrey",
            width: "30%",
            margin: "auto",
          }}
        ></div>
        <div className="container">
          <FeaturedProperties
            // ref={ref}
            properties={allProperties}
            loading={isLoading}
            settingLoading={setLoading}
            viewRooms={viewRooms}
            arrow={arrow}
          />

          {/* {allProperties
            .filter((resort) => {
              // console.log(resort);
              if (resort.type === "resort") {
                return resort;
              }
            })
            .map((property, index) => {
              console.log(property.resortImgURL);
              return (
                <div className="card" key={index + 1}>
                  <div className="img-wrap1">
                    <img
                      className={`${
                        isLoading === index ? "loaded" : "loading"
                      }`}
                      data-src={property.resortImgURL}
                      onLoad={() => setLoading(index)}
                      alt="resortImg"
                      data-index={index}
                    />
                  </div>
                  <div className="content">
                    <h3 className="resort_name">{property.resortName}</h3>
                    <p className="resort_description">
                      {property.resortDescription}
                    </p>
                    <div
                      className="button-wrap"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        viewRooms(property._id, property.resortName)
                      }
                    >
                      <p style={{ color: "red" }}>view room </p>
                      <div style={{ cursor: "pointer" }}>
                        <img src={arrow} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })} */}
        </div>
      </div>

      <div className="property-locations">
        <div className="location-header">
          <div style={{ display: "none" }}>
            <Icon icon={location2} size={30} style={{ color: "orange" }}></Icon>
          </div>
          <h3 style={{}}>Mayi Farms Property Locations</h3>
        </div>
        <div className="dummy-border"></div>

        <div className="location-addresses">
          {allProperties.slice(0, 5).map((resort, i) => {
            return (
              <section className="address-section" key={i + 1}>
                <h6>{resort.resortName}</h6>
                <div></div>
                <p>{resort.resortAddress}</p>
              </section>
            );
          })}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // className="modal"
      >
        <Box sx={style} className="modalbox">
          <Icon
            icon={cross}
            size={15}
            className="close_modal_icon"
            onClick={handleClose}
          />
          <div className="modal_container">
            <div className="modal_img_container">
              {/* <img src={cloud} alt="modal_image" className="modal_img" /> */}
              <img
                src={
                  // "https://images.pexels.com/photos/1645028/pexels-photo-1645028.jpeg?auto=compress&cs=tinysrgb&w=600"
                  "https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
                alt="modal_image"
                className="modal_img"
              />
            </div>
            <div className="modal_containt">
              <h2 className="header_imag_modal">
                {/* <img
                  src={cubaIcon}
                  style={{ width: "150px", height: "70px" }}
                  alt=""
                /> */}
                Mayi Farms
              </h2>
              <h4 className="modal_containt_header">Welcome Back!</h4>
              <p className="modal_main_containt">
                As a token of our appreciation, enjoy a 20% discount on your
                next purchase!
              </p>
              <p className=" modal_code">
                Use code: <span className="code_higlight">REPEAT20</span>
              </p>
              <p className="modal_main_containt ">
                If you are repeat customer enter your{" "}
                <span className="higlight_element">email id</span>
              </p>
              <input
                className="modal_input"
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <button
                className="modal_email_submit"
                onClick={handleCouponSubmit}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* <button className="button__loader">
        <span className="button__text">Become a member</span>
      </button> */}
      <Footer />

      <WhatsAppIcon
      
        phoneNumber="9549549904"  // Replace with your phone number
        message="Hello! I'm interested in your services."  // Optional pre-filled message
        position="right"  // 'right' or 'left'
        animated={true}  // Enable/disable pulsing animation
      />
    </div>
  );
};

export default Home;
