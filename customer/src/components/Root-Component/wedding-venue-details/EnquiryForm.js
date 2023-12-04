import React, { useState } from "react";
import "./WeddingDetails.css";
import toast from "react-hot-toast";
import axios from "../../../helpers/axios";
import { useNavigate } from "react-router-dom";

const EnquiryForm = () => {
  const navigate = useNavigate();

  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    contact: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    noOfGuests: "",
    message: "",
  });

  const handleInputs = (e) => {
    setEnquiryForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log(enquiryForm);
    try {
      const resp = await axios.post("/wedding-enquiry", enquiryForm);
      if (resp.data.success) {
        toast.success(resp.data.message);
        navigate("/destination-wedding");
      }
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="weddingenquiry-form-wrap">
      <h4>ENQUIRY</h4>
      <form class="enquiry-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={enquiryForm.name}
            onChange={handleInputs}
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={enquiryForm.email}
            onChange={handleInputs}
            required
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={enquiryForm.contact}
            onChange={handleInputs}
            required
          />
        </div>
        <div class="form-group">
          <label for="event-type">Event Type:</label>
          <select
            id="event-type"
            name="event-type"
            value={enquiryForm.eventType}
            onChange={handleInputs}
            required
          >
            <option value="">Select Event Type</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate Event</option>
            <option value="Social">Social Gathering</option>
          </select>
        </div>
        <div class="form-group">
          <label for="event-date">Event Date:</label>
          <input
            type="date"
            className="custom-date-input"
            id="event-date"
            name="event-date"
            value={enquiryForm.eventDate}
            onChange={handleInputs}
            required
          />
        </div>
        <div class="form-group">
          <label for="guests">Number of Guests:</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={enquiryForm.noOfGuests}
            onChange={handleInputs}
            required
          />
        </div>
        <div class="form-group">
          <label for="timing">Timing:</label>
          <input
            type="time"
            id="timing"
            name="timing"
            value={enquiryForm.time}
            onChange={handleInputs}
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={enquiryForm.message}
            onChange={handleInputs}
            required
          />
        </div>
      </form>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleSubmit}
          style={{
            width: "10rem",
            backgroundColor: "darkblue",
            color: "white",
            fontWeight: "normal",
            borderRadius: ".2rem",
          }}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default EnquiryForm;
