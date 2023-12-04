import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Card, Col, Image } from "react-bootstrap";
// import axios from "axios"
import "./spaCard.css";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import EditSpa from "../postSpaData/editSpaForm";

const SpaCard = ({ card, deleteSpa, getSpaList }) => {
  console.log(card);
  const navigate = useNavigate();
  const [showEditSpaForm, setShowEditSpaForm] = useState(false)

  return (
    <>
      <div>
        <div className="spa-card-container" key={(card._id)}>
          <div className='spa-card-header' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='view-spa-card-details-btn' onClick={() => { navigate("/spa-details/" + card._id) }}>View Details</div>
            <div className='spa-card-delete-icon' onClick={() => { deleteSpa(card._id) }}><RiDeleteBin5Fill /></div>
          </div>
          <div id="spa-card-img">
            <img src={card.imgUrl} alt={card.name} />
          </div>
          <div className="spa-card-footer">
            <div className="spa-card-footer-lb">
              {card.name}
            </div>
            <div className="spa-card-footer-rb">
               <button onClick={() => setShowEditSpaForm(true)}>Edit Spa</button>
            </div>
          </div>
        </div>
        <EditSpa card={card} getSpaList={getSpaList} showEditSpaForm={showEditSpaForm} setShowEditSpaForm={setShowEditSpaForm}/>
      </div>
    </>
  );
};

export default SpaCard;

// {hovered && (
//   <div className="image-name"
//     onClick={() => { navigate("/spa-details/" + card._id) }}
//   >
//     <span>{card.name}</span>
//   </div>
// )}
