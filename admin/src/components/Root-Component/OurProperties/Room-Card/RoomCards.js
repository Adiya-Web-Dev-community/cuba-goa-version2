import React from 'react'
import './RoomCard.css'

import { Icon } from 'react-icons-kit'
import { images } from 'react-icons-kit/icomoon/images'
import { useNavigate, useParams } from 'react-router'
import { FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner'
import EditRoomForm from '../EditRoomForm'

const RoomCard = ({ room, resort, deleteRoom, index, getProperty }) => {
    console.log("Room => ", room)
    const navigate = useNavigate()
    const handleBooking = () => {
    }

    if (!room) {
        return (
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        )
    }

    return (
        <div className='RoomCard card'>
            <div className='row1'>
                <div>
                    <h4>{room.roomType}</h4>
                </div>
                {/* <div className='images-icon'>
                    <Icon icon={images} size={25}></Icon>
                </div> */}
            </div>

            <div className='row3'>
                <div>
                    {/* <p>Rate per night:
                        <span style={{ fontWeight: 500 }}> Rs {room.ratePerNight}
                        </span>
                    </p> */}
                    <div>
                        <p>Week-Day rate per night :
                            <span style={{ marginLeft: '3px', fontWeight: 500 }}>
                                Rs {room.weekdayPerNightRate}
                            </span>
                        </p>
                        <p>Week-End rate per night :
                            <span style={{ marginLeft: '3px', fontWeight: 500 }}>
                                Rs {room.weekendPerNightRate}
                            </span>
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>Adults Capacity :
                            <span style={{ marginLeft: '3px', fontWeight: 500 }}>
                                {room.adultCapacity}
                            </span>
                        </p>
                        <p>Children Capacity :
                            <span style={{ marginLeft: '3px', fontWeight: 500 }}>
                                {room.childrenCapacity}
                            </span>
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>Total Rooms :
                            <span style={{ marginLeft: '3px', fontWeight: 500 }}>
                                {room.totalRooms}
                            </span>
                        </p>
                        <p>Available Rooms :
                            <span style={{ marginLeft: '3px', fontWeight: 500 }}>
                                {room.availableRooms}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className='row2'>
                <div>Wifi {room.Wifi ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>AC {room.airconditioned ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Balcony {room.balcony ? <span className="room-amenities-yes"><FaCheck /></span> : <span><FaTimes /></span>}</div>
                <div>Bedside Table {room.bedsideTable ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Breakfast {room.breakfast ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Fitness Center {room.fitnessCenter ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>24 hrs Hot & Cold Shower {room.hotNcoldshower_24hrs ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>House Keeping {room.houseKeeping ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Mosquito Net {room.mosquitonet ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Non-Refundable {room.nonRefundable ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Room Service {room.roomService ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>sea View {room.seaView ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Spa {room.spa ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Swimming Pool {room.swimmingPool ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
                <div>Wardrobe {room.wardrobe ? <span className="room-amenities-yes"><FaCheck /></span> : <span className="room-amenities-no"><FaTimes /></span>}</div>
            </div>

            <div className='row4'>
                <div>
                    <button onClick={() => deleteRoom(room.roomId, index)}>Delete Room</button>
                </div>
                <div>
                    {/* <button onClick={() => { }}>Edit Room</button> */}
                    <EditRoomForm
                        getProperty={getProperty}
                        room={room}
                        resort={resort}
                        index={index}
                    />
                </div>
            </div>
        </div>
    )
}

export default RoomCard