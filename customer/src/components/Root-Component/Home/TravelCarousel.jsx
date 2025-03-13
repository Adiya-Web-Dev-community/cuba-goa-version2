import React, { useState, useRef, useEffect } from "react";
import "./TravelCarousel.css";

const TravelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beachImageIndex, setBeachImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const beachImages = [
    "https://images.unsplash.com/photo-1562312902-76fc8c1e0e55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1685133855379-711aa008f7ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1592212671488-700bb9a101e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1597834777623-acd73456aca1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
  ];

  const destinations = [
    {
      id: 1,
      type: "map",
      title: "See true location",
      image: "https://images.unsplash.com/photo-1629268948721-2c72a09fdb92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      type: "weather",
      temperature: "32°",
      condition: "Sunny",
      backgroundColor: "#29b6d1",
    },
    {
      id: 3,
      type: "rating",
      rating: "4,8 k",
      title: "The World's Most Enchanting Dive Destinations",
      avatars: [
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
      ],
    },
    {
      id: 4,
      type: "beach",
      title: "The Most Breathtaking Beaches of Papua Island",
      images: beachImages,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newIsTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
      updateCardWidth();
    };

    const updateCardWidth = () => {
      if (carouselRef.current && !isMobile) {
        // Calculate card width based on the visible cards
        const containerWidth = carouselRef.current.parentElement.clientWidth;
        const visibleCards = getVisibleCards();
        setCardWidth(containerWidth / visibleCards);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial calculation
    
    // Add touch events for mobile/tablet
    if (carouselRef.current) {
      carouselRef.current.addEventListener("touchstart", handleTouchStart, { passive: false });
      carouselRef.current.addEventListener("touchmove", handleTouchMove, { passive: false });
      carouselRef.current.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("touchstart", handleTouchStart);
        carouselRef.current.removeEventListener("touchmove", handleTouchMove);
        carouselRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [isMobile, isTablet]);

  const getVisibleCards = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  // Mouse Events
  const handleMouseDown = (e) => {
    if (!carouselRef.current || isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    // Change cursor style
    carouselRef.current.style.cursor = "grabbing";
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !carouselRef.current || isMobile) return;
    
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    setIsDragging(false);
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
      
      // Calculate which card is most visible and snap to it
      if (cardWidth > 0) {
        const scrollPosition = carouselRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / cardWidth);
        snapToCard(newIndex);
      }
    }
  };

  // Touch Events
  const handleTouchStart = (e) => {
    if (!carouselRef.current || isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !carouselRef.current || isMobile) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (isMobile) return;
    setIsDragging(false);
    
    // Snap to closest card
    if (carouselRef.current && cardWidth > 0) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      snapToCard(newIndex);
    }
    
    e.preventDefault();
  };

  // Wheel scrolling with smooth behavior
  const handleWheel = (e) => {
    if (!carouselRef.current || isMobile) return;
    
    e.preventDefault();
    
    // Set direction and speed based on deltaY
    const scrollAmount = e.deltaY * 0.5; // Adjust sensitivity
    
    // Apply smooth scrolling
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    // Clear any existing timeout
    if (window.scrollTimeout) {
      clearTimeout(window.scrollTimeout);
    }
    
    // Set timeout to snap to closest card after scrolling stops
    window.scrollTimeout = setTimeout(() => {
      if (cardWidth > 0) {
        const scrollPosition = carouselRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / cardWidth);
        snapToCard(newIndex);
      }
    }, 150);
  };

  // Function to snap to a specific card
  const snapToCard = (index) => {
    if (!carouselRef.current || isMobile) return;
    
    // Ensure index is within bounds
    const maxIndex = destinations.length - getVisibleCards();
    const safeIndex = Math.max(0, Math.min(index, maxIndex));
    
    // Update current index
    setCurrentIndex(safeIndex);
    
    // Smooth scroll to the card
    carouselRef.current.scrollTo({
      left: safeIndex * cardWidth,
      behavior: 'smooth'
    });
  };

  const nextBeachImage = (e) => {
    e.stopPropagation();
    setBeachImageIndex((prev) =>
      prev === beachImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevBeachImage = (e) => {
    e.stopPropagation();
    setBeachImageIndex((prev) =>
      prev === 0 ? beachImages.length - 1 : prev - 1
    );
  };

  // Render destination cards based on whether we're on mobile or not
  const renderDestinationCards = () => {
    if (isMobile) {
      // For mobile, render cards in column layout
      return (
        <div className="mobile-cards-container">
          {destinations.map((item) => (
            <div
              key={item.id}
              className={`mobile-card ${
                item.type === "map" || item.type === "beach"
                  ? "mobile-large-card"
                  : "mobile-small-card"
              }`}
            >
              {renderCardContent(item)}
            </div>
          ))}
        </div>
      );
    } else {
      // For desktop/tablet, render horizontal carousel
      return (
        <div className="carousel-container">
          <div 
            className="carousel-viewport" 
            onWheel={handleWheel}
          >
            <div
              ref={carouselRef}
              className="carousel-wrapper"
              style={{
                display: 'flex',
                cursor: 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {destinations.map((item) => (
                <div
                  key={item.id}
                  className={`card ${
                    item.type === "map" || item.type === "beach"
                      ? "large-card"
                      : "small-card"
                  }`}
                  style={{
                    flex: `0 0 ${100 / getVisibleCards()}%`,
                    minWidth: `${100 / getVisibleCards()}%`,
                    userSelect: 'none' // Prevent text selection during drag
                  }}
                >
                  {renderCardContent(item)}
                </div>
              ))}
            </div>
          </div>
          
          <div className="carousel-indicators">
            {Array.from({ length: destinations.length - getVisibleCards() + 1 }).map((_, idx) => (
              <button 
                key={idx} 
                className={`indicator ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => snapToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      );
    }
  };

  // Helper function to render the content of each card
  const renderCardContent = (item) => {
    if (item.type === "beach") {
      return (
        <div className="beach-card">
          <img
            src={beachImages[beachImageIndex]}
            alt="Beach view"
            className="card-image"
            draggable="false" // Prevent image dragging
          />
          <div className="card-overlay">
            <div className="card-title">{item.title}</div>
          </div>
          <div className="beach-navigation">
            <button
              className="beach-nav-button prev"
              onClick={prevBeachImage}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="beach-nav-button next"
              onClick={nextBeachImage}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      );
    } else if (item.type === "map") {
      return (
        <div className="map-card">
          <img 
            src={item.image} 
            alt="Map view" 
            className="card-image" 
            draggable="false"
          />
          <button className="expand-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
          <div className="card-overlay">
            <div className="card-title">{item.title}</div>
          </div>
        </div>
      );
    } else if (item.type === "weather") {
      return (
        <div
          className="weather-card"
          style={{ backgroundColor: item.backgroundColor }}
        >
          <button className="expand-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
          <div className="temperature">{item.temperature}</div>
          <div className="weather-condition">{item.condition}</div>
        </div>
      );
    } else {
      return (
        <div className="rating-card">
          <div className="avatars">
            {item.avatars.map((avatar, idx) => (
              <img
                key={idx}
                className="avatar"
                src={avatar}
                alt={`User ${idx + 1}`}
                draggable="false"
              />
            ))}
          </div>
          <div className="star-icon">⭐</div>
          <div className="rating">{item.rating}</div>
          <div className="rating-title">{item.title}</div>
        </div>
      );
    }
  };

  return (
    <div className="travel-container">
      <div className="headers">
        <div className="monthly-tag">
          Explore Monthly <span className="line"></span>
        </div>
        <h1 className="title">
          We Recommend
          <br />
          farm house Every Month
        </h1>
        <p className="description">
          Embark on the adventure of a lifetime, where every step you take
          unveils a new story, and every farm house leaves a lasting impression.
        </p>
      </div>

      {renderDestinationCards()}
    </div>
  );
};

export default TravelCarousel;