import { useState } from 'react';
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell
} from '@coreui/react'
import axios from '../../../helpers/axios'
import { FaConciergeBell } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import swal from 'sweetalert';

const BookingList = ({ bookingList, setBookingList }) => {
    const [spclRequestDisplay, setSpclRequestDisplay] = useState("")
    const toggleSpecialRequest = (index) => {
        setSpclRequestDisplay(index);
    }

    const list = bookingList;
    // console.log("List => ", list)


    //Delete Confirmation Alert Pop-up
    function deleteBookingComfirmation(item) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='confirm-delete-alert'>
                        <h1>Delete Booking ?</h1>
                        <p>Are you sure you want to delete the selected Booking?</p>
                        <div>
                            <button onClick={onClose}>Cancel</button>
                            <button
                                onClick={() => {
                                    deleteBooking(item);
                                    onClose();
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            }
        });
    }


    //Delete property function =>
    const deleteBooking = async (bookingData) => {
        console.log("Patch => ", bookingData._id);
        if (bookingData.bookingStatus === "cancelled") {
            return toast.error("Booking has already been cancelled by the Client !")
        }
        if (bookingData.bookingStatus === "rejected") {
            return toast.error("Booking has already been Rejected by the Admin !")
        }
        await axios.patch(`/reject-booking/${bookingData._id}`)
        .then((res) => {
            console.log(res);
            rejectionMailToClient(bookingData);
            setBookingList();
            swal({
                title: "Good job!",
                text: "Booking Delected Successfully!",
                icon: "success",
                button: "OK!",
            });
        })
        .catch((err) => {
            alert("An Error occoured ! please try after some time !")
            console.log(err)
        })
    }


    //Booking rejection mail to client function =>
    const rejectionMailToClient = async (bookingData) => {
        // console.log("Mail  => ", bookingData)
        await axios.post("/rejection-mail", bookingData)
            .then((res) => {
                console.log(res);
                setBookingList();
            }).catch((err) => {
                alert("An Error occoured ! please try after some time !")
                console.log(err)
            })
    }
    const bgColorConfirmed = { backgroundColor: "#2eb85c", color: "#ffff", width: "75px" };
    const bgColorCancelled = { backgroundColor: "#e55353", color: "#ffff" };
    const bgColorRejected = { backgroundColor: "#ced2d8", color: "black" };
    return (
        <>
            <ToastContainer
                autoClose={1500}
                limit={5}
                theme={"dark"}
                pauseOnFocusLoss={false}
                position={"bottom-center"}
            />
            <CTable responsive>
                <CTableHead color="dark" >
                    <CTableRow>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Reservation ID</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Client Name</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Client Contact</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Client Email</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">No of Rooms</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Resort Name</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Room Type</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Check in Date</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Check out Date</CTableHeaderCell>
                        <CTableHeaderCell style={{ textAlign: "center" }} scope="col">Booking Status</CTableHeaderCell>
                        <CTableHeaderCell></CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {list.map((item, index) => {
                        return (
                            <>
                                <CTableRow color="light" key={list._id}>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.reservationId}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.name}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.contact}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item.email}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.noOfRooms}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.resortname}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.roomType}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.checkIn}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>{item?.checkOut}</CTableDataCell>
                                    <CTableDataCell style={{ textAlign: "center" }}>
                                        <span className="booking-status" onClick={() => deleteBookingComfirmation(item)}
                                            style={item.bookingStatus == "confirmed" ? bgColorConfirmed
                                                : item.bookingStatus == "cancelled" ? bgColorCancelled
                                                    : bgColorRejected
                                            }>
                                            {item.bookingStatus}
                                        </span>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        {item.specialRequest ? <span onClick={() => { toggleSpecialRequest(item._id) }} className="special-request-call-bell">
                                            <FaConciergeBell />
                                        </span> : null}
                                    </CTableDataCell>
                                    {/* <CTableDataCell>
                                            <button className="view-booking-show-btn">
                                                Show
                                            </button>
                                        </CTableDataCell> */}
                                </CTableRow>
                                <div style={{ display: item._id == spclRequestDisplay ? "block" : "none" }}>
                                    <div style={{ backgroundColor: "#4f5d73", color: "#ffff" }}>
                                        Special Request
                                    </div>
                                    <div style={{ backgroundColor: "lightBlue" }}>
                                        {item.specialRequest}
                                    </div>
                                </div>

                                {/* <div>
                                        <button
                                        onClick={() => { navigate("/client-details/" + item.client) }}
                                        >Client Details</button>
                                        <button>Delete</button>
                                    </div> */}
                            </>
                        )
                    })}
                </CTableBody>
            </CTable>
        </>
    )
}

export default BookingList;