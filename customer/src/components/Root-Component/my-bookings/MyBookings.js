import React, { useState, useEffect } from 'react'
import './MyBookings.css'
import { useNavigate } from 'react-router-dom'
// import axios from "../../../helpers/axios";
import axios from 'axios'
import { Icon } from 'react-icons-kit'
import { calendar } from 'react-icons-kit/icomoon/calendar'
import { clock } from 'react-icons-kit/icomoon/clock'
import Footer from '../Footer/Footer'

const MyBookings = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [])
    const navigate = useNavigate()
    const [list, setList] = useState([])


    const token = localStorage.getItem('token')
    const getBookingData = async () => {
        const response = await axios.get('http://localhost:4000/get-bookings', {
            headers: {
                authorization: token
            }
        })
        console.log(response)
        setList(response.data.list)
    }

    useEffect(() => {
        getBookingData()
        // eslint-disable-next-line
    }, [])

    //handle add review button
    const handleFeedbackButton = (id) => {
        console.log(id)
        navigate(`/rating-form/${id}`)
    }

    if (!list) {
        return ('...loading')
    }

    return (
        <>
            <div className='my-bookings-wrapper'>

                <div className='heading'><h3 style={{ fontFamily: 'Geomanist', textAlign: 'center' }}>BOOKINGS</h3></div>

                <div className='wrapper'>
                    {(list.length <= 0) ? (<h1 style={{ opacity: '0.4', textAlign: 'center', margin: 'auto' }}>No Bookings yet !</h1>) :
                        (list.map((booking, i) => {
                            return (
                                <div className="booking-card" key={i + 1}>

                                    <div className="resort-details">
                                        <div style={{ display: 'flex', border: '0' }}>
                                            <div style={{ border: '0' }}><h5 style={{ fontFamily: 'Geomanist', opacity: '0.6', textAlign: 'center' }}>{booking.resortname}</h5></div>
                                            {
                                                (booking.bookingStatus === 'confirmed') ? (
                                                    <div style={{ border: '0' }}><h6 style={{ float: 'right', color: 'darkblue', backgroundColor: '#C7F0FC', padding: '0.5rem' }}>{booking.bookingStatus}</h6></div>) : (
                                                    <div style={{ border: '0' }}><h6 style={{ float: 'right', color: 'red', backgroundColor: '#FCEFB7', padding: '0.5rem' }}>{booking.bookingStatus}</h6></div>)
                                            }
                                        </div>
                                        <p className="room-type">Room Type: {booking.roomType}</p>
                                        <p className='.booking-dates' style={{ fontFamily: "Rajdhani, sans-serif" }}>Check-in: {booking.checkIn}</p>
                                        <p className='.booking-dates' style={{ fontFamily: "Rajdhani, sans-serif" }}>Check-out: {booking.checkOut}</p>
                                    </div>

                                    <div className="booking-rate">
                                        <p className="total-amount" style={{ fontFamily: "Rajdhani, sans-serif" }}>Total amount paid:Rs.{booking.totalAmount}</p>
                                    </div>

                                    <h6 style={{ borderTop: '1px solid rgb(230, 230, 230)', paddingTop: '1rem' }}>booking date & time</h6>

                                    <div className='revbtn-wrap'  >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}>
                                            <div style={{ display: 'flex' }}>
                                                <div><Icon icon={calendar} style={{ color: '#E9C46A' }}></Icon></div>
                                                <div style={{ paddingLeft: '0.3rem' }}>{booking.bookingDate}</div>
                                            </div>
                                            <div style={{ marginRight: '2rem', display: 'flex' }}>
                                                <div style={{ color: '#E9C46A' }}><Icon icon={clock}></Icon></div>
                                                <div style={{ paddingLeft: '0.3rem' }}>{booking.bookingTime}</div>
                                            </div>
                                        </div>

                                        <div className='review-btn-wrap1'>
                                            <button className="review-btn"
                                                onClick={() => handleFeedbackButton(booking.resortId)}>Add Review</button>
                                        </div>
                                    </div>
                                    <div className='review-btn-wrap2'>
                                        <button className="review-btn"
                                            onClick={() => handleFeedbackButton(booking.resortId)}>Add Review</button>
                                    </div>
                                </div>
                            )
                        })
                        )
                    }
                </div>

            </div>
            <Footer />

        </>
    )
}

export default MyBookings