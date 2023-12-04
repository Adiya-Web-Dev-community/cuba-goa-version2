// import './OurProperties.css'
import './EditResort.css'
import React, { useEffect } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../../../../helpers/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    CButton, CCol, CModal, CModalHeader,
    CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
    CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
    CImage
} from '@coreui/react'
import swal from 'sweetalert';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const EditResort = ({ property, getPropertiesData, showEditResortForm, setShowEditResortForm }) => {
    // const navigate = useNavigate()
    // console.log("property => ", property)
    const [editResortForm, setEditResortForm] = useState({
        resortDescription: "", resortImgURL: "", resortLocation: "",
        resortName: "", resortAddress: "", pincode: "",
        resortPhoneNumber: "", resortEmail: "", cubaGoaHelpLineNumber: ""
    })
    const [updatedResortForm, setUpdatedResortForm] = useState(property)
    const [saveResortBtnActive, setSaveResortBtnActive] = useState(false)
    const [roomImage, setRoomImage] = useState(false)
    const [roomImgUrl, setRoomImgUrl] = useState(false)
    const handleEditResortForm = (params) => (e) => {
        setUpdatedResortForm({ ...updatedResortForm, [params]: e.target.value })
    }
    const token = localStorage.getItem('token')

    const deleteImage = () => {
        setUpdatedResortForm({ ...updatedResortForm, resortImgURL: "" })
    }

    const imgCloudUpload = async (e) => {
        e.preventDefault()
        // console.log(roomImage)
        // return
        console.log(updatedResortForm)
        setSaveResortBtnActive(true)
        // console.log(updatedRoomData.imgUrl)
        if (!updatedResortForm.resortName || !updatedResortForm.resortLocation) {
            setSaveResortBtnActive(false)
            return toast.error("Please fill Resort Name and Resort Location !")
        }
        if (roomImage) {
            const imgData = new FormData()
            imgData.append("file", roomImage)
            imgData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET)
            await axios.post(process.env.REACT_APP_CLOUDINARY_URL, imgData)
                .then((res) => {
                    // console.log(res.data.url)
                    setRoomImage(res.data.url)
                    // console.log(editResortForm)
                })
                .catch((err) => {
                    alert("An err occoured please try after some time !")
                    setSaveResortBtnActive(false)
                    console.log(err)
                })
        }
        setRoomImgUrl(true)
    }

    const saveResort = async () => {
        if (!property) return
        let data;
        if (roomImage) {
            data = { ...updatedResortForm, resortImgURL: roomImage, rooms: property.rooms }
        }
        else {
            data = { ...updatedResortForm, resortImgURL: property.resortImgURL, rooms: property.rooms }
        }
        console.log('data => ', data)
        // setSaveResortBtnActive(false)
        // return
        // await axios.put(`http://localhost:4001/entire-hotelbook/${property._id}`, data)
        await axios.put(`/entire-hotelbook/${property._id}`, data, {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                console.log(res)
                setRoomImgUrl(false)
                getPropertiesData()
                setShowEditResortForm(false)
                setSaveResortBtnActive(false)
                swal({
                    title: "Good job!",
                    text: "Resort Edited Successfully!",
                    icon: "success",
                    button: "OK!",
                });
            })
            .catch((err) => {
                alert("An error occoured please try after some time !")
                setSaveResortBtnActive(false)
                console.log(err)
            })
    }

    useEffect(() => {
        console.log("before useEffect Ran")
        if (roomImgUrl) {
            saveResort()
            console.log("useEffect Ran")
        }
    }, [roomImgUrl])

    return (
        <>
            <CModal
                keyboard={false}
                portal={false}
                visible={showEditResortForm}
                className='booking-form-p ' scrollable size='lg'>
                <section style={{ zIndex: 100000, position: 'absolute' }}>
                    <ToastContainer
                        autoClose={1500}
                        limit={5}
                        theme={"dark"}
                        pauseOnFocusLoss={false}
                        position={"top-center"}
                    />
                </section>
                <CModalHeader onClick={() => { setShowEditResortForm(false) }}>
                    <CModalTitle><h4>Edit Resort</h4></CModalTitle>
                </CModalHeader>
                <CModalBody >
                    {updatedResortForm.resortImgURL ?
                        <div className="mb-4 editResortDeleteImg" style={{ textAlign: 'center' }}>
                            <CImage className='p-0 m-0' width={300} height={200} src={updatedResortForm.resortImgURL} />
                            <button onClick={deleteImage} className='editResortDeleteIcon'><RiDeleteBin5Fill /></button>
                        </div>
                        : null}
                    <div className="mb-4">
                        <CFormInput type="file" id="formFile" label="Upload property image" onChange={(e) => setRoomImage(e.target.files[0])} />
                    </div>
                    <div className="mb-4">
                        <CFormInput label="Resort Name" value={updatedResortForm.resortName} maxLength={50} onChange={handleEditResortForm('resortName')} />
                    </div>
                    <div className="mb-4">
                        <CFormInput type="text" size="sm" maxLength={2000} label="Resort Location" value={updatedResortForm.resortLocation} onChange={handleEditResortForm('resortLocation')} />
                    </div>
                    <div className="mb-4">
                        <CFormInput type="text" size="sm" maxLength={2000} label="Resort Address" value={updatedResortForm.resortAddress} onChange={handleEditResortForm('resortAddress')} />
                    </div>
                    <div className="mb-4">
                        <CFormInput type="text" size="sm" maxLength={2000} label="Pincode" value={updatedResortForm.pincode} onChange={handleEditResortForm('pincode')} />
                    </div>
                    <div className="mb-4">
                        <CFormTextarea label="Resort Description" maxLength={5000} value={updatedResortForm.resortDescription} onChange={handleEditResortForm('resortDescription')} />
                    </div>

                    <CCard className='mx-2 mt-4'>
                        <CCardHeader className='text-center'>
                            <h4>Contact Us</h4>
                        </CCardHeader>
                        <CCardBody className='p-4'>
                            <div className="mb-4">
                                <CFormInput label="Resort Phone Number" maxLength={5000} value={updatedResortForm.resortPhoneNumber} onChange={handleEditResortForm('resortPhoneNumber')} />
                            </div>
                            <div className="mb-4">
                                <CFormInput label="Resort Email" maxLength={5000} value={updatedResortForm.resortEmail} onChange={handleEditResortForm('resortEmail')} />
                            </div>
                            <div className="mb-4">
                                <CFormInput label="Cuba Goa Helpline Number" maxLength={5000} value={updatedResortForm.cubaGoaHelpLineNumber} onChange={handleEditResortForm('cubaGoaHelpLineNumber')} />
                            </div>
                        </CCardBody>
                    </CCard>
                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowEditResortForm(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" type='submit' disabled={saveResortBtnActive} onClick={imgCloudUpload}>Save Resort</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default EditResort;