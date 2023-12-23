import "./editSpaForm.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../helpers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CImage,
} from "@coreui/react";
import swal from "sweetalert";
import { RiDeleteBin5Fill } from "react-icons/ri";

const EditResort = ({
  card,
  getSpaList,
  showEditSpaForm,
  setShowEditSpaForm,
}) => {
  const navigate = useNavigate();
  console.log("Card => ", card);
  const [updatedSpaForm, setUpdatedSpaForm] = useState(card);
  const [saveSpaBtnActive, setSaveSpaBtnActive] = useState(false);
  const [spaImage, setSpaImage] = useState(false);
  const [spaImgUrl, setSpaImgUrl] = useState(false);
  const handleUpdateSpaForm = (params) => (e) => {
    setUpdatedSpaForm({ ...updatedSpaForm, [params]: e.target.value });
  };
  const token = localStorage.getItem("user");

  const deleteImage = () => {
    setUpdatedSpaForm({ ...updatedSpaForm, imgUrl: "" });
  };

  const imgCloudUpload = async (e) => {
    e.preventDefault();
    console.log(updatedSpaForm);
    setSaveSpaBtnActive(true);
    // console.log(updatedRoomData.imgUrl)
    if (!updatedSpaForm.name || !updatedSpaForm.details) {
      setSaveSpaBtnActive(false);
      return toast.error("Please fill Spa Name and Spa Details !");
    }
    if (spaImage) {
      const imgData = new FormData();
      imgData.append("file", spaImage);
      imgData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      await axios
        .post(process.env.REACT_APP_CLOUDINARY_URL, imgData)
        .then((res) => {
          // console.log(res.data.url)
          setSpaImage(res.data.url);
          // console.log(editResortForm)
        })
        .catch((err) => {
          alert("An err occoured please try after some time !");
          setSaveSpaBtnActive(false);
          console.log(err);
        });
    }
    setSpaImgUrl(true);
  };

  const saveSpa = async () => {
    if (!card) return;
    let data;
    if (spaImage) {
      data = { ...updatedSpaForm, imgUrl: spaImage };
    } else {
      data = { ...updatedSpaForm, imgUrl: updatedSpaForm.imgUrl };
    }
    await axios
      .put(`/spa/${card._id}`, data, {
        headers: {
          authorization: token.authorization,
        },
      })
      .then((res) => {
        console.log(res);
        setSpaImgUrl(false);
        getSpaList();
        setShowEditSpaForm(false);
        setSaveSpaBtnActive(false);
        swal({
          title: "Good job!",
          text: "Spa Edited Successfully!",
          icon: "success",
          button: "OK!",
        });
        navigate("/spa");
      })
      .catch((err) => {
        alert("An error occoured please try after some time !");
        setSaveSpaBtnActive(false);
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("before useEffect Ran");
    if (spaImgUrl) {
      saveSpa();
      console.log("useEffect Ran");
    }
  }, [spaImgUrl]);

  return (
    <>
      <CModal
        keyboard={false}
        portal={false}
        visible={showEditSpaForm}
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
            setShowEditSpaForm(false);
          }}
        >
          <CModalTitle>
            <h4>Spa Info</h4>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {updatedSpaForm.imgUrl ? (
            <div
              className="mb-4 editResortDeleteImg"
              style={{ textAlign: "center" }}
            >
              <CImage
                className="p-0 m-0"
                width={300}
                height={200}
                src={updatedSpaForm.imgUrl}
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
              label="Upload spa image"
              onChange={(e) => setSpaImage(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <CFormInput
              label="Spa Name"
              value={updatedSpaForm.name}
              maxLength={50}
              onChange={handleUpdateSpaForm("name")}
            />
          </div>
          <div className="mb-4">
            <CFormInput
              type="text"
              size="sm"
              maxLength={2000}
              label="Spa Details"
              value={updatedSpaForm.details}
              onChange={handleUpdateSpaForm("details")}
            />
          </div>
          <div className="mb-4">
            <CFormInput
              type="text"
              size="sm"
              maxLength={2000}
              label="Spa Benefits"
              value={updatedSpaForm.benefits}
              onChange={handleUpdateSpaForm("benefits")}
            />
          </div>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowEditSpaForm(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            type="submit"
            disabled={saveSpaBtnActive}
            onClick={imgCloudUpload}
          >
            Save Spa
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EditResort;
