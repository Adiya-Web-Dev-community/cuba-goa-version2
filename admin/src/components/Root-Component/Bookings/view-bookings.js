import { useState } from "react";
import axios from "../../../helpers/axios";
import "./view-bookings.css";
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer/Footer";
import BookingList from "./bookingList";
import PreLoader from "../../Preloader-Component/Preloader-Component";
import ChatOpeningButton from "../../Chat/ChatOpeningButton";

const ViewBooking = () => {
  const [filterCriteria, setFilterCriteria] = useState();
  const [filterInput, setFilterInput] = useState();
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"));
  const fetchBookingList = async () => {
    await axios
      .get("/get-all-bookings", {
        headers: {
          authorization: token.authorization,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setBookingList(res?.data?.data?.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useState(() => {
    fetchBookingList();
  }, [bookingList]);

  // if (!bookingList) {
  //   return <PreLoader />;
  // }

  // console.log("Booking List => ", bookingList)
  return (
    <>
      <Header />
      <div className="booking-list-container">
        {/* <div>
                    <section className="booking-list-filter-bar">
                        <label htmlFor="booking-list-select-tag">Filter By</label>
                        <select id="booking-list-select-tag" onChange={(e) => {setFilterCriteria(e.target.value); searchFilter(e.target.value)} }>
                            <option>Client Name</option>
                            <option>Client Contact</option>
                            <option>Client Email</option>
                            <option>Reservation ID</option>
                            <option>Resort Name</option>
                            <option>Check in Date</option>
                            <option>Check out Date</option>
                        </select>
                    </section>
                    <section>
                        <input onChange={(e) => handleInputFilter(e)}/>
                    </section>
                </div> */}
        <BookingList
          bookingList={bookingList}
          setBookingList={setBookingList}
        />
      </div>
      <div style={{ marginTop: "10rem" }}>
        <Footer />
      </div>
      {/* {console.log(filterCriteria)} */}
      {/* {console.log(filterInput)} */}

      <ChatOpeningButton />
    </>
  );
};

export default ViewBooking;
