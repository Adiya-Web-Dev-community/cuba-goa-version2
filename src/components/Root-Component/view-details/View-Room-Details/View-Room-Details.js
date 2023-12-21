import { useState, useEffect } from "react";
import "./View-Room-Details.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../../../helpers/axios";
import { Icon } from "react-icons-kit";
import Footer from "../../Footer/Footer";
import rupee from "../../../../assets/rupee-indian.png";
import { FaMale } from "react-icons/fa";
import { FaBaby } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { MdBalcony } from "react-icons/md";
import { IoMdFlower } from "react-icons/io";
import { TbMassage } from "react-icons/tb";
import { MdOutlineSportsTennis } from "react-icons/md";
import ChatOpeningButton from "../../Chat/ChatOpeningButton";

const ViewRoomDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();

  //use params
  const { resortId, roomType, roomId } = useParams();

  // eslint-disable-next-line
  const [resortDetails, setResortDetails] = useState();
  const [roomDetails, setRoomDetails] = useState();
  const [resortname, setResortName] = useState("");
  const [imgArr, setImgArr] = useState([]);
  const [currentImg, setCurrentImg] = useState("");

  const fetchRoomDetails = async () => {
    await axios
      .get(`/resort-room/${resortId}/${roomId}`)
      .then((res) => {
        console.log("room", res.data.data);
        setRoomDetails(res.data.data);
        setImgArr(res.data.data.imgUrl);
        setCurrentImg(res.data.data.imgUrl[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(roomDetails)
  const getresort = async () => {
    const resp = await axios.get(`/resort-details/${resortId}`);
    console.log("resort", resp.data.resortData);
    setResortDetails(resp.data.resortData);
    setResortName(resp.data.resortData[0]?.resortName);
  };
  useEffect(() => {
    fetchRoomDetails();
    getresort();
    setResortName(resortname);
    // eslint-disable-next-line
  }, []);

  if (!roomDetails || !resortDetails) {
    return <>.</>;
  }

  return (
    <>
      <div className="view-details-container">
        <div className="imgwrap">
          <div className="imgdiv">
            <img src={currentImg} alt="roomImg" />
          </div>
          <div className="imgscroll">
            {imgArr.map((img, i) => {
              return (
                <img
                  src={img}
                  alt=""
                  onMouseEnter={() => setCurrentImg(img)}
                  style={{ width: "5rem" }}
                />
              );
            })}
          </div>
        </div>

        {/* content wrapper */}
        <div className="contentWrap">
          <h3 className="heading">{roomType}</h3>
          <h5>Capacity</h5>
          <div className="row1">
            <div>
              <FaMale className="icon" />
              <p>Adults</p>
              <p>{roomDetails.adultCapacity}</p>
            </div>
            <div>
              <FaBaby className="icon" />
              <p>Children</p>
              <p>{roomDetails.childrenCapacity}</p>
            </div>
          </div>

          <h5>Prices</h5>
          <div className="row2">
            <div>
              <p>
                Weekday Price Per Night :{" "}
                <span>
                  <img src={rupee} alt="" style={{ opacity: "0.6" }} />
                  {roomDetails.weekdayPerNightRate}
                </span>
              </p>
            </div>
            <div>
              <p>
                Weekend Price Per Night :{" "}
                <span>
                  <img src={rupee} alt="" style={{ opacity: "0.6" }} />
                  {roomDetails.weekendPerNightRate}
                </span>
              </p>
            </div>
          </div>

          <h5>Specilitites</h5>
          <div className="row3">
            <div className="aminity">
              <MdOutlineFreeBreakfast style={{ color: "#BB8B02" }} />
              <span>Breakfast</span>
            </div>
            <div className="aminity">
              <MdBalcony style={{ color: "darkblue" }} />
              <span>Balcony</span>
            </div>
            <div className="aminity">
              <IoMdFlower style={{ color: "orangered" }} />
              <span>Garden View</span>
            </div>
            <div className="aminity">
              <TbMassage />
              <span>Spa</span>
            </div>
            <div className="aminity">
              <MdOutlineSportsTennis style={{ color: "brown" }} />
              <span>Kids play area</span>
            </div>
          </div>

          <h5>Aminties</h5>
          <div className="row4">
            {roomDetails.Wifi ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Wifi</span>
              </div>
            ) : null}

            {roomDetails.airconditioned ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Air Conditioned</span>
              </div>
            ) : null}

            {roomDetails.bedsideTable ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Bedside Table</span>
              </div>
            ) : null}

            {roomDetails.fitnessCenter ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Fitness Center</span>
              </div>
            ) : null}

            {roomDetails.mosquitonet ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Mosquitonet</span>
              </div>
            ) : null}

            {roomDetails.roomService ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Room Service</span>
              </div>
            ) : null}

            {roomDetails.swimmingPool ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Swimming Pool</span>
              </div>
            ) : null}

            <div className="aminity">
              <FaCheck className="icon" />
              <span>Seating Area</span>
            </div>
            <div className="aminity">
              <FaCheck className="icon" />
              <span>Telephone</span>
            </div>
            <div className="aminity">
              <FaCheck className="icon" />
              <span>Work desk</span>
            </div>
            <div className="aminity">
              <FaCheck className="icon" />
              <span>Linen</span>
            </div>
            <div className="aminity">
              <FaCheck className="icon" />
              <span>Toiletries</span>
            </div>
            <div className="aminity">
              <FaCheck className="icon" />
              <span>Wake up calls</span>
            </div>
            <div className="aminity">
              <FaCheck className="icon" />
              <span>Laundry service</span>
            </div>
            <div className="aminity">
              <FaCheck className="icon" />
              <span>In room dine</span>
            </div>
            {roomDetails.hotNcoldshower_24hrs ? (
              <div className="aminity">
                <FaCheck className="icon" />
                <span>Hot & Cold shower </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ChatOpeningButton />
      <Footer />
    </>
  );
};

export default ViewRoomDetails;
