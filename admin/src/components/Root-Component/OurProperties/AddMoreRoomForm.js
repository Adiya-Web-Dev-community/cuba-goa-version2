import './OurProperties.css'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton, CCol, CModal, CModalHeader,
  CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
  CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
  CImage, CContainer, CFormLabel
} from '@coreui/react'
import axios from '../../../helpers/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { nanoid } from 'nanoid'

const AddMoreRoomForm = ({ showRoomForm, setRoomForm, property, getPropertiesData }) => {
  // console.log(property)
  const [saveRoomButttonActive, setSaveRoomButttonActive] = useState(false)
  const [roomFormData, setRoomFormData] = useState({
    imgUrl: [], roomId: "",
    roomType: "", totalRooms: "", availableRooms: "",
    adultCapacity: "", childrenCapacity: "", weekdayPerNightRate: "",
    weekendPerNightRate: "", occassionName: "", occassionStartDate: "", occassionEndDate: "", occassionPerNightRate: "",

    nonRefundable: false, wardrobe: false, bedsideTable: false, houseKeeping: false, balcony: false,
    breakfast: false, mosquitonet: false, Wifi: false, hotNcoldshower_24hrs: false,
    airconditioned: false, roomService: false, seaView: false, fitnessCenter: false, swimmingPool: false, spa: false
  })

  const [roomImages, setRoomImages] = useState([])

  const handleRoomForm = (params) => (e) => {
    setRoomFormData({ ...roomFormData, [params]: e.target.value })
    console.log(roomFormData.nonRefundable)
  }
  const [roomImgUrl, setRoomImgUrl] = useState(false)
  const [picURL, setPicURL] = useState("")
  const token = localStorage.getItem('token')

  const imgCloudUpload = async (e) => {
    e.preventDefault()
    setSaveRoomButttonActive(true)
    if (!roomFormData.roomType) {
      setSaveRoomButttonActive(false)
      return toast.error("Please fill room type !")
    }
    if (roomImages.length == 0) {
      setSaveRoomButttonActive(false)
      return toast.error("No Image Chosen !")
    }
    let arr = []
    console.log(roomImages)
    for (let i = 0; i < roomImages.length; i++) {
      const imgData = new FormData()
      imgData.append("file", roomImages[i])
      imgData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET)
      await axios.post(process.env.REACT_APP_CLOUDINARY_URL, imgData)
        .then((res) => {
          // console.log(res)
          arr.push(res.data.secure_url)
          // console.log(resortForm)
        })
        .catch((err) => {
          setSaveRoomButttonActive(false)
          console.log(err)
        })
    }
    setRoomFormData({ ...roomFormData, imgUrl: arr })
    setRoomImgUrl(arr)
  }


  const saveRoom = async () => {
    if (!property) return
    roomFormData.roomId = nanoid()
    property.rooms.push(roomFormData)
    // await axios.put(`http://localhost:4001/hotelbook/${property._id}`, property)
    await axios.put(`/hotelbook/${property._id}`, property, {
      headers: {
        authorization: token
      }
    })
      .then((res) => {
        console.log(res)
        setRoomImgUrl(false)
        setRoomFormData({
          imgUrl: [], roomId: "",
          roomType: "", totalRooms: "", availableRooms: "",
          adultCapacity: "", childrenCapacity: "", weekdayPerNightRate: "",
          weekendPerNightRate: "", occassionName: "", occassionStartDate: "", occassionEndDate: "", occassionPerNightRate: "",
          nonRefundable: false, wardrobe: false, bedsideTable: false, houseKeeping: false, balcony: false,
          breakfast: false, mosquitonet: false, Wifi: false, hotNcoldshower_24hrs: false,
          airconditioned: false, roomService: false, seaView: false, fitnessCenter: false, swimmingPool: false, spa: false
        })
        setSaveRoomButttonActive(false)
        setRoomForm(false)
        swal({
          title: "Good job!",
          text: "Room added successfully!",
          icon: "success",
          button: "OK!",
        });
      })
      .catch((err) => {
        setSaveRoomButttonActive(false)
        console.log(err)
      })
  }


  useEffect(() => {
    if (roomImgUrl) {
      saveRoom()
      console.log("useEffect Ran")
    }
  }, [roomImgUrl])

  return (
    <>
      <CModal
        keyboard={false}
        portal={false}
        visible={showRoomForm}
        className='booking-form-p'
        scrollable
        size='lg'
      >

        <CModalHeader onClick={() => setRoomForm(false)} >
          <ToastContainer
            autoClose={1500}
            limit={5}
            theme={"dark"}
            pauseOnFocusLoss={false}
            position={"top-center"}
          />
          <CModalTitle><h4>Room Info</h4></CModalTitle>
        </CModalHeader>
        <CModalBody >
          <CRow className='py-4'>
            <CCol className='mt-3 p-0'>
              <CImage className='p-0 m-0' width={300} height={200} />
            </CCol>
          </CRow>
          <CRow>
            <CCol className='mt-3' lg={6}>
              <CFormInput type='file' accept="image/*" multiple="multiple" label='Upload Room Images' onChange={(e) => setRoomImages(e.target.files)} />
            </CCol>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Room Type' onChange={handleRoomForm('roomType')} type='text' />
            </CCol>
          </CRow>

          <CRow>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Total Rooms' type='number' onChange={handleRoomForm('totalRooms')} />
            </CCol>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Available Rooms' type='number' onChange={handleRoomForm('availableRooms')} />
            </CCol>
          </CRow>

          <CRow>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Adult Capacity' type='number' onChange={handleRoomForm('adultCapacity')} />
            </CCol>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Children Capacity' type='number' onChange={handleRoomForm('childrenCapacity')} />
            </CCol>
          </CRow>

          <CRow>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Week-Day Per Night Charge' type='number' onChange={handleRoomForm('weekdayPerNightRate')} />
            </CCol>
            <CCol className='mt-3' lg={6}>
              <CFormInput label='Week-End Per Night Charge' type='number' onChange={handleRoomForm('weekendPerNightRate')} />
            </CCol>
          </CRow>



          <CCard className='mx-2 mt-4'>
            <CCardHeader className='text-center'>
              <h4>Room Facility</h4>
            </CCardHeader>
            <CCardBody className='p-4'>
              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Non Refundable' value={roomFormData.nonRefundable}
                    checked={roomFormData.nonRefundable} onChange={(e) => setRoomFormData({ ...roomFormData, nonRefundable: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Wardrobe' value={roomFormData.wardrobe}
                    checked={roomFormData.wardrobe} onChange={(e) => setRoomFormData({ ...roomFormData, wardrobe: e.target.checked })} />
                </CCol>
              </CRow>

              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Bedside Table' value={roomFormData.bedsideTable}
                    checked={roomFormData.bedsideTable} onChange={(e) => setRoomFormData({ ...roomFormData, bedsideTable: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Breakfast' value={roomFormData.breakfast}
                    checked={roomFormData.breakfast} onChange={(e) => setRoomFormData({ ...roomFormData, breakfast: e.target.checked })} />
                </CCol>
              </CRow >

              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Balcony' value={roomFormData.balcony}
                    checked={roomFormData.balcony} onChange={(e) => setRoomFormData({ ...roomFormData, balcony: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='House Keeping' value={roomFormData.houseKeeping}
                    checked={roomFormData.houseKeeping} onChange={(e) => setRoomFormData({ ...roomFormData, houseKeeping: e.target.checked })} />
                </CCol>
              </CRow>

              <CRow className='text-start aminitiesFonts'>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Mosquito Net' value={roomFormData.mosquitonet}
                    checked={roomFormData.mosquitonet} onChange={(e) => setRoomFormData({ ...roomFormData, mosquitonet: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='24hr hot & cold shower' value={roomFormData.hotNcoldshower_24hrs}
                    checked={roomFormData.hotNcoldshower_24hrs} onChange={(e) => setRoomFormData({ ...roomFormData, hotNcoldshower_24hrs: e.target.checked })} />
                </CCol>
              </CRow>
              <CRow className='text-start aminitiesFonts' >
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='WiFi' value={roomFormData.Wifi}
                    checked={roomFormData.Wifi} onChange={(e) => setRoomFormData({ ...roomFormData, Wifi: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Air-Conditioned' value={roomFormData.airconditioned}
                    checked={roomFormData.airconditioned} onChange={(e) => setRoomFormData({ ...roomFormData, airconditioned: e.target.checked })} />
                </CCol>
              </CRow>
              <CRow className='text-start aminitiesFonts' >
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Sea View' value={roomFormData.seaView}
                    checked={roomFormData.seaView} onChange={(e) => setRoomFormData({ ...roomFormData, seaView: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Fitness Center' value={roomFormData.fitnessCenter}
                    checked={roomFormData.fitnessCenter} onChange={(e) => setRoomFormData({ ...roomFormData, fitnessCenter: e.target.checked })} />
                </CCol>
              </CRow>
              <CRow className='text-start aminitiesFonts' >
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Swimmimg Pool' value={roomFormData.swimmingPool}
                    checked={roomFormData.swimmingPool} onChange={(e) => setRoomFormData({ ...roomFormData, swimmingPool: e.target.checked })} />
                </CCol>
                <CCol className='mt-2' >
                  <CFormCheck type='checkbox' label='Spa' value={roomFormData.spa}
                    checked={roomFormData.spa} onChange={(e) => setRoomFormData({ ...roomFormData, spa: e.target.checked })} />
                </CCol>
              </CRow>




              <CCard className='mx-2 mt-4'>
                <CCardHeader className='text-center'>
                  <h4>In Case Of Occassion</h4>
                </CCardHeader>
                <CCardBody className='p-4'>
                  <CRow>
                    <CCol className='mt-3' lg={6}>
                      <CFormInput label='Occassion Name' type='text' onChange={handleRoomForm('occassionName')} />
                    </CCol>
                    <CCol className='mt-3' lg={6}>
                      <CFormInput label='Occassion Per Night Rate' type='text' onChange={handleRoomForm('occassionPerNightRate')} />
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol className='mt-3' lg={6}>
                      <CFormInput label='Start Date' type='date' onChange={handleRoomForm('occassionStartDate')} />
                    </CCol>
                    <CCol className='mt-3' lg={6}>
                      <CFormInput label='End Date' type='date' onChange={handleRoomForm('occassionEndDate')} />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>

            </CCardBody>
          </CCard>

        </CModalBody>

        <CModalFooter>
          <CButton color="primary" disabled={saveRoomButttonActive} onClick={imgCloudUpload}>Save Room</CButton>
        </CModalFooter>
      </CModal>
      {/* {console.log(roomFormData)} */}
      {/* {console.log(roomImgUrl)} */}
      {/* {console.log(roomImages)} */}
    </>
  )
}

export default AddMoreRoomForm

