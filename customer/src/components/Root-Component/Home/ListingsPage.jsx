import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  
  MapPin,
  Star,

} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ListingsPage.css";
import { BookingModal } from './../BookingPreview/BookingModal';

const ListingsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();
  const listings = [
    {
      id: 1,
      title: "Modern Beachfront Villa",
      location: "Anjuna Beach, Goa",
      price: "₹15,000/24 Hrs",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      rating: 4.9,
      features: ["4 Beds", "Pool"],
      description:
        "Luxurious beachfront villa with modern amenities and stunning ocean views. Perfect for family vacations and group stays.",
    },
    {
      id: 2,
      title: "Luxury Pool House",
      location: "Calangute, Goa",
      price: "₹12,000/24 Hrs",
      image:
        "https://plus.unsplash.com/premium_photo-1676968002945-c8f74e0e27d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      rating: 4.8,
      features: ["3 Beds", "Garden"],
      description:
        "Beautiful pool house surrounded by lush gardens. Private and peaceful setting with all modern comforts.",
    },
    {
      id: 3,
      title: "Heritage Portuguese Villa",
      location: "Fontainhas, Goa",
      price: "₹18,000/24 Hrs",
      image:
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      rating: 4.95,
      features: ["5 Beds", "Heritage"],
      description:
        "Historic Portuguese villa in the heart of Fontainhas. Experience authentic Goan heritage with modern luxury.",
    },
    {
      id: 4,
      title: "Seaside Cottage",
      location: "Vagator, Goa",
      price: "₹10,000/24 Hrs",
      image:
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      rating: 4.7,
      features: ["2 Beds", "Beach"],
      description:
        "Cozy beachside cottage with direct access to Vagator Beach. Perfect for couples and small families.",
    },
    {
      id: 5,
      title: "Mountain Retreat",
      location: "Panjim, Goa",
      price: "₹14,000/24 Hrs",
      image:
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      rating: 4.85,
      features: ["3 Beds", "Mountain View"],
      description:
        "Peaceful mountain retreat with panoramic views. Ideal for those seeking tranquility and natural beauty.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleCards = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleNavigation = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const visibleCards = getVisibleCards();
    const lastIndex = listings.length - visibleCards;

    if (direction === "next") {
      setCurrentIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev <= 0 ? lastIndex : prev - 1));
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleBookNow = (listing) => {
    setSelectedListing(listing);
    setShowModal(true);
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      sliderRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="listings-container">
      <div className="headers">
        <div className="monthly-tag">
          Farms Listing <span className="line"></span>
        </div>
        <h1 className="title">
          Discover
          <br />
          The Best Farms Around
        </h1>
        <p className="description">
          Explore a variety of farms offering unique experiences, fresh produce,
          and breathtaking landscapes. Find the perfect farm for your next Stay
          visit.
        </p>
      </div>

      <div className="navigation-controls">
        <div className="nav-buttons-horizontal">
          <button
            onClick={() => handleNavigation("prev")}
            className="nav-buttons"
            disabled={isAnimating || currentIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => handleNavigation("next")}
            className="nav-buttons"
            disabled={isAnimating || currentIndex === listings.length - getVisibleCards()}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        className="slider-outer" 
        onWheel={handleWheel}
      >
        <div
          ref={sliderRef}
          className="slider-container"
          style={{
            transform: `translateX(-${currentIndex * (100 / getVisibleCards())}%)`,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {listings.map((listing) => (
            <div 
              key={listing.id} 
              className="listing-card"
              style={{
                flex: `0 0 ${100 / getVisibleCards()}%`
              }}
            >
              <div className="listing-image">
                <img src={listing.image} alt={listing.title} />
                <div className="listing-badge">
                  <Star className="star-icon" size={16} /> {listing.rating}
                </div>
              </div>

              <div className="listing-content">
                <div className="listing-header">
                  <div className="listing-info">
                    <h2>{listing.title}</h2>
                    <p className="location">
                      <MapPin size={16} className="location-icon" />
                      {listing.location}
                    </p>
                  </div>
                  <p className="price">{listing.price}</p>
                </div>

                <div className="features-container">
                  {listing.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <button
                  className="btn-grad"
                  onClick={() => navigate(`/spa-details/spa._id`)}
                >
                 View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedListing && (
        <BookingModal
          listing={selectedListing}
          onClose={() => setShowModal(false)}
          onSubmit={(formData) => {
            console.log('Booking Details:', formData);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ListingsPage;