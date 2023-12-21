import React, { useEffect, useState } from 'react'
import './RoomCard.css'
import { IoIosArrowDropright } from 'react-icons/io';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import { Icon } from 'react-icons-kit'
import { user } from 'react-icons-kit/icomoon/user'
import { circleLeft } from 'react-icons-kit/icomoon/circleLeft'
import { circleRight } from 'react-icons-kit/icomoon/circleRight'
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
// import soldOutIcon from '../../../../assets/out-of-stock.png'
// import axios from '../../../../helpers/axios'
// import { useParams } from 'react-router-dom'


const RoomCard = ({ room, resortId, resortname, price }) => {
  console.log(room)
  const navigate = useNavigate()
  const capacity = Number(room.adultCapacity)


  //HANDLE RESERVE BUTTON
  const handleReserve = (room, roomId, resortId) => {
    navigate(`/booking-summary/${resortname}/${resortId}/${roomId}`)
    // console.log(resortId, roomId)
    // const exixstingRoom = cart.find((item) => item.room.roomId === id)
    // if (exixstingRoom) {
    //   setCart(
    //     cart.map((item) =>
    //       item.room.roomId === id ? { ...item, quantity: item.quantity + 1 } : item
    //     )
    //   )
    // }
    // else {
    //   setCart([...cart, { room, quantity: 1 }])
    // }

  }





  //HANDLE SLIDER
  const [current, setCurrent] = useState(0)
  const prevBtn = () => {
    setCurrent((current === room.imgUrl.length) ? (0) : (current + 1))
  }
  const nextBtn = () => {
    setCurrent((current === 0) ? (room.imgUrl.length - 1) : (current - 1))
  }


  return (
        <></>
    // <div data-aos="fade-up" className='RoomCard' onClick={() => navigate(`/${resortId}/${room.roomType}/${room.roomId}/details`)}>
    //   <section className='roomcard-r1'>
    //     <img src={room.imgUrl[current]} alt='' />
    //   </section>
    //   <section data-aos="fade-up" className='roomcard-r2' style={{ fontFamily: 'Geomainist' }}>
    //     <p>{room.seaView ? "WITH SEA VIEW" : null}</p>
    //   </section>
    //   <section data-aos="fade-up" className='roomcard-r3' style={{ fontFamily: 'Geomainist' }}>
    //     <h4>{room.roomType}</h4>
    //   </section>
    //   <section data-aos="fade-up" className='roomcard-r4'>
    //     <span>
    //       <IoIosArrowDropright />
    //     </span>
    //     {room.availableRooms === '0' ? <Button id='sold-out' style={{ backgroundColor: 'red', color: 'white', float: 'right' }}>
    //       SOLD OUT</Button> : null}
    //   </section>
    // </div>
  )
}

export default RoomCard