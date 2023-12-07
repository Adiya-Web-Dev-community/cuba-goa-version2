import './OurProperties.css'
import React, { useEffect } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../../../helpers/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton, CCol, CModal, CModalHeader,
  CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
  CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
  CImage
} from '@coreui/react'
import swal from 'sweetalert';

const PropertiesForm = ({ getPropertiesData }) => {
  const navigate = useNavigate()
  const [saveRoomBtnActive, setSaveRoomBtn] = useState(false)
  const [visibleForm, setVisibleForm] = useState(false)
  const [resortForm, setResortForm] = useState({
    resortImgURL: "", resortName: "", resortDescription: "", resortLocation: "",
    resortAddress: "", pincode: "", resortPhoneNumber: "",
    resortEmail: "", cubaGoaHelpLineNumber: ""
  })
  const [showSelectedImg, setShowSelectedImg] = useState("")
  const [resortImage, setResortImage] = useState("")
  const token = localStorage.getItem('token')
  const handleResortForm = (params) => (e) => {
    setResortForm({ ...resortForm, [params]: e.target.value })
  }

  const postPropertyForm = async () => {
    await axios.post("/hotelbook", resortForm, {
      headers: {
        authorization: token
      }
    })
      .then((res) => {
        console.log(res)
        getPropertiesData()
        setResortForm({ resortImgURL: "", resortName: "", resortDescription: "", resortLocation: "" })
        setResortImage("")
        setShowSelectedImg("");
        setSaveRoomBtn(false)
        setVisibleForm(false)
        swal({
          title: "Good job!",
          text: "Resort added successfully!",
          icon: "success",
          button: "OK!",
        });
      })
      .catch((err) => {
        console.log(err)
        setSaveRoomBtn(false)
      })
  }

  const imgCloudUpload = async (e) => {
    e.preventDefault()
    setSaveRoomBtn(true)
    if (!resortForm.resortName || !resortForm.resortLocation) {
      setSaveRoomBtn(false)
      return toast.error("Please fill all the Input Fields !")
    }
    else if (!resortImage) {
      setSaveRoomBtn(false)
      return toast.error("No Image Chosen !")
    }
    const imgData = new FormData()
    imgData.append("file", resortImage)
    imgData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET)
    await axios.post(process.env.REACT_APP_CLOUDINARY_URL, imgData)
      .then((res) => {
        setResortForm({ ...resortForm, resortImgURL: res.data.secure_url })
      })
      .catch((err) => {
        console.log(err)
        setSaveRoomBtn(false)
      })
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setResortImage(event.target.files[0])
      setShowSelectedImg(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    if (resortForm.resortImgURL) {
      postPropertyForm()
    }
  }, [resortForm.resortImgURL])

  return (
    <>
      <CCol className='text-end px-4 py-3'>
        <CButton className='mx-5' onClick={() => setVisibleForm(true)}>ADD ON</CButton>
      </CCol>

      <CModal
        keyboard={false}
        portal={false}
        visible={visibleForm}
        className='booking-form-p ' scrollable size='lg'>
        <section style={{ zIndex: 100000, position: 'absolute' }}>
          <ToastContainer
            autoClose={1500}
            limit={5}
            theme={"light"}
            pauseOnFocusLoss={false}
            position={"top-center"}
          />
        </section>
        <CModalHeader onClick={() => { setVisibleForm(false) }}>
          <CModalTitle><h4>Add Resort</h4></CModalTitle>
        </CModalHeader>
        <CModalBody >

          <div className="mb-4" style={{ textAlign: 'center' }}>
            <CImage className='p-0 m-0' width={300} height={200} src={showSelectedImg} />
          </div>
          <div className="mb-4">
            <CFormInput type="file" id="formFile" label="Upload resort image" onChange={onImageChange} />
          </div>
          <div className="mb-4">
            <CFormInput value={resortForm.resortName} label="Resort Name" maxLength={50} onChange={handleResortForm('resortName')} />
          </div>
          <div className="mb-4">
            <CFormInput value={resortForm.resortLocation} type="text" size="sm" maxLength={2000} label="Resort Location" onChange={handleResortForm('resortLocation')} />
          </div>
          <div>
            <CFormTextarea value={resortForm.resortAddress} label="Resort Address" maxLength={5000} onChange={handleResortForm('resortAddress')} />
          </div>
          <div>
            <CFormTextarea value={resortForm.pincode} label="Pincode" maxLength={5000} onChange={handleResortForm('pincode')} />
          </div>
          <div>
            <CFormTextarea value={resortForm.resortDescription} label="Resort Description" maxLength={5000} onChange={handleResortForm('resortDescription')} />
          </div>



          <CCard className='mx-2 mt-4'>
            <CCardHeader className='text-center'>
              <h4>Contact Us</h4>
            </CCardHeader>
            <CCardBody className='p-4'>
              <div className="mb-4">
                <CFormTextarea value={resortForm.resortPhoneNumber} label="Resort Phone Number" maxLength={5000} onChange={handleResortForm('resortPhoneNumber')} />
              </div>
              <div className="mb-4">
                <CFormTextarea value={resortForm.resortEmail} label="Resort Email" maxLength={5000} onChange={handleResortForm('resortEmail')} />
              </div>
              <div className="mb-4">
                <CFormTextarea value={resortForm.cubaGoaHelpLineNumber} label="Cuba Goa Helpline Number" maxLength={5000} onChange={handleResortForm('cubaGoaHelpLineNumber')} />
              </div>
            </CCardBody>
          </CCard>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleForm(false)}>
            Close
          </CButton>
          <CButton color="primary" type='submit' disabled={saveRoomBtnActive} onClick={imgCloudUpload}>Save Resort</CButton>
        </CModalFooter>
      </CModal>

      {console.log(resortImage)}
    </>
  )
}

export default PropertiesForm