import './PropertyCard.css'
import '../OurProperties.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    CButton, CCol, CModal, CModalHeader,
    CModalTitle, CModalBody, CModalFooter, CFormInput, CRow,
    CFormTextarea, CFormCheck, CCard, CCardHeader, CCardBody,
    CImage,
    CContainer
} from '@coreui/react'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom'
import AddMoreRoomForm from '../AddMoreRoomForm';
import EditResort from '../Property-Details/EditResort';


const PropertyCard = ({ property, allProperties, getPropertiesData, key, deleteProperty }) => {

    const navigate = useNavigate()
    //SHOW ROOMS
    const viewRooms = (id, resortname) => {
        navigate(`/${resortname}/${id}/rooms`)
        console.log(resortname, id)
    }
    
    const [showEditResortForm, setShowEditResortForm] = useState(false)
    const [showRoomForm, setRoomForm] = useState(false)
    console.log("allProperties =>", allProperties)
    if (!allProperties) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <div className='about-hotel'>
                <div className="property-card-container" key={key}>
                    <div className='properties-card-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className='view-prop-card-details-btn' onClick={() => viewRooms(property._id, property.resortName)}>View Details</div>
                        <div className='property-card-delete-icon' onClick={() => deleteProperty(property._id)}><RiDeleteBin5Fill /></div>
                    </div>
                    <div id="property-card-img" key={key}>
                        <img src={property.resortImgURL} alt={property.resortName} />
                    </div>
                    <div className="card-footer">
                        <div className="card-footer-lb">
                            <div>
                                {property.resortLocation + ",  India"}
                            </div>
                            <div>
                                {property.resortName}
                            </div>
                        </div>
                        <div className="card-footer-rb">
                            <div className="card-footer-rb-r1">
                                <button id='property-card-add-btn' onClick={() => setRoomForm(true)}>Add Rooms</button>
                            </div>
                            <div className="card-footer-rb-r2">
                                <button onClick={() =>  setShowEditResortForm(true)}>Edit Resort</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddMoreRoomForm getPropertiesData={getPropertiesData}
                showRoomForm={showRoomForm}
                property={property}
                setRoomForm={setRoomForm}
            />
            <EditResort
                getPropertiesData={getPropertiesData}
                property={property}
                showEditResortForm = {showEditResortForm}
                setShowEditResortForm = {setShowEditResortForm}
            />
        </>
    )
}

export default PropertyCard;