import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../helpers/axios";
import Footer from "../Footer/Footer";
import "./Spa-details.css";
import {
  Car,
  Plane,
  Home,
  Bath,
  Users,
  Phone,
  Coffee,
  Wifi,
  Shield,
  Globe,
} from "lucide-react";

export default function SpaDetails() {
  const [details, setDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const { spaId } = useParams();
  const [spaForm, setSpaForm] = useState({
    name: "",
    email: "",
    contact: "",
    date: "",
    noOfFemale: "",
    therapyChoice: "",
    checkIn: "",
    checkOut: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDetails();
    // eslint-disable-next-line
  }, [spaId]);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`/spaDetails/${spaId}`);
      setDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const images = [
    details.imgUrl,
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGhvbWV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvbWV8ZW58MHx8MHx8fDA%3D",
  ];

  const attractions = [
    {
      id: 1,
      name: "Taj Mahal",
      description:
        "A symbol of love and one of the Seven Wonders of the World.",
      location: "Agra, India",
      image:
        "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2814,w_4241,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/shutterstock_400068991_qpukq2.jpg",
      mapLink: "https://maps.google.com/?q=Taj+Mahal,Agra,India",
    },
    {
      id: 2,
      name: "India Gate",
      description: "A war memorial dedicated to the Indian soldiers.",
      location: "Delhi, India",
      image:
        "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2814,w_4241,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/shutterstock_400068991_qpukq2.jpg",
      mapLink: "https://maps.google.com/?q=India+Gate,Delhi,India",
    },
    {
      id: 3,
      name: "Golden Temple",
      description: "A beautiful Sikh temple known for its golden architecture.",
      location: "Amritsar, India",
      image:
        "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2814,w_4241,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/shutterstock_400068991_qpukq2.jpg",
      mapLink: "https://maps.google.com/?q=Golden+Temple,Amritsar,India",
    },
  ];

  const handleInputs = (e) => {
    setSpaForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/spa-booking", spaForm);
      // Navigate to payment page with booking details
      navigate("/payment", {
        state: {
          bookingDetails: spaForm,
        },
      });
    } catch (err) {
      console.log(err);
      alert("Booking failed. Please try again.");
    }
  };

  if (!details) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const getIcon = (category) => {
    const icons = {
      popular: <Home />,
      bathroom: <Bath />,
      bedroom: <Home />,
      outdoors: <Car />,
      activities: <Users />,
      livingArea: <Home />,
      mediaTech: <Phone />,
      foodDrink: <Coffee />,
      internet: <Wifi />,
      parking: <Car />,
      services: <Plane />,
      security: <Shield />,
      general: <Home />,
      languages: <Globe />,
    };
    return icons[category] || <Home />;
  };

  const facilities = {
    property: [
      "Bedrooms",
      "Bathrooms",
      "Living areas & Hall",
      "Aircondition",
      "Geysor",
      "Refrigerator",
    ],
    outdoor: ["Lawn", "Swimming pool", "Garden", "play area", "parking"],
    mediaTech: ["Projector Screen", "Music System", "wifi", "lighting"],
    activeity: [
      "camping",
      "Rain dance",
      "Box Cricket ",
      "Party Zone",
      "organic plantations",
    ],
    food: [
      "Barbecue grill",
      "In house kitchen",
      "Kitchen equipment & gas",
      "   Food / chef",
      "Drinking water",
    ],

    events: ["      Tables", " Chairs", " Food tables"],
    services: ["Laundry", "House keeping", "Room service"],
    security: [" Care taker", " Security", " CC Survillance"],
  };

  const services = [
    "Tent / Accessories",
    "Food Catering",
    "Event Management",
    "Photography",
  ];
  const handleCheckboxChange = (service) => {
    setSelectedServices(
      (prev) =>
        prev.includes(service)
          ? prev.filter((s) => s !== service) // Remove if already selected
          : [...prev, service] // Add if not selected
    );
  };

  return (
    <div className="spa-main-container">
      <div className="spa-hero-section">
        <h1 className="spa-title">{details.name}</h1>
        <p className="spa-sub">Your perfect countryside getaway</p>
      </div>

      <div className="spa-gallery">
        <div className="gallery-main">
          <img src={images[selectedImage]} alt="Main Spa" />
        </div>
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImage === index ? "active" : ""}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`Spa ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="spa-content-wrapper">
        <div className="spa-details-section">
          <div className="amenities-section">
            <h2>Experience Highlights</h2>
            <div className="amenities-grid">
              <div className="amenity-item">
                <span className="amenity-icon">🌿</span>
                <span>Traditional Ayurvedic Treatments</span>
              </div>
              <div className="amenity-item">
                <span className="amenity-icon">💆‍♀️</span>
                <span>Expert Therapists</span>
              </div>
              <div className="amenity-item">
                <span className="amenity-icon">🏖️</span>
                <span>Beachside Location</span>
              </div>
              <div className="amenity-item">
                <span className="amenity-icon">✨</span>
                <span>Premium Products</span>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h2>About This Experience</h2>
            <p>{details.details}</p>
          </div>

          <div className="facilities-container">
            <h2 className="facilities-title">Our Facilities</h2>
            <div className="facilities-grid">
              {Object.entries(facilities).map(([category, items]) => (
                <div key={category} className="facility-card">
                  <div className="facility-header">
                    <div className="facility-icon">{getIcon(category)}</div>
                    <h3 className="facility-category">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                  </div>
                  <div className="facility-content">
                    <ul className="facility-list">
                      {items.map((item, index) => (
                        <li key={index} className="facility-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="booking-section">
          <div className="booking-card">
            <h2>Book Your Stay</h2>
            <form onSubmit={handleBooking} className="booking-form">
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={spaForm.name}
                  onChange={handleInputs}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={spaForm.email}
                  onChange={handleInputs}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="checkIn">Check-in Date</label>
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={spaForm.checkIn}
                    onChange={handleInputs}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="checkOut">Check-out Date</label>
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={spaForm.checkOut}
                    onChange={handleInputs}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="contact">Contact Number</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={spaForm.contact}
                  onChange={handleInputs}
                  required
                  placeholder="Enter your contact number"
                />
              </div>

              <div className="input-group">
                <label htmlFor="noOfFemale">Number of Guests</label>
                <input
                  type="number"
                  id="noOfFemale"
                  name="noOfFemale"
                  value={spaForm.noOfFemale}
                  onChange={handleInputs}
                  required
                  min="1"
                  max="8"
                  placeholder="Number of guests (max 8)"
                />
              </div>

              <div className="service-form-group">
      <label className="service-label">Services Choice</label>
      <div className="service-grid">
        {services.map((service, index) => (
          <label key={index} className="service-checkbox">
            <input
              type="checkbox"
              value={service}
              checked={selectedServices.includes(service)}
              onChange={() => handleCheckboxChange(service)}
              className="service-input"
            />
            <span className="service-checkmark"></span>
            <span className="service-text">{service}</span>
          </label>
        ))}
      </div>
    </div>
              <button type="submit" className="book-now-btn">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="facilities-section">
        <h2> OUR AMENITIES</h2>
        <div className="facilities-grid">
          {facilities.property.map((facility, index) => (
            <div key={index} className="facility-item">
              <span className="facility-icon">✓</span>
              <span>{facility}</span>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="locations-section">
        <div className="section-header">
          <h2>Our Locations</h2>
          <p>Find us at these beautiful destinations in Goa</p>
        </div>

        <div className="location-cards">
          <div className="location-card">
            <div className="location-icon">📍</div>
            <h3>CUBA BEACH BUNGALOWS</h3>
            <p>
              Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702
            </p>
          </div>

          <div className="location-card">
            <div className="location-icon">📍</div>
            <h3>CUBA PATNEM BEACH BUNGALOWS</h3>
            <p>
              North side of Patnem Beach, Palolem-Patnem Road, Canacona, Goa -
              403702
            </p>
          </div>

          <div className="location-card">
            <div className="location-icon">📍</div>
            <h3>CUBA PREMIUM HUTS</h3>
            <p>
              Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702
            </p>
          </div>

          <div className="location-card">
            <div className="location-icon">📍</div>
            <h3>PALOLEM BEACH RESORT</h3>
            <p>
              Entrance of Palolem Beach, Besides car parking area, Palolem
              Beach, Canacona, Goa - 403702
            </p>
          </div>

          <div className="location-card">
            <div className="location-icon">📍</div>
            <h3>CUBA AGONDA</h3>
            <p>Tambli Val, Agonda Beach Road, Agonda, Canacona, Goa - 403702</p>
          </div>
        </div>

        <div className="things-to-know">
          <h2>Need-to-know information</h2>
          <div className="grid-container">
            <div className="grid-item">
              <h3>House Rules</h3>
              <ul className="House">
                <li>Check-in after 2:00 pm</li>
                <li>Checkout before 11:00 am</li>
                <li>8 guests maximum</li>
              </ul>
            </div>
            <div className="grid-item">
              <h3>Safety & Property</h3>
              <ul>
                <li>No smoke alarm</li>
                <li>Carbon monoxide detector not required</li>
              </ul>
            </div>
            <div className="grid-item">
              <h3>Cancellation Policy</h3>
              <p>This reservation is non-refundable.</p>
              <p>Review this Host's full policy for details.</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="attractions-container">
        <h2>Nearby Attractions</h2>
        <div className="attractions-list">
          {attractions.map((place) => (
            <div key={place.id} className="attraction-card">
              <img
                src={place.image}
                alt={place.name}
                className="attraction-image"
              />
              <div className="attraction-info">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <p>
                  <strong>Location:</strong> {place.location}
                </p>
                <a
                  href={place.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 View on Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
