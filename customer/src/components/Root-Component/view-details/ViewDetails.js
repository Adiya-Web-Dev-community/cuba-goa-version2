import React, { useEffect, useState } from "react";
import "./ViewDetails.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../../helpers/axios";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
import { FaUser } from "react-icons/fa";
import { TiUser } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { AiOutlineCaretRight } from "react-icons/ai";
import Images from "./Images";
import RoomCard from "./RoomCard/RoomCard/RoomCard";
import Reviews from "./reviews/Reviews";
import ResortVideo from "./Resort-Videos/ResortVideo";
import ResortAminities from "./ResortAminities/ResortAminities";

import { BiArrowFromLeft, BiFemale } from "react-icons/bi";
import { BiArrowFromRight } from "react-icons/bi";
import { BiMessageSquareError } from "react-icons/bi";
import { BiBed } from "react-icons/bi";
import { MdPets } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { FaBed } from "react-icons/fa";
import { FaBaby } from "react-icons/fa";
import { AiTwotonePhone } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import Footer from "../Footer/Footer";

const ViewDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line

  const [resort, setResort] = useState({});
  const [imgArr, setImgArr] = useState([]);
  const [roomArr, setRoomArr] = useState([]);
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [msg, setMsg] = useState("");
  // eslint-disable-next-line
  const [roomstatus, setroomstatus] = useState(false);
  const [activeBtn, setActiveBtn] = useState(true);
  const [price, setPrice] = useState("");
  const [hotelType, setHotelType] = useState();

  // eslint-disable-next-line
  const { resortname, id } = useParams();

  //get user details
  const token = localStorage.getItem("token");
  //get sigined in client details
  const [user, setUser] = useState([]);
  const getUser = async () => {
    try {
      const response = await axios.get("/user-details", {
        headers: {
          authorization: token,
        },
      });
      if (response.data.success) {
        console.log("userdata=>", response.data.details);
        setUser(response.data.details);
      } else {
        console.log("usererr", response.data.message);
      }
    } catch (err) {
      console.log("userdetailserr", err);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  //GET PROPERTY DETAILS
  const getProperty = async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    try {
      const response = await axios.get(`/resort-details/${id}`);
      console.log("response => ", response);
      setResort(response.data.resortData[0]);
      setRoomArr(response.data.resortData[0].rooms);
      setImgArr(response.data.resortData[0].rooms[0].imgUrl);

      dayOfWeek === 0 || dayOfWeek === 6
        ? setPrice("weekendPrice")
        : setPrice("weekdayPrice");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProperty();
    console.log("useEffect => ", resort.type);
    // eslint-disable-next-line
  }, [id]);

  //get reviews of property

  const [reviewsStatus, setReviewsStatus] = useState(false);
  const getRatingList = async () => {
    // console.log('id=>', id)
    const response = await axios.get(`/get-reviews/${id}`);
    console.log("reviews", response.data.list);
    if (response.data.list.length <= 0) {
      setReviewsStatus(false);
    } else {
      setReviewsStatus(true);
      setReviews(response.data.list);
    }
  };

  useEffect(() => {
    getRatingList();
    //eslint-disable-next-line
  }, []);

  //handle reserve
  const [reserveTable, setReserveTable] = useState({
    date: "",
    time: "",
    noOfGuests: "",
  });
  const handleInputs = (e) => {
    setReserveTable((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleReserve = async () => {
    console.log(reserveTable);
    const data = {
      name: user.name,
      contact: user.contact,
      date: reserveTable.date,
      time: reserveTable.time,
      noOfGuests: reserveTable.noOfGuests,
    };
    try {
      if (!token) {
        return toast.error(
          "Cannot find your details. Please signin to your account"
        );
      } else {
        const resp = await axios.post("/reserve-table", data);
        console.log(resp);
        toast.success("We reserved a table for you !");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="view-details-wrapper">
        {resort.type === "restaurant" ? (
          <img
            style={{ width: "100%", height: "100vh" }}
            src={resort.resortImgURL}
            alt={resort.resortName}
          />
        ) : (
          <ResortVideo resortname={resortname} />
        )}

        <div className="resort-name">
          <h2>{resortname}</h2>
        </div>

        {/* section1 */}
        {/* section1 ends*/}

        <div className="section2">
          <div className="property-info">
            {/* <div>
              {
                [...Array(5)].map((star, index) => {
                  return (
                    <FaStar size={20} style={{ color: 'orange' }} key={index + 1} />
                  )
                })
              }
            </div> */}
            <p>{resort.resortDescription}</p>
          </div>
        </div>

        {/* <RoomCard resortId={id} resortname={resortname}
          room={room}
          cart={cart} setCart={setCart}
          roomArr={roomArr} price={price}
          msg={msg} setMsg={setMsg} setroomstatus={setroomstatus}
          activeBtn={activeBtn} setActiveBtn={setActiveBtn}
          /> */}

        {resort.type !== "restaurant" ? (
          <section className="roomTable-container">
            {/* <div className='roomTable-searchbar'>
            <p>Check-in date</p>
            <p>Check-out date</p>
          </div>
          <div>
            <button>
              Search
            </button>
          </div> */}
            <CTable responsive>
              <CTableHead className="view-details-roomtable-header">
                <CTableRow>
                  <CTableHeaderCell className="cell" scope="col">
                    Room type
                  </CTableHeaderCell>
                  <CTableHeaderCell className="cell" scope="col">
                    Sleeps
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="cell"
                    scope="col"
                  ></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roomArr?.map((room, idx) => {
                  return (
                    <CTableRow
                      className="view-details-roomtable-row"
                      key={room._id}
                    >
                      <CTableHeaderCell
                        onClick={() =>
                          navigate(
                            `/${id}/${room.roomType}/${room.roomId}/details`
                          )
                        }
                        className="cell"
                        scope="row"
                        style={{
                          color: "#3376b0",
                          fontWeight: "700",
                          borderRight: "1px solid #3376b0",
                        }}
                      >
                        <p>
                          <span>
                            <AiOutlineCaretRight
                              style={{ marginRight: "5px", color: "goldenrod" }}
                            />
                          </span>
                          {room.roomType}
                        </p>
                        {/* {<p style={{color: 'black', fontsize: '12px'}}>{room.seaView ? "with sea view" : null}</p>} */}
                      </CTableHeaderCell>
                      <CTableDataCell
                        className="cell"
                        style={{ borderRight: "1px solid #3376b0" }}
                      >
                        <span>
                          <FaUser style={{ color: "#3376b0" }} /> ×{" "}
                          <span>{room.adultCapacity}</span>
                        </span>
                        <span style={{ marginLeft: "15px" }}>
                          <TiUser style={{ color: "#3376b0" }} /> ×{" "}
                          <span>{room.childrenCapacity}</span>
                        </span>
                      </CTableDataCell>
                      <CTableDataCell className="cell">
                        <button
                          className="show-prices-btn"
                          onClick={() =>
                            navigate(`/${resortname}/${id}/rooms-table`)
                          }
                        >
                          Show prices
                        </button>
                      </CTableDataCell>
                    </CTableRow>
                  );
                })}
              </CTableBody>
            </CTable>
          </section>
        ) : null}

        {/* <div className='booking-setion section3' id='booking-section' >
          <h3 data-aos="zoom-in" data-aos-delay='20' style={{ fontFamily: 'Geomainist' }}>Choose Your Room</h3>
          <div className='booking-wrapper'>
            <div className='room-card-wrapper'>
              {roomArr.map((room, i) => {
                return (
                  <RoomCard resortId={id} resortname={resortname}
                    room={room}
                    cart={cart} setCart={setCart}
                    roomArr={roomArr} price={price}
                    msg={msg} setMsg={setMsg} setroomstatus={setroomstatus}
                    activeBtn={activeBtn} setActiveBtn={setActiveBtn}
                    key={i + 1} />
                )
              })}
            </div>

          </div>
        </div> */}
        {/* section3 booking section ends */}

        {resort.type === "resort" ? (
          <ResortAminities resortname={resortname} />
        ) : null}

        {/* house rules */}
        {resort.type !== "restaurant" ? (
          <div className="house-rule-wrap">
            <h4>HOUSE RULES</h4>
            <p>{resortname} takes special requests</p>
            <section>
              <div>
                <section>
                  <secion>
                    <BiArrowFromLeft className="icon" />
                  </secion>
                  <p>Check-in</p>
                </section>
                <section style={{ display: "flex", flexDirection: "column" }}>
                  <p>From 13:00</p>
                  <p>
                    Guests are required to show a photo identification and
                    credit card upon check-in
                  </p>
                </section>
              </div>
              <div>
                <section>
                  <secion>
                    <BiArrowFromRight className="icon" />
                  </secion>
                  <p>Check-out</p>
                </section>
                <section>
                  <p>Until 10:00</p>
                </section>
              </div>
              <div>
                <section>
                  <secion>
                    <BiMessageSquareError className="icon" />
                  </secion>
                  <p>
                    Cancellation/
                    <br />
                    Prepayment
                  </p>
                </section>
                <section style={{ display: "flex", flexDirection: "column" }}>
                  <p>
                    Cancellation and prepayment policies vary according to
                    accommodation type. Please check what
                    <span
                      onClick={() => navigate("/terms-conditions")}
                      style={{ margin: "0 .3rem", color: "blue" }}
                    >
                      conditions
                    </span>
                    may apply to each option when making your selection.
                  </p>
                </section>
              </div>
              <div className="childpolicies">
                <section>
                  <secion>
                    <FaBaby className="icon" />
                    <BiBed className="icon" />
                  </secion>
                  <p>Children and beds</p>
                </section>
                <section style={{ display: "flex", flexDirection: "column" }}>
                  <h6 style={{ color: "darkblack" }}>Child Policies</h6>
                  <p>Children of any age are welcome.</p>
                  <p>
                    Children aged 5 years and above are considered adults at
                    this property.
                  </p>
                  <p>
                    To see correct prices and occupancy information, please add
                    the number of children in your group and their ages to your
                    search.
                  </p>
                  <h6 style={{ color: "darkblack" }}>
                    Cot and extra bed policies
                  </h6>
                  <div className="row1">
                    <h6>0-4 years</h6>
                    <div className="inner-row1">
                      <span style={{ display: "flex", gap: "1rem" }}>
                        <p>
                          <FaBed />
                        </p>
                        <p>Extra bed upon request</p>
                      </span>
                      <span>FREE</span>
                    </div>
                  </div>

                  <div className="row1" style={{ marginTop: "1rem" }}>
                    <h6>5+ years</h6>
                    <p>
                      <div className="inner-row1">
                        <span style={{ display: "flex", gap: "1rem" }}>
                          <p>
                            <FaBed />
                          </p>
                          <p>Extra bed upon request</p>
                        </span>
                        <span>₹ 1,000 per person, per night</span>
                      </div>
                    </p>
                  </div>
                  <p style={{ marginTop: ".5rem" }}>
                    Prices for extra beds are not included in the total price,
                    and will have to be paid for separately during your stay.
                  </p>
                  <p>
                    The number of extra beds allowed is dependent on the option
                    you choose. Please check your selected option for more
                    information.
                  </p>
                  <p>There are no cots available at this property.</p>
                  <p>All extra beds are subject to availability.</p>
                </section>
              </div>
              <div>
                <section>
                  <secion>
                    <BiFemale className="icon" />
                  </secion>
                  <p>No age restriction</p>
                </section>
                <section>
                  <p>There is no age requirement for check-in</p>
                </section>
              </div>
              <div>
                <section>
                  <secion>
                    <MdPets className="icon" />
                  </secion>
                  <p>Pets</p>
                </section>
                <section>
                  <p>Pets are not allowed.</p>
                </section>
              </div>
              <div>
                <section>
                  <secion>
                    <GiCash className="icon" />
                  </secion>
                  <p>Accepted payment methods</p>
                </section>
                <section>
                  <p>
                    <span style={{ padding: "0 .2rem" }}>{resortname}</span>{" "}
                    accepts all types of cards and reserves the right to
                    temporarily hold an amount prior to arrival.
                  </p>
                </section>
              </div>
            </section>
          </div>
        ) : (
          // Dinning area for restaurants
          <>
            <div className="dinning-wrap">
              <h4>Unique Dinning</h4>
              <div>
                <div className="col1">
                  <img
                    src="https://images.pexels.com/photos/11743233/pexels-photo-11743233.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="col2">
                  <div className="row1">
                    <span className="call">
                      <AiTwotonePhone style={{ marginRight: ".3rem" }} />
                      Contact : 1234567
                    </span>
                    <span className="menu">
                      <AiFillClockCircle style={{ marginRight: ".3rem" }} />
                      Timings : 10AM - 11PM
                    </span>
                  </div>
                  <div className="row3">
                    <p style={{ letterSpacing: "5px" }}>
                      Enjoy Regional, Multi-Cousine, Grill, Bakery & Patisserie
                    </p>
                  </div>
                  <div className="row2">
                    <p>
                      In our bid to deliver authentic, undiluted experiences,
                      we’ve introduced a unique regional home style dining
                      experience. Always prepared with a local touch, the
                      home-style cooking ensures that you maintain good health
                      throughout your stay. And at the same time it gives you
                      the opportunity to dabble in the local delicacies.
                    </p>
                  </div>

                  <div className="form-container">
                    <form>
                      <div className="form-row">
                        <div className="form-group">
                          <label for="date">Date :</label>
                          <input
                            type="date"
                            id="date"
                            className="custom-date-input"
                            name="date"
                            value={reserveTable.date}
                            required
                            style={{ marginLeft: ".5rem", padding: ".5rem" }}
                            onChange={handleInputs}
                          />
                        </div>
                        <div className="form-group">
                          <label for="date">Time :</label>
                          <input
                            type="Time"
                            id="date"
                            min="09:00"
                            max="18:00"
                            name="time"
                            value={reserveTable.time}
                            required
                            style={{ marginLeft: ".5rem", padding: ".5rem" }}
                            onChange={handleInputs}
                          />
                        </div>
                        <div className="form-group">
                          <label for="guests">Number of Guests :</label>
                          <input
                            type="number"
                            id="guests"
                            min="1"
                            max="10"
                            required
                            name="noOfGuests"
                            value={reserveTable.noOfGuests}
                            onChange={handleInputs}
                            style={{ marginLeft: ".5rem", padding: ".5rem" }}
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="row4" style={{ display: "flex" }}>
                    <button
                      onClick={() => {
                        handleReserve();
                      }}
                    >
                      RESERVE TABLE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* <Reviews reviews={reviews} setReviews={setReviews} id={id} /> */}
        <div style={{ width: "85%", margin: "auto", marginTop: "3rem" }}>
          {reviewsStatus ? <h5>REVIEWS</h5> : null}
        </div>
        <div className="review-outer-wrap">
          {reviewsStatus ? (
            <div className="review-inner-wrap">
              {reviews.map((el, i) => {
                return (
                  <div className="review-card">
                    <section
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>{el.name}</h5>
                      <div>
                        {[...Array(5)].map(() => {
                          return (
                            <TiStarFullOutline style={{ color: "orange" }} />
                          );
                        })}
                      </div>
                    </section>
                    <section className="contentsection">
                      <p
                        style={{
                          wordBreak: "break-word",
                          textAlign: "justify",
                        }}
                      >
                        {el.additionalComments}
                      </p>
                    </section>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewDetails;
