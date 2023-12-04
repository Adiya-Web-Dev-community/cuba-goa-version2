import React, { useState, useEffect } from 'react'
import './BookingPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../../../helpers/axios'
import { Button } from '@mui/material'
import { toast } from 'react-hot-toast'
import moment from 'moment'
import { nanoid } from 'nanoid';
import rupee from '../../../../assets/rupee-indian.png'
// import axios from 'axios'
import { useSelector } from 'react-redux'
import Footer from '../../Footer/Footer'
const serverUrl = process.env.REACT_APP_HOST


const BookingPage = () => {
    useEffect(() => {
        // window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);


    const navigate = useNavigate()
    const { resortname, id } = useParams()

    const [user, setUser] = useState([])
    const [datesFromHomePage, setDatesFromHomePage] = useState(false)
    const [checkin, setCheckin] = useState()
    const [checkout, setCheckout] = useState()


    const [finalAmount, setFinalAmount] = useState()

    //store data
    const store = useSelector(store => store)


    const token = localStorage.getItem('token')
    //get sigined in client details
    const getUser = async () => {
        try {
            const response = await axios.get('/user-details', {
                headers: {
                    authorization: token
                }
            })
            if (response.data.success) {
                console.log('userdata=>', response.data.details)
                setUser(response.data.details)
            }
            else {
                console.log('usererr', response.data.message)
            }
        }
        catch (err) {
            console.log('userdetailserr', err)
        }
    }



    useEffect(() => {
        getUser();

        console.log(resortname, id)

        if (store.checkIn !== null && store.checkOut !== null) {
            setDatesFromHomePage(true)
            setCheckin(store.checkIn)
            setCheckout(store.checkOut)
        }
        else {
            setDatesFromHomePage(false)
            setCheckin('')
            setCheckout('')
        }


        console.log('bookingCart===>', store.dataobj, store.setTotalAmount)
        //final amount
        const total_with_tax = store.setTotalAmount + (store.setTotalAmount * 12 / 100)
        setFinalAmount(total_with_tax)
        // eslint-disable-next-line
    }, [])


    //booking form
    const [bookingForm, setBookingForm] = useState({
        email: '', name: '', contact: '', specialRequest: '',
    })


    //handle inputs
    const handleInputs = (e) => {
        setBookingForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }





    //handle payNow
    const payNow = async () => {
        // console.log('', bookingForm)
        const bookingDate = moment().format('DD/MM/YYYY')
        const bookingTime = moment().format('HH:mm')
        // console.log(roomNos)

        if (datesFromHomePage) {
            // console.log('store', store)
        }

        const bookingData = {
            name: user.name,
            email: user.email,
            contact: user.contact,
            resortname: resortname,
            checkIn: checkin,
            checkOut: checkout,
            roomsBooked: store.dataobj,
            specialRequest: bookingForm.specialRequest,
            totalAmount: store.setTotalAmount,
            bookingDate: bookingDate,
            bookingTime: bookingTime,
            reservationId: nanoid(),
            bookingStatus: 'confirmed'
        }
        console.log(bookingData)
        try {
            const response = await axios.post(`/booking-form/${resortname}/${id}`, bookingData, {
                headers: {
                    authorization: token
                }
            })
            console.log(response)
            toast.success('Booking Confirmed')
            if (response.data.success) {
                const { email } = user
                // toast.loading('waiting for confirmation')
                const response = await fetch(`${serverUrl}/send-email`, {
                    // const resp = await fetch('http://localhost:4000/send-email', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token
                    },
                    body: JSON.stringify({
                        ...bookingData,
                        email,
                    })
                });

            }
            toast.dismiss();
            navigate('/my-bookings')
            toast.success('Booking confirmation email sent')
        }
        catch (err) {
            console.log(err)
        }

    }



    //send email after successful booking
    // const sendEmail = async () => {
    //     console.log('serverURL', serverUrl)
    //     const bookingDate = moment().format('DD/MM/YYYY')
    //     const bookingTime = moment().format('HH:mm')
    //     const bookingData = {
    //         name: user.name,
    //         email: user.email,
    //         contact: user.contact,
    //         resortname: resortname,
    //         checkIn: checkin,
    //         checkOut: checkout,
    //         roomsBooked: store.dataobj,
    //         specialRequest: bookingForm.specialRequest,
    //         totalAmount: store.setTotalAmount,
    //         bookingDate: bookingDate,
    //         bookingTime: bookingTime,
    //         reservationId: nanoid(),
    //         bookingStatus: 'confirmed'
    //     }
    //     const { email } = user
    //     // console.log(`email sent to ${email}`)

    //     try {
    //         toast.loading('waiting for confirmation')
    //         // eslint-disable-next-line
    //         // const response = await fetch(`${serverUrl}/send-email`, {
    //         const response = await fetch('http://localhost:4000/send-email', {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 authorization: token
    //             },
    //             body: JSON.stringify({
    //                 ...bookingData,
    //                 email,
    //             })
    //         });
    //         toast.dismiss();
    //         // navigate('/my-bookings')
    //         toast.success('Booking confirmation email sent')
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }





    return (
        <>
            <div className='bookingsummaryheading'>
                <h4>BOOKING SUMMARY</h4>
            </div>
            <div className='booking-page-wrapper'>
                {/* col1 */}
                <div className='col1'>
                    <div className='row1' >
                        <div><h5>Your Booking Details</h5></div>
                        <div className='dates'>
                            <div>
                                <lable>Check-in </lable>
                                {(datesFromHomePage) ? (
                                    <h5>{checkin}</h5>
                                ) : (
                                    <input type='date' placeholder='check-in'
                                        name='checkin' value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                                )}
                            </div>
                            <div>
                                <lable>Check-out </lable>
                                {(datesFromHomePage) ? (
                                    <h5>{checkout}</h5>
                                ) : (
                                    <input type='date' placeholder='check-in'
                                        name='checkout' value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                                )}
                            </div>
                        </div>
                        {/* <div className='dummy-border'></div> */}

                    </div>

                    <div className='row2'>
                        <div><h5>Your Price Summary</h5></div>
                        <div>
                            <div><h5>Total Room Rates</h5></div>
                            <div className='totalamount-wrap'>
                                <img src={rupee} alt='' style={{ height: '1rem', marginTop: '.3rem', marginRight: '.5rem' }} />
                                <h5>{store.setTotalAmount}</h5>
                                <p style={{ marginTop: '.1rem', marginLeft: '.5rem' }}>+12 % Tax</p>
                            </div>
                        </div>
                    </div>

                    <div className='row3'>
                        <h6>Please go through our terms and conditions carefully</h6>
                        <details>
                            <summary>Hotel Policy</summary>
                            <p>
                                <ul>
                                    <li>All prices are subject to availability</li>
                                    <li>Luxury tax and service tax applicable as per government of India regulations.</li>
                                    <li>Complimentary breakfast (in case the guests are entitled to) will be served as per Breakfast Menu between 08:30 AM to 10:30 AM only.</li>
                                    <li>Outside Food and Drinks are strictly not allowed.</li>
                                    <li>Washing of clothes in the room is not allowed.</li>
                                    <li>You can just pay INR 100 per day and get 10 pieces of clothes washed on daily basis.</li>
                                    <li>There will be no refund given if there is no complaint for room informed within 3 hrs of check in.</li>
                                    <li>Late checkOut charges of INR 300 will be applicable for any check-out after 11:00 am.</li>
                                    <li>Security Deposit of INR 1000 to be paid at the time of check in for any damages which is refundable at the time of check out</li>
                                </ul>
                            </p>
                        </details>
                        <details>
                            <summary>Cancellation Policy</summary>
                            <p>
                                <ul>
                                    <li>Any Cancellation request received up to 15 days prior check in will not attract any cancellation fees</li>
                                    <li>Any Cancellation request received from 15 days to 01 days prior to check in will attract 01 night retention charges</li>
                                    <li>Any cancellation on the day of check-in will be non refundable</li>
                                    <li>No show , early check out will be non refundable</li>
                                </ul>
                            </p>
                        </details>
                        <details>
                            <summary>Season Cancellation ( 20th December to 5th January)</summary>
                            <p>
                                <ul>
                                    <li>Bookings once made will not be NON-REFUNDABLE, NON-AMENDABLE</li>
                                    <li>Mandatory Gala Dinner Charges will be applicable for any guest staying on 25th Dec and 31st Dec.</li>
                                </ul>
                            </p>
                        </details>
                    </div>

                </div>
                {/* col1 ends */}

                {/* col2 */}
                <div className='col2'>
                    <div className='row1' style={{ display: 'none' }}>
                    </div>


                    {/* row2 */}
                    <div className='row2' style={{ marginTop: '0', paddingTop: '0' }}>
                        <div >
                            <h4 >CheckIn-CheckOut Details</h4></div>
                        <table>
                            <tr>
                                <td>Check-In from :</td>
                                <td>12 PM</td>
                            </tr>
                            <tr>
                                <td>Check-Out before : </td>
                                <td>10 AM</td>
                            </tr>
                            <tr>
                                <td>Reception contact no:</td>
                                {/* <td>{resort[0]?.resortPhoneNumber}</td> */}
                            </tr>
                        </table>
                    </div>

                    <div className='row3'>
                        <details>
                            <summary>Booking Policy</summary>
                            <p>
                                <ul>
                                    <li>The total price of the reservation will be charged on the day of booking</li>
                                    <li>Any type of extra mattress or child's cot/crib is upon request and needs to be confirmed by management.</li>
                                    <li>Supplements are not calculated automatically in the total costs and will have to be paid for separately during your stay.</li>
                                </ul>
                            </p>
                        </details>
                    </div>

                    <div className='row4'>
                        <h5>Guest Information</h5>
                        {/* <p>Dear {user.name}, you reserved  {roomNos} rooms of {room.roomType} ,
                            at  {resortname}, Goa
                        </p> */}
                        <p>Address: <br />
                            {/* {resort[0]?.resortAddress},{resort[0]?.pincode} */}
                        </p>

                        <div>
                            <h5>SPECIAL REQUEST</h5>
                            <textarea placeholder='If you have any specific preferences or requirements, such as dietary restrictions or room preferences, please inform us in advance, and we will do our best to accommodate them.'
                                name='specialRequest' value={bookingForm.specialRequest} onChange={handleInputs}></textarea>
                        </div>
                    </div>





                    <div className='row5'>
                        <Button onClick={payNow} className='btn' variant='contained'>PAY NOW</Button>
                    </div>
                </div>


                {/* col2 ends */}

            </div >
            <Footer/>
        </>
    )
}

export default BookingPage