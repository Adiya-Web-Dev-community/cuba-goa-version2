import React, { useEffect, useState } from 'react'
import './RoomTable.css';
import { useParams, useNavigate } from "react-router";
import axios from '../../../../helpers/axios'
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import { FaUser } from 'react-icons/fa';
import { TiUser } from 'react-icons/ti';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { MdContactSupport, MdOutlineFreeBreakfast } from 'react-icons/md';


import { useDispatch } from 'react-redux';
import Footer from '../../Footer/Footer';

const RoomTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { resortname, id } = useParams()
    const [resort, setResort] = useState({})
    const [imgArr, setImgArr] = useState([])
    const [roomArr, setRoomArr] = useState([])
    const [select, setSelect] = useState(false)
    const [dayStatus, setDayStatus] = useState('')
    const [roomsSelected, setRoomsSelected] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)



    const [dataobj, setDataObj] = useState({})

    //GET PROPERTY DETAILS
    const getProperty = async () => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        try {
            const response = await axios.get(`/resort-details/${id}`)
            console.log(response.data.resortData[0].rooms)
            setResort(response.data.resortData[0])
            setRoomArr(response.data.resortData[0].rooms)
            setImgArr(response.data.resortData[0].rooms[0].imgUrl);


            (dayOfWeek === 0 || dayOfWeek === 6) ? (setDayStatus('weekendPrice')) : (setDayStatus('weekdayPrice'))

        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProperty();
        // eslint-disable-next-line
    }, [])




    // handle total
    const handleTotal = (roomNos, roomId) => {
        setSelect(true)
        let roomPrice = 0
        for (let i = 0; i < roomArr.length; i++) {
            if (roomArr[i].roomId === roomId) {
                roomPrice = (dayStatus === 'weekdayPrice') ? (roomArr[i].weekdayPerNightRate) : (roomArr[i].weekendPerNightRate)
            }
        }

        setRoomsSelected(roomsSelected + roomNos)
        setTotalPrice(totalPrice + roomNos * roomPrice)

        if (!(roomId in dataobj)) {
            dataobj[roomId] = roomNos
        }
        else {
            //if already present replace with new clicked entry
            dataobj[roomId] = roomNos
        }

    }
    useEffect(() => {
        console.log('total room & price', roomsSelected, totalPrice);

        // eslint-disable-next-line
        console.log(dataobj);
        // eslint-disable-next-line
    }, [handleTotal])


    //handle final reserver
    const handleReserve = () => {
        if (Object.keys(dataobj).length !== 0) {
            dispatch({ type: 'setbookingcart', payload: { dataobj: dataobj } })
            dispatch({ type: 'setTotalAmount', payload: { setTotalAmount: totalPrice } })
            navigate(`/booking-summary/${resortname}/${id}`)
        }
        else {
            console.log('select room first')
        }
    }


    if (!id) {
        return (
            <h1>.</h1>
        )
    }

    return (
        <>
            <section className='rooms-table-container'>
                <CTable responsive>
                    <CTableHead className='rooms-table-header'>
                        <CTableRow className='header-cell'>
                            <CTableHeaderCell className='cell' scope="col">Room type</CTableHeaderCell>
                            <CTableHeaderCell className='cell' scope="col">Sleeps</CTableHeaderCell>
                            <CTableHeaderCell className='cell' scope="col">Price for 1 Night</CTableHeaderCell>
                            <CTableHeaderCell className='cell' scope="col">Your Choices</CTableHeaderCell>
                            <CTableHeaderCell className='cell' scope="col">Select amount</CTableHeaderCell>
                            <CTableHeaderCell></CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {
                            roomArr?.map((room, idx) => {
                                const availableRooms = parseInt(room.availableRooms)
                                return (
                                    <CTableRow className='rooms-table-row' key={room._id}>
                                        <CTableDataCell style={{ borderRight: '1px solid #3376b0' }}
                                            className='cell' scope="row">
                                            {<p style={{ color: '#3376b0', fontWeight: '700', marginLeft: '0px' }}
                                                onClick={() => navigate(`/${id}/${room.roomType}/${room.roomId}/details`)}
                                            ><span style={{ borderBottom: '2px solid #3376b0' }}>{room.roomType}</span></p>}
                                            {/* {<p style={{color: 'black', fontsize: '12px'}}>{room.seaView ? "with sea view" : null}</p>} */}
                                            <p className='rooms-table-aminities'>
                                                <section>
                                                    <p >{room.Wifi ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Wifi</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.airconditioned ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Air conditioned</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.balcony ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Balcony</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.bedsideTable ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>bedside Table</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.breakfast ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Breakfast</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.childrenCapacity ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Children Capacity</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.fitnessCenter ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Fitness Center</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.spa ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Spa</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.swimmingPool ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Swimming Pool</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                                <section>
                                                    <p >{room.wardrobe ? <span className="room-amenities-yes"><FaCheck style={{ color: 'green' }} />
                                                        <span style={{ marginLeft: '0.4rem' }}>Wardrobe</span>
                                                    </span>
                                                        : null}
                                                    </p>
                                                </section>
                                            </p>
                                        </CTableDataCell>
                                        <CTableDataCell style={{ borderRight: '1px solid #3376b0' }}>
                                            <section className='cell rooms-table-sleeps'>
                                                <span><FaUser /> × <span>{room.adultCapacity}</span></span>
                                                <span style={{ marginLeft: '15px' }}><TiUser /> × <span>{room.childrenCapacity}</span></span>
                                            </section>
                                        </CTableDataCell>
                                        <CTableDataCell className='cell' style={{ borderRight: '1px solid #3376b0' }}>
                                            <section className='rooms-table-prices'>
                                                <p style={{ color: 'black' }}>Weekday rates: ₹ <span style={{ fontSize: '18px' }}>{room.weekdayPerNightRate}</span></p>
                                                <p style={{ color: 'black' }}>Weekend rates: ₹ <span style={{ fontSize: '18px' }}>{room.weekendPerNightRate}</span></p>
                                            </section>
                                        </CTableDataCell>
                                        <CTableDataCell style={{ borderRight: '1px solid #3376b0' }}>
                                            <section className='rooms-table-yourchoices'>
                                                <span><MdOutlineFreeBreakfast /></span>
                                                {room.breakfast ?
                                                    <span>
                                                        Continental Breakfast included
                                                    </span>
                                                    :
                                                    <span>
                                                        Breakfast ₹ 250 (optional)
                                                    </span>
                                                }
                                            </section>
                                        </CTableDataCell>
                                        <CTableDataCell style={{ borderRight: '1px solid #3376b0' }}>
                                            <section className='rooms-table-select-amt'>
                                                {availableRooms === 0 ? <span className='soldout-btn'>SOLD OUT</span> :
                                                    // <select onChange={handleTotal}>
                                                    //     <option value={0}>0</option>
                                                    //     {
                                                    //         [...Array(availableRooms + 1)].map((i, index) => {
                                                    //             return (
                                                    //                 <option>
                                                    //                     {index ?
                                                    //                         (
                                                    //                             <span value={i}>
                                                    //                                 {index} (₹ {(dayStatus === 'weekdayPrice') ? (index * room.weekdayPerNightRate) : (index * room.weekendPerNightRate)})
                                                    //                             </span>)
                                                    //                         :
                                                    //                         (null)
                                                    //                     }
                                                    //                 </option>
                                                    //                 // <option value={[room._id, Status]}>{Status} (₹ {Status * room.weekdayPerNightRate})</option>
                                                    //             )
                                                    //         })
                                                    //     }
                                                    // </select>
                                                    (
                                                        <div className="dropdown">
                                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                                                style={{ backgroundColor: 'transparent', width: '5rem', color: 'black' }}>
                                                                {(!select) ? (0) : (roomsSelected)}
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                {[...Array(room.availableRooms + 1)].map((_, index) => {
                                                                    return (
                                                                        <>
                                                                            {index ? (
                                                                                <div onClick={() => handleTotal(index, room.roomId)}
                                                                                    style={{ display: 'flex', gap: '2rem', padding: '0 1rem', borderBottom: '1px solid lightgrey' }} >
                                                                                    <p>{index}</p>
                                                                                    <p >(Rs.{index * room.weekdayPerNightRate})</p>
                                                                                </div>
                                                                            ) : (null)}
                                                                        </>
                                                                    )
                                                                })}

                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </section>
                                        </CTableDataCell>
                                        <CTableDataCell style={{ border: 'none' }} className={`box ${idx === 0 ? 'boxvisible' : 'boxhidden'}`}>
                                            <section className='rooms-table-total-block'>
                                                {roomsSelected ?
                                                    <div>
                                                        <section>
                                                            {roomsSelected} rooms for
                                                        </section>
                                                        <section>
                                                            ₹ {totalPrice}
                                                        </section>
                                                    </div>
                                                    :
                                                    null
                                                }
                                                <div>
                                                    <section>
                                                        <button className='i-will-reserve-btn' onClick={handleReserve}>
                                                            I'll reserve
                                                        </button>
                                                    </section>
                                                    <section>
                                                        <ul>
                                                            <li>Confirmation is immediate</li>
                                                            <li>No booking or credit card fees!</li>
                                                        </ul>
                                                    </section>
                                                </div>
                                            </section>
                                        </CTableDataCell>
                                    </CTableRow>
                                )
                            })
                        }
                    </CTableBody>
                </CTable>
            </section>
            <Footer />
        </>
    )
}

export default RoomTable;