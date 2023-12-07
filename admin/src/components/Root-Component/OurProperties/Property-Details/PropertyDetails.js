import React, { useEffect, useState } from 'react'
import '../OurProperties.css'
import './PropertyDetails.css'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../../../../helpers/axios';
import RoomCard from '../Room-Card/RoomCards';
import RoomList from '../RoomList';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import EditRoomForm from '../EditRoomForm'
import EditResort from './EditResort'
import PreLoader from '../../../Preloader-Component/Preloader-Component'
// import Images from './Images';

const ViewPropertyDetails = () => {
    const navigate = useNavigate()

    const [resort, setResort] = useState([])
    const { resortname, id } = useParams()
    const token = localStorage.getItem('token')
    //GET PROPERTY DETAILS
    const getProperty = async () => {
        try {
            // const response = await axios.get(`http://localhost:4001/resort-details/${id}`)
            const response = await axios.get(`/resort-details/${id}`)
            // console.log('view details of resort', response.data.resortData)
            setResort(response.data.resortData[0])
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProperty()
        // eslint-disable-next-line
    }, [id])
    console.log("Resort => ", resort)

    const deleteRoom = (roomId, index) => {
        const confirmDelete = async () => {
            // console.log(resort.rooms)
            console.log(resort)
            resort.rooms.splice(index, 1)
            // console.log(resort)
            // return

            // await axios.put(`http://localhost:4001/hotelbook/${resort._id}`, resort)
            await axios.put(`/hotelbook/${resort._id}`, resort, {
                headers: {
                    authorization: token
                }
            })
            .then((res) => {
              console.log(res);
              getProperty()
            })
            .catch((err) => {
              console.log(err)
            })
          }
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='confirm-delete-alert'>
                        <h1>Delete Room ?</h1>
                        <p>Are you sure you want to delete the selected Room?</p>
                        <div>
                        <button onClick={onClose}>Cancel</button>
                        <button
                            onClick={() => {
                                confirmDelete();
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
        return
    }

    if(!resort){
        return(
            <PreLoader/>
        )
    }
        
    return (
        <>
            <div className='view-details-wrapper'>
                <div className='section1'>
                    <button className='back-btn' onClick={() => { navigate('/our-properties') }}
                    >BACK</button>
                </div>
                <div className='section2'>
                    <div className='row1'>
                        <div className='col1'>
                            <h3>{resort.resortName}</h3>
                            <p>{resort.resortLocation}</p>
                        </div>
                        <div className='col2'>
                            <img src={resort.resortImgURL} alt='resort-img' />
                            {/* <select>
              <option>ROOM TYPE</option>
            </select> */}
                        </div>
                    </div>
                </div>

                <div className='section3'>
                    <div className='col1'>
                        <p>{resort.resortDescription}</p>
                    </div>
                    {/* <div className='col2'>
                        <h6>AMINITIES</h6>
                        <div>Swimming Pool</div>
                    </div> */}
                    {/* <EditResort resort={resort} setResort={setResort} getProperty={getProperty}/> */}
                </div>

                <div className='section4'>
                    <h3>Rooms</h3>
                    <div className='room-card-wrapper'>
                        <RoomList rooms={resort.rooms} resort={resort} deleteRoom={deleteRoom} getProperty={getProperty}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewPropertyDetails