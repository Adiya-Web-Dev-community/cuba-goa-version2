import { useState } from "react";
import './BookingModal.css'; 
// Updated import statement
import {
  X,
 
} from "lucide-react";
import axios from "../../../helpers/axios";
import { useNavigate,  } from "react-router-dom";
export const BookingModal = ({ listing, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
 
    noOfFemale: "",
    therapyChoice: "",
    checkIn: "",
    checkOut: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleBooking = async (e) => {
     e.preventDefault();
     try {
       const response = await axios.post("/spa-booking", formData);
       // Navigate to payment page with booking details
       navigate("/payment", {
         state: {
           bookingDetails: formData,
         },
       });
     } catch (err) {
       console.log(err);
       alert("Booking failed. Please try again.");
     }
   }; 
 

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="booking-modal-close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="booking-modal-content">
         

          <form className="booking-form" onSubmit={handleBooking}>
            <div className="booking-form-row">
              <div className="booking-form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="booking-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="booking-form-row">
              <div className="booking-form-group">
                <label>Contact</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
            </div>

            <div className="booking-form-row">
              <div className="booking-form-group">
                <label>Number of Females</label>
                <input
                  type="number"
                  name="noOfFemale"
                  min="0"
                  value={formData.noOfFemale}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="booking-form-group">
                <label>Service Choice</label>
                <select
                  name="therapyChoice"
                  value={formData.therapyChoice}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Services</option>
                  <option value="Massage">Tent / accessories</option>
                  <option value="Yoga">Food Cateing</option>
                  <option value="Meditation">Event management</option>
                  <option value="Acupuncture">Photography</option>
                </select>
              </div>
            </div>

            <div className="booking-form-row">
              <div className="booking-form-group">
                <label>Check-in Date</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="booking-form-group">
                <label>Check-out Date</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="booking-submit-button">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};