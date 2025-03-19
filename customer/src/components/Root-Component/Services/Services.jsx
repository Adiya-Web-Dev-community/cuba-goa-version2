import React, { useState } from 'react';
import './farm-services.css'; // New CSS file for improved styling
// import farmHeroImage from './images/farm-hero.jpg'; // Add your hero image
// import farmFormImage from './images/farm-side-image.jpg'; // Add your side image

const services = [
  {
    id: 1,
    title: 'Tent & Accessories',
    icon: '⛺',
    description: 'High-quality tents and camping accessories for your outdoor experience'
  },
  {
    id: 2,
    title: 'Food Catering',
    icon: '🍽️',
    description: 'Professional catering services with diverse menu options'
  },
  {
    id: 3,
    title: 'Decoration',
    icon: '🎨',
    description: 'Creative and elegant decoration services for all occasions'
  },
  {
    id: 4,
    title: 'Chef & Cook',
    icon: '👨‍🍳',
    description: 'Expert chefs offering customized culinary experiences'
  },
  {
    id: 5,
    title: 'Music/Entertainment',
    icon: '🎵',
    description: 'Live music and entertainment options for your event'
  },
  {
    id: 6,
    title: 'Electrical/Lighting',
    icon: '💡',
    description: 'Professional lighting and electrical setup services'
  },
  {
    id: 7,
    title: 'Water Suppliers',
    icon: '💧',
    description: 'Reliable water supply services for your event needs'
  },
  {
    id: 8,
    title: 'Event Management',
    icon: '📋',
    description: 'Comprehensive event planning and management services'
  },
  {
    id: 9,
    title: 'Photography',
    icon: '📸',
    description: 'Professional photography services to capture your moments'
  },
  {
    id: 10,
    title: 'Transport',
    icon: '🚌',
    description: 'Reliable transportation services for your convenience'
  }
];

function FarmServices() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    selectedServices: []
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelection = (serviceTitle) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceTitle)
        ? prev.selectedServices.filter(service => service !== serviceTitle)
        : [...prev.selectedServices, serviceTitle]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        contact: '',
        location: '',
        selectedServices: []
      });
    }, 3000);
  };

  return (
    <div className="services-container">
      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: '../../../assets/mountains-6933693_1280.jpg' }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Premium Farm Services</h1>
            <p className="hero-subtitle">Create unforgettable outdoor experiences with our professional services</p>
            <a href="#services" className="hero-button">Explore Services</a>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div id="services" className="services-section">
        <h2 className="section-title">Our Services</h2>
        <p className="section-description">Choose from our wide range of professional services tailored for your farm event</p>
        
        <div className="services-grid">
          {services.map(service => (
            <div 
              key={service.id} 
              className={`service-card ${formData.selectedServices.includes(service.title) ? 'selected' : ''}`}
              onClick={() => handleServiceSelection(service.title)}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
              <div className="selection-indicator"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Section with Image and Form */}
      <div className="split-section">
        <div className="image-half">
          <img src="https://images.unsplash.com/photo-1609757754057-8a8e17eb73b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGhvdXNlfGVufDB8fDB8fHww" alt="Farm service experience" className="side-image" />
        </div>
        
        <div className="form-half">
          <form className="booking-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Book Your Services Now</h2>
            <p className="form-subtitle">Fill out the form below and we'll contact you shortly</p>
            
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <input
                type="tel"
                name="contact"
                className="form-input"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Enter your contact number"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter your location"
                required
              />
            </div>

            <div className="form-group selected-services">
              <label className="form-label">Selected Services</label>
              <div className="services-chips">
                {formData.selectedServices.length > 0 ? (
                  formData.selectedServices.map(service => (
                    <div key={service} className="service-chip">
                      {service}
                      <span 
                        className="remove-chip" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceSelection(service);
                        }}
                      >×</span>
                    </div>
                  ))
                ) : (
                  <p className="no-services">Click on services above to select them</p>
                )}
              </div>
            </div>

            <button type="submit" className="submit-button">
              Book Now
            </button>

            {showSuccess && (
              <div className="success-message show">
                <div className="success-content">
                  <span className="success-icon">✓</span>
                  <p>Booking submitted successfully! We'll contact you soon.</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmServices;