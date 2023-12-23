import "./OurProperties.css";
import "./EditRoomForm.css";
import React, { useEffect } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { RiHotelLine } from "react-icons/ri";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../helpers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CButton,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CRow,
  CFormTextarea,
  CFormCheck,
  CCard,
  CCardHeader,
  CCardBody,
  CImage,
} from "@coreui/react";
import swal from "sweetalert";
import { RiDeleteBin5Fill } from "react-icons/ri";

const EditRoomForm = ({ getProperty, room, resort, index }) => {
  const [editRoomFormVisible, setEditRoomFormVisible] = useState(false);
  const [editRoomBtnActive, setEditRoomBtnActive] = useState(false);
  const [updatedRoomData, setUpdatedRoomData] = useState(room);
  const [editRoomFormData, setEditRoomFormData] = useState({
    imgUrl: [],
    roomId: "",
    roomType: "",
    totalRooms: "",
    availableRooms: "",
    adultCapacity: "",
    childrenCapacity: "",
    weekdayPerNightRate: "",
    weekendPerNightRate: "",
    occassionName: "",
    occassionStartDate: "",
    occassionEndDate: "",
    occassionPerNightRate: "",
    nonRefundable: false,
    wardrobe: false,
    bedsideTable: false,
    houseKeeping: false,
    balcony: false,
    breakfast: false,
    mosquitonet: false,
    Wifi: false,
    hotNcoldshower_24hrs: false,
    airconditioned: false,
    seaView: false,
    fitnessCenter: false,
    swimmingPool: false,
    spa: false,
  });

  const [roomImages, setRoomImages] = useState([]);
  const [roomImgUrl, setRoomImgUrl] = useState(false);
  const token = localStorage.getItem("user");

  const handleEditRoomForm = (params) => (e) => {
    setUpdatedRoomData({ ...updatedRoomData, [params]: e.target.value });
  };

  const deleteImage = (index) => {
    let updatedImgUrl = updatedRoomData.imgUrl.filter((image, i) => {
      if (i != index) {
        return image;
      }
    });
    setUpdatedRoomData({ ...updatedRoomData, imgUrl: updatedImgUrl });
  };

  const imgCloudUpload = async (e) => {
    e.preventDefault();
    setEditRoomBtnActive(true);
    console.log(updatedRoomData.imgUrl);
    if (!updatedRoomData.roomType) {
      setEditRoomBtnActive(false);
      return toast.error("Please fill room type !");
    }
    let arr = [];
    for (let i = 0; i < roomImages.length; i++) {
      const imgData = new FormData();
      imgData.append("file", roomImages[i]);
      imgData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      await axios
        .post(process.env.REACT_APP_CLOUDINARY_URL, imgData)
        .then((res) => {
          // console.log(res)
          arr.push(res.data.secure_url);
          // console.log(resortForm)
        })
        .catch((err) => {
          setEditRoomBtnActive(false);
          console.log(err);
        });
    }
    let updattedArr = [...arr, ...updatedRoomData.imgUrl];
    setUpdatedRoomData({ ...updatedRoomData, imgUrl: updattedArr });
    setEditRoomBtnActive(false);
    setRoomImgUrl(arr);
  };

  const saveRoom = async () => {
    if (!resort) return;
    resort.rooms.splice(index, 1, updatedRoomData);
    await axios
      .put(`/hotelbook/${resort._id}`, resort, {
        headers: {
          authorization: token.authorization,
        },
      })
      .then((res) => {
        console.log(res);
        setRoomImgUrl(false);
        //         setRoomFormData({imgUrl: [], roomId: "",
        //         roomType: "", totalRooms: "", availableRooms: "",
        //         adultCapacity: "", childrenCapacity: "", weekdayPerNightRate: "",
        //         nonRefundable: false, wardrobe: false, bedsideTable: false, houseKeeping: false, balcony: false,
        //         breakfast: false, mosquitonet: false, Wifi: false, hotNcoldshower_24hrs: false,
        //         airconditioned: false, roomService: false, seaView: false, fitnessCenter: false, swimmingPool: false, spa: false})
        getProperty();
        setEditRoomFormVisible(false);
        setEditRoomBtnActive(false);
        swal({
          title: "Good job!",
          text: "Room Edited Successfully!",
          icon: "success",
          button: "OK!",
        });
      })
      .catch((err) => {
        setEditRoomBtnActive(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (roomImgUrl) {
      saveRoom();
      console.log("useEffect Ran");
    }
  }, [roomImgUrl]);

  return (
    <>
      <CCol className="text-end">
        <button
          id="edit-room-btn"
          className="mx-5"
          onClick={() => {
            console.log(updatedRoomData);
            setEditRoomFormVisible(true);
          }}
        >
          Edit Room
        </button>
      </CCol>

      <CModal
        keyboard={false}
        portal={false}
        visible={editRoomFormVisible}
        className="booking-form-p "
        scrollable
        size="lg"
      >
        <section style={{ zIndex: 100000, position: "absolute" }}>
          <ToastContainer
            autoClose={1500}
            limit={5}
            theme={"dark"}
            pauseOnFocusLoss={false}
            position={"top-center"}
          />
        </section>
        <CModalHeader
          onClick={() => {
            setEditRoomFormVisible(false);
            setEditRoomBtnActive(false);
          }}
        >
          <CModalTitle>
            <h4>Edit Room Details</h4>
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          {/* <CRow className='py-4'>
                        <CCol className='mt-3 p-0'> */}
          <ul className="edit-room-form-images-list">
            {updatedRoomData.imgUrl.map((image, index) => {
              return (
                <li key={index}>
                  <img src={image} className="edit-room-form-images" />
                  <button
                    className="edit-room-form-images-delete-btn"
                    onClick={() => {
                      deleteImage(index);
                    }}
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </li>
              );
            })}
          </ul>
          {/* </CCol>
                    </CRow> */}
          <CRow>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                type="file"
                accept="image/*"
                multiple="multiple"
                label="Upload Room Images"
                onChange={(e) => setRoomImages(e.target.files)}
              />
            </CCol>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                value={updatedRoomData.roomType}
                label="Room Type"
                onChange={handleEditRoomForm("roomType")}
                type="text"
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                value={updatedRoomData.totalRooms}
                label="Total Rooms"
                type="number"
                onChange={handleEditRoomForm("totalRooms")}
              />
            </CCol>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                value={updatedRoomData.availableRooms}
                label="Available Rooms"
                type="number"
                onChange={handleEditRoomForm("availableRooms")}
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                value={updatedRoomData.adultCapacity}
                label="Adult Capacity"
                type="number"
                onChange={handleEditRoomForm("adultCapacity")}
              />
            </CCol>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                value={updatedRoomData.childrenCapacity}
                label="Children Capacity"
                type="number"
                onChange={handleEditRoomForm("childrenCapacity")}
              />
            </CCol>
          </CRow>

          <CRow>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                value={updatedRoomData.weekdayPerNightRate}
                label="Week-Day Per Night Charge"
                type="number"
                onChange={handleEditRoomForm("weekdayPerNightRate")}
              />
            </CCol>
            <CCol className="mt-3" lg={6}>
              <CFormInput
                value={updatedRoomData.weekendPerNightRate}
                label="Week-End Per Night Charge"
                type="number"
                onChange={handleEditRoomForm("weekendPerNightRate")}
              />
            </CCol>
          </CRow>

          <CCard className="mx-2 mt-4">
            <CCardHeader className="text-center">
              <h4>Room Facility</h4>
            </CCardHeader>
            <CCardBody className="p-4">
              <CRow className="text-start aminitiesFonts">
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Non Refundable"
                    value={updatedRoomData.nonRefundable}
                    checked={updatedRoomData.nonRefundable}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        nonRefundable: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Wardrobe"
                    value={updatedRoomData.wardrobe}
                    checked={updatedRoomData.wardrobe}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        wardrobe: e.target.checked,
                      })
                    }
                  />
                </CCol>
              </CRow>

              <CRow className="text-start aminitiesFonts">
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Bedside Table"
                    value={updatedRoomData.bedsideTable}
                    checked={updatedRoomData.bedsideTable}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        bedsideTable: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Breakfast"
                    value={updatedRoomData.breakfast}
                    checked={updatedRoomData.breakfast}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        breakfast: e.target.checked,
                      })
                    }
                  />
                </CCol>
              </CRow>

              <CRow className="text-start aminitiesFonts">
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Balcony"
                    value={updatedRoomData.balcony}
                    checked={updatedRoomData.balcony}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        balcony: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="House Keeping"
                    value={updatedRoomData.houseKeeping}
                    checked={updatedRoomData.houseKeeping}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        houseKeeping: e.target.checked,
                      })
                    }
                  />
                </CCol>
              </CRow>

              <CRow className="text-start aminitiesFonts">
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Mosquito Net"
                    value={updatedRoomData.mosquitonet}
                    checked={updatedRoomData.mosquitonet}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        mosquitonet: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="24hr hot & cold shower"
                    value={updatedRoomData.hotNcoldshower_24hrs}
                    checked={updatedRoomData.hotNcoldshower_24hrs}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        hotNcoldshower_24hrs: e.target.checked,
                      })
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="text-start aminitiesFonts">
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="WiFi"
                    value={updatedRoomData.Wifi}
                    checked={updatedRoomData.Wifi}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        Wifi: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Air-Conditioned"
                    value={updatedRoomData.airconditioned}
                    checked={updatedRoomData.airconditioned}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        airconditioned: e.target.checked,
                      })
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="text-start aminitiesFonts">
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Sea View"
                    value={updatedRoomData.seaView}
                    checked={updatedRoomData.seaView}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        seaView: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Fitness Center"
                    value={updatedRoomData.fitnessCenter}
                    checked={updatedRoomData.fitnessCenter}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        fitnessCenter: e.target.checked,
                      })
                    }
                  />
                </CCol>
              </CRow>
              <CRow className="text-start aminitiesFonts">
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Swimmimg Pool"
                    value={updatedRoomData.swimmingPool}
                    checked={updatedRoomData.swimmingPool}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        swimmingPool: e.target.checked,
                      })
                    }
                  />
                </CCol>
                <CCol className="mt-2">
                  <CFormCheck
                    type="checkbox"
                    label="Spa"
                    value={updatedRoomData.spa}
                    checked={updatedRoomData.spa}
                    onChange={(e) =>
                      setUpdatedRoomData({
                        ...updatedRoomData,
                        spa: e.target.checked,
                      })
                    }
                  />
                </CCol>
              </CRow>

              <CCard className="mx-2 mt-4">
                <CCardHeader className="text-center">
                  <h4>In Case Of Occassion</h4>
                </CCardHeader>
                <CCardBody className="p-4">
                  <CRow>
                    <CCol className="mt-3" lg={6}>
                      <CFormInput
                        label="Occassion Name"
                        type="text"
                        value={updatedRoomData.occassionName}
                        onChange={handleEditRoomForm("occassionName")}
                      />
                    </CCol>
                    <CCol className="mt-3" lg={6}>
                      <CFormInput
                        label="Occassion Per Night Rate"
                        value={updatedRoomData.occassionPerNightRate}
                        type="text"
                        onChange={handleEditRoomForm("occassionPerNightRate")}
                      />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className="mt-3" lg={6}>
                      <CFormInput
                        label="Start Date"
                        type="date"
                        value={updatedRoomData.occassionStartDate}
                        onChange={handleEditRoomForm("occassionStartDate")}
                      />
                    </CCol>
                    <CCol className="mt-3" lg={6}>
                      <CFormInput
                        label="End Date"
                        type="date"
                        value={updatedRoomData.occassionEndDate}
                        onChange={handleEditRoomForm("occassionEndDate")}
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCardBody>
          </CCard>
        </CModalBody>

        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setEditRoomFormVisible(false);
              setEditRoomBtnActive(false);
            }}
          >
            Close
          </CButton>
          <CButton
            color="primary"
            type="submit"
            disabled={editRoomBtnActive}
            onClick={imgCloudUpload}
          >
            Save Room
          </CButton>
        </CModalFooter>
      </CModal>
      {/* { console.log(roomImages)} */}
      {/* {console.log(updatedRoomData.imgUrl)} */}
    </>
  );
};

export default EditRoomForm;
