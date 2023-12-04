import './OurProperties.css'
import React, { useEffect } from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { RiHotelLine } from 'react-icons/ri'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton, CCol, CModal, CModalHeader,
  CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
  CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
  CImage,
  CContainer
} from '@coreui/react'
import { storage } from '../../firebase'
import axios from '../../../helpers/axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
const Footer = React.lazy(() => import('../Footer/Footer'))


const PropertiesForm = React.lazy(() => import('./PropertiesForm'))
const AddMoreRoomForm = React.lazy(() => import('./AddMoreRoomForm'))
const ImageSliderModal = React.lazy(() => import('./ImageSliderModal'))



const OurProperties = () => {

  const [showList, setList] = useState(false)
  const [selectedValue, setSelectedVal] = useState(['Select Hotel to Book', 0])
  const [ourPropertiesData, setOurPropertiesData] = useState([])
  const [showRoomForm, setRoomForm] = useState(false)
  const [roomData, setRoomData] = useState({})
  const [visibleImageSlider, setVisibleImgSLider] = useState(false)
  const [visibleSliderImgData, setVisibaleSliderImgData] = useState([])


  const getPropertiesData = async () => {
    await axios(`/hotelbook`)
      // await axios(`http://localhost:4001/hotelbook`)
      .then((res) => {
        console.log(res.data)
        setOurPropertiesData(res.data)
        setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getPropertiesData()
  }, [])


  function deleteResost(id) {
    axios.delete(`/hotelbook/${id}`)
      // axios.delete(`http://localhost:4001/hotelbook/${id}`)
      .then((resp) => {
        resp.json().then(() => {
          alert("successfully submitted")
          getPropertiesData()
        }).catch((error) => {
          console.log(error)
        })
      })
  }

  function deleteRoom(id) {
    if (!window.confirm('DO YOU WANT TO DELETE THIS')) return
    const obj = ourPropertiesData.find((el) => el.resortName === selectedValue[0])
    // const newObject = obj?.rooms?.filter((el) => el._id !== id)
    // obj.rooms = newObject
    axios.put(`http://localhost:4001/hotelbook/${obj._id}`)
      .then((resp) => {
        resp.json().then(() => {
          alert("successfully submitted")

          getPropertiesData()
        }).catch((error) => {
          console.log(error)
        })
      })
  }


  const setImageSliderFun = (dataArr) => {
    setVisibaleSliderImgData(dataArr)
    setVisibleImgSLider(true)
  }


  return (
    <>
      <main className='our-properties-main'>

        <div className='quba-goa-search'>
          <div className='banner'>
            <h2>The Cuba Goa Properties</h2>
            <h6 style={{ margin: '20px 0' }}>BEACH HUTS, BUNGALOWS & RESORTS</h6>

          </div>

          <div className='properties-to-book'>

            <div className='select-menu'>

              <div className='select-btn' onClick={() => setList((val) => !val)}>
                <span>{selectedValue[0]}</span>
                {showList ? <AiOutlineDown /> : <AiOutlineUp />}
              </div>

              {showList && <ul className='options'>
                {ourPropertiesData.map((el) =>
                  <li className='option' onClick={() => setSelectedVal(() => {
                    setList((val) => !val)
                    return [el.resortName, el._id]
                  })}>
                    <li><RiHotelLine /></li>
                    <span className='option-text'>{el.resortName}</span>
                  </li>
                )}
              </ul>}
            </div>

            {/* {selectedValue[0] !== 'Select Hotel to Book' && <Link className='book-button' to={
              selectedValue[0].toLocaleLowerCase().split(' ').join('-') + "/" + selectedValue[1]} >
              Book Now</Link>} */}


          </div>
          <div className='add-on-btn'>
            <PropertiesForm getPropertiesData={getPropertiesData} />
          </div>
          <AddMoreRoomForm getPropertiesData={getPropertiesData}
            showRoomForm={showRoomForm}
            roomData={roomData}
            setRoomForm={setRoomForm}
          />


          <div className='about-hotel'>
            {ourPropertiesData.filter((el) => el.resortName === selectedValue[0]).map((el) =>
              <>
                <div className='goa-properties'>
                  <div className='img-container-1'>
                    <CImage rounded thumbnail width={2000} height={2000} src={el.resortImgURL} alt="" />
                  </div>
                  <div className='our-properties-content'>
                    <h2>{el.resortName}</h2>
                    <p>{el.content}</p>
                  </div>

                </div>
                <div className='goa-properties-add-room'>
                  <CButton color='primary' className='me-2' onClick={() => {
                    setRoomForm(true)
                    setRoomData(el)
                  }}>ADD MORE ROOMS</CButton>
                  <CButton color='danger' onClick={() => deleteResost(el._id)}>Delete resort</CButton>

                </div>
              </>
            )}

            <ImageSliderModal
              visibleImageSlider={visibleImageSlider}
              setVisibleImgSLider={setVisibleImgSLider}
              visibleSliderImgData={visibleSliderImgData}
            />

            {ourPropertiesData[0] && <div className='overview-of-rooms'>
              <div className='room-resortName'><h2> {ourPropertiesData.find((el) => el.resortName === selectedValue[0])?.resortName + " ROOMS"}</h2></div>
              {/* {ourPropertiesData.find((el) => el.resortName === selectedValue[0]).rooms?.map((el) =>
                <>
                  <CCard className='room-overview'>
                    <div className='first-content' style={{ maxHeight: 'auto' }}>
                      <div className='img-parent-10'>
                        <img src={el.resortImgURL} onClick={() => setImageSliderFun([...el?.allimgurl, el?.resortImgURL])} />
                        <div className='show-more-room-image' onClick={() => setImageSliderFun([el?.resortImgURL, ...el?.allimgurl])}>+{(+el.allimgurl?.length || 0) + 1} Photos</div>
                      </div>
                    </div>
                    <div className='room-overview-info'>
                      <h4>{el.title2}</h4>

                      <div className='reoom-overview-child'>

                        <div>
                          <div className='room-overview-info-facility'>
                            <div>
                              <h5>With Breakfast  </h5>
                              <h6>Rs {el?.perRoom}</h6>
                            </div>
                            <div>
                              <h5>Room Only  </h5>
                              <h6>Rs {el?.perRoomPerWithBreakFast}  </h6>
                            </div>
                          </div>
                          <div className='room-overview-info-capacity'>
                            <h5>Room Capacity</h5>
                            <div>
                              <h6>Child Capacity {el?.chlidren || 0}</h6>
                              <h6>Adult Capacity {+el?.adults || 0}  </h6>
                            </div>
                          </div>
                        </div>
                        <div className='room-overview-review'>
                          <h5>Customer reviews</h5>
                          <div className='rating'>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                          </div>

                        </div>
                      </div>
                      <div className='room-overview-info-amenities'>
                        <h5>Room Amenities</h5>
                        <h6></h6>
                        <div>
                          <h6>{el.Balcony && "Balcony"}</h6>
                          <h6> {el.Bedside_Table && "BedSide Table"}</h6>
                          <h6>{el.Fan && "Fan"}</h6>
                          <h6>{el.House_Keeping && "House Keeping"}</h6>
                          <h6>{el.Wifi && "Wifi"}</h6>
                          <h6>{el.coldshower_24hrs && "Coldshower 24hrs"}</h6>
                          <h6>{el.mosquitonet && "Mosquitonet"}</h6>
                          <h6>{el.airconditioned && "Airconditioned"}</h6>
                        </div>
                      </div>
                    </div>
                  </CCard>
                  <div className='room-overview-controls'>
                    <CButton color='danger' onClick={() => deleteRoom(el._id)}>Delete Room</CButton>
                  </div>
                </>
              )} */}

            </div>}

          </div>

        </div>
      </main>
      {/* { console.log("selectedValue:", selectedValue)} */}
      <Footer />

    </>
  )
}

export default OurProperties
