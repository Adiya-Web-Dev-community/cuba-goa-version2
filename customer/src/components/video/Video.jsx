/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import beachResort from "../../assets/resort.mp4";
import "../../styles/main.css";
import { useNavigate } from "react-router";
import axios from "../../helpers/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
// import homeVideo from "../../assets/HomeVideo.mp4";
// import homeVideo from "../../assets/homeVideo2.mp4";
// import homeVideo from "../../assets/home_3.mp4";
import home_image from "../../assets/exterior-1597098_1280.jpg";

//image
import resortImage from "../../assets/palolemImg.png";
import { Button } from "@mui/material";

const Video = ({ issearchBox }) => {
  const navigate = useNavigate();

  //reducer dispatch
  const dispatch = useDispatch();

  //SHOW ROOMS

  // console.log("allProperties =>", allProperties);

  ///resizing know window width for display second calender

  // console.log(isScreenSmall);

  // Handle Check Available

  return (
    <div className="main">
      {/* <div className="drop_shadow">
        <video
          src={homeVideo}
          autoPlay
          loop
          muted
          data-aos="flip-left"
          data-aos-delay="600"
          data-aos-easing="ease-in-out"
        />
      </div> */}

      <div className="drop_shadow">
        <img src={home_image}
          
          data-aos="flip-left"
          data-aos-delay="600"
          data-aos-easing="ease-in-out"
        />
      </div>

      {/* <div
        className="home-text"
        data-aos="zoom-in"
        data-aos-delay="2000"
        data-aos-easing="ease-in-out"
      >
        <h1>Captivating Paradise</h1>
        <h4>for unwinding and reveling</h4>
      </div> */}

      {/*responsive old home-search-box */}
      {/* <div className="home-search-box"> */}
      {/* <div className="row1">
          <div>
            <label>CHECK-IN DATE</label>
            <input
              type="date"
              id="myDate"
              placeholder="Check-in Date"
              name="checkindate"
              value={checkindate}
              onChange={(e) => setCheckindate(e.target.value)}
            />
          </div>
          <div>
            <label>CHECK-OUT DATE</label>
            <input
              type="date"
              id="myDate"
              placeholder="Check-in Date"
              name="checkoutdate"
              value={checkoutdate}
              onChange={(e) => setCheckoutdate(e.target.value)}
            />
          </div>
          <div onClick={handleCheckAvailable}>CHECK AVAILABILITY</div>
        </div> */}

      {/* <div className="row2">
          <label
            style={{
              letterSpacing: "2px",
              paddingLeft: ".1rem",
              fontWeight: "bold",
            }}
          >
            SEARCH RESORT
          </label>

          <select
            id="select"
            name="resort"
            value={resortId}
            onChange={(e) => setResortId(e.target.value)}
          >
            <option>SELECT RESORT</option>
            {allProperties.map((resort, i) => {
              return <option value={resort._id}>{resort.resortName}</option>;
            })}
          </select>
        </div>

        <div className="row3" onClick={handleCheckAvailable}>
          CHECK AVAILABILITY
        </div>
      </div> */}

      {/* <div className="home-search-box-desktop"> */}
      {/* <div>
          <label className="dates">Check-in date</label>
          <input
            type="date"
            id="myDate"
            className="custom-date-input"
            placeholder="dd/mm/yyyy"
            name="checkindate"
            value={checkindate}
            onChange={(e) => setCheckindate(e.target.value)}
          />
        </div>
        <div>
          <label>CheckIn Date</label>
          <input
            type="date"
            id="myDate"
            className="custom-date-input"
            placeholder="dd/mm/yyyy"
            name="checkoutdate"
            value={checkoutdate}
            onChange={(e) => setCheckoutdate(e.target.value)}
          />
        </div> */}
      {/* <div>
          <select
            id="select"
            name="resort"
            value={resortId}
            onChange={(e) => setResortId(e.target.value)}
          >
            <option>SELECT RESORT</option>
            {allProperties.map((resort, i) => {
              return <option value={resort._id}>{resort.resortName}</option>;
            })}
          </select>
        </div>
        <div
          onClick={handleCheckAvailable}
          style={{ paddingTop: ".35rem", fontSize: ".9rem" }}
        >
          CHECK AVAILABILITY
        </div>
      </div> */}

      {/*comment for small of time */}
      {/* {issearchBox && ( */}
    </div>
  );
};

export default Video;

// {/* export default Video; */}

// {  /* <div className="home-search-box-desktop">
// <div className="small_card_img">
//   <img className="card_img" src={resortImage} alt="beach reasort img" />
// </div>
// <div className="select-btnwrap">
//   <label>Looking For?</label>
//   <select
//     id="select"
//     name="resort"
//     value={resortId}
//     onChange={(e) => setResortId(e.target.value)}
//   >
//     <option>SELECT RESORT</option>
//     {allProperties.map((resort, i) => {
//       return <option value={resort._id}>{resort.resortName}</option>;
//     })}
//   </select>
// </div>

// <div className="dates_container with-line">
//   <div className="containt_wraper">
//     <h2 className="dates_heading">Start to end Dates</h2>
//     <div className="dates_wrapper">
//       <label className="date_holder">
//         {`${format(selecteDated.startDate, "MM/dd/yyyy")} to ${format(
//           selecteDated.endDate,
//           "MM/dd/yyyy"
//         )}`}
//       </label>
//       <button
//         className="toggle_calender"
//         onClick={() => handlingToggling()}
//       >
//         <SlCalender />
//       </button>
//     </div>
//   </div>

//   {!isScreenSmall && toggler && (
//     <DateRangePicker
//       className="dateRange"
//       ranges={[selecteDated]}
//       onChange={(range) => handlingSelectDate(range)}
//       direction="horizontal"
//       minDate={new Date()}
//       preventSnapRefocus={true}
//     />
//   )}

//   {isScreenSmall && toggler && (
//     <Calendar
//       className="dateRange"
//       ranges={[selecteDated]}
//       onChange={(range) => handlingSelectDate(range)}
//       // direction="horizontal"
//       minDate={new Date()}
//       preventSnapRefocus={true}
//       orientation={orientation}
//     />
//   )}
// </div>
//  <div className="dates-wrap">
//   <label className="dates">Check-out Date</label>
//   <input
//     type="date"
//     id="myDate"
//     className="custom-date-input"
//     placeholder="dd/mm/yyyy"
//     name="checkoutdate"
//     value={checkoutdate}
//     onChange={(e) => setCheckoutdate(e.target.value)}
//   />
//   </div>

// <div className="check_availability" onClick={handleCheckAvailable}>
//   CHECK <br />
//   AVAILABILITY
// </div>
//   </div> */}
