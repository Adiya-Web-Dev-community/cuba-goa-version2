import React, { useEffect, useState } from "react";
import "../view-details/ViewDetails.css";
import "./WeddingDetails.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../../helpers/axios";
import { toast } from "react-hot-toast";
import { GiTicket } from "react-icons/gi";
import { BsCircleFill } from "react-icons/bs";
import { AiOutlineUngroup } from "react-icons/ai";
import EnquiryForm from "./EnquiryForm";
import Footer from "../Footer/Footer";
import ChatOpeningButton from "../Chat/ChatOpeningButton";

const ViewDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line

  const [resort, setResort] = useState({});
  const [imgArr, setImgArr] = useState([]);
  const [reviews, setReviews] = useState([]);
  // eslint-disable-next-line
  const [roomstatus, setroomstatus] = useState(false);

  // eslint-disable-next-line
  const { resortID, resortName } = useParams();

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
    try {
      const response = await axios.get(`/resort-details/${resortID}`);
      console.log("response => ", response);
      setResort(response.data.resortData[0]);
      setImgArr(response.data.resortData[0].rooms[0].imgUrl);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, []);

  if (!resort) {
    return <p>.</p>;
  }
  return (
    <>
      <div className="view-details-wrapper">
        <img
          style={{ width: "100%", height: "100vh" }}
          src={resort.resortImgURL}
          alt={resort.resortName}
        />

        <div className="resort-name">
          <h2>{resortName}</h2>
        </div>

        <div className="section2">
          <div className="property-info">
            <p>{resort.resortDescription}</p>
          </div>
        </div>

        <div className="conviniences">
          <h4>CONVENIENCES</h4>
          <div className="wrap">
            <p>Spacious Event Space</p>
            <p>Catering Services</p>
            <p>Lighting and Decorations </p>
            <p>Audio-Visual Equipment</p>
            <p>Bride & Groom Suite</p>
            <p>Stage and Dance Floor</p>
          </div>
        </div>
      </div>

      <EnquiryForm />

      <ChatOpeningButton />
      <Footer />
    </>
  );
};

export default ViewDetails;
