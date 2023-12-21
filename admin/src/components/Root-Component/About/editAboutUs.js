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

const AboutUsForm = ({
  showAboutUsForm,
  setShowAboutUsForm,
  dataFetchFunctionFromParent,
}) => {
  const navigate = useNavigate();
  // const [editResortForm, setEditResortForm] = useState({
  //     bannerImgUrl: "", heading1: "", heading2: "", heading3: "",description: ""
  // })
  const [aboutUsData, setAboutUsData] = useState();
  const [saveAboutUsBtnActive, setSaveAboutUsBtnActive] = useState(false);
  const [bannerImage, setBannerImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(false);
  const handleUpdateAboutUsForm = (params) => (e) => {
    setAboutUsData({ ...aboutUsData, [params]: e.target.value });
  };
  const token = localStorage.getItem("user");

  const deleteImage = () => {
    setAboutUsData({ ...aboutUsData, bannerImgUrl: "" });
  };

  const fetchData = async () => {
    await axios
      .get("/about-us")
      .then((res) => {
        //   console.log(res.data.data[0])
        setAboutUsData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(aboutUsData?._id);
  // fetchData()
  useEffect(() => {
    fetchData();
  }, []);
  console.log("AboutUsForm", aboutUsData);
  const imgCloudUpload = async (e) => {
    e.preventDefault();
    console.log(aboutUsData);
    setSaveAboutUsBtnActive(true);
    // console.log(updatedRoomData.imgUrl)
    // if (!updatedAboutUsForm.resortName || !updatedAboutUsForm.resortLocation || !updatedAboutUsForm.resortDescription) {
    //     return toast.error("Please fill all the Input Fields !")
    //     setSaveAboutUsBtnActive(false)
    // }
    if (bannerImage) {
      const imgData = new FormData();
      imgData.append("file", bannerImage);
      imgData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      await axios
        .post(process.env.REACT_APP_CLOUDINARY_URL, imgData)
        .then((res) => {
          // console.log(res.data.url)
          setBannerImage(res.data.url);
          // console.log(editResortForm)
        })
        .catch((err) => {
          alert("An err occoured please try after some time !");
          setSaveAboutUsBtnActive(false);
          console.log(err);
        });
    }
    setImgUrl(true);
  };

  const saveAboutUs = async () => {
    if (!aboutUsData) return;
    let data;
    if (bannerImage) {
      data = { ...aboutUsData, bannerImgUrl: bannerImage };
    } else {
      data = { ...aboutUsData, bannerImgUrl: aboutUsData.bannerImgUrl };
    }
    console.log("data => ", data);
    setShowAboutUsForm(false);
    await axios
      .put(`/about-us/${aboutUsData._id}`, data, {
        headers: {
          authorization: token.authorization,
        },
      })
      .then((res) => {
        console.log(res);
        setImgUrl(false);
        setAboutUsData();
        dataFetchFunctionFromParent();
        setShowAboutUsForm(false);
        setSaveAboutUsBtnActive(false);
        swal({
          title: "Good job!",
          text: "About Us Edited Successfully!",
          icon: "success",
          button: "OK!",
        });
        navigate("/");
      })
      .catch((err) => {
        alert("An error occoured please try after some time !");
        setSaveAboutUsBtnActive(false);
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("before useEffect Ran");
    if (imgUrl) {
      saveAboutUs();
      console.log("useEffect Ran");
    }
  }, [imgUrl]);

  return (
    <>
      <CModal
        keyboard={false}
        portal={false}
        visible={showAboutUsForm}
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
            setShowAboutUsForm(false);
          }}
        >
          <CModalTitle>
            <h4>About Us</h4>
          </CModalTitle>
        </CModalHeader>

        <CModalBody>
          {aboutUsData?.bannerImgUrl ? (
            <div
              className="mb-4 editResortDeleteImg"
              style={{ textAlign: "center" }}
            >
              <CImage
                className="p-0 m-0"
                width={300}
                height={200}
                src={aboutUsData?.bannerImgUrl}
              />
              <button onClick={deleteImage} className="editResortDeleteIcon">
                <RiDeleteBin5Fill />
              </button>
            </div>
          ) : null}
          <div className="mb-4">
            <CFormInput
              type="file"
              id="formFile"
              label="Upload aboutUsData image"
              onChange={(e) => setBannerImage(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <CFormInput
              label="Heading 1"
              value={aboutUsData?.heading1}
              maxLength={2000}
              onChange={handleUpdateAboutUsForm("heading1")}
            />
          </div>
          <div className="mb-4">
            <CFormInput
              type="text"
              size="sm"
              maxLength={2000}
              label="Heading 2"
              value={aboutUsData?.heading2}
              onChange={handleUpdateAboutUsForm("heading2")}
            />
          </div>
          <div className="mb-4">
            <CFormInput
              type="text"
              size="sm"
              maxLength={2000}
              label="Heading 3"
              value={aboutUsData?.heading3}
              onChange={handleUpdateAboutUsForm("heading3")}
            />
          </div>
          <div className="mb-4">
            <CFormInput
              type="text"
              size="sm"
              maxLength={2000}
              label="Description"
              value={aboutUsData?.description}
              onChange={handleUpdateAboutUsForm("description")}
            />
          </div>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowAboutUsForm(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            type="submit"
            disabled={saveAboutUsBtnActive}
            onClick={imgCloudUpload}
          >
            Save About
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AboutUsForm;
