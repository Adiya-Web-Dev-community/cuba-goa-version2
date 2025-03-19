import { useState, useRef, useEffect } from 'react';
import { Star, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import "./Testimonials.css";

const FarmhouseTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const autoScrollRef = useRef(null);

  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      quote: "A perfect countryside escape! The farm's tranquil atmosphere and warm hospitality made our stay unforgettable.",
      author: "Sarah & James Wilson",
      date: "Summer 2023",
      experience: "Weekend Getaway"
    },
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      quote: "Waking up to roosters and having fresh farm breakfast was magical. Our kids loved feeding the animals!",
      author: "The Thompson Family",
      date: "Spring 2023",
      experience: "Family Vacation"
    },
    {
      image: "https://images.unsplash.com/photo-1598346762291-aee88549193f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
      rating: 5,
      quote: "The organic farming workshop was enlightening. We learned so much about sustainable living.",
      author: "Michael & Emma Davis",
      date: "Fall 2023",
      experience: "Farm Workshop"
    },
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      quote: "Waking up to roosters and having fresh farm breakfast was magical. Our kids loved feeding the animals!",
      author: "The Thompson Family",
      date: "Spring 2023",
      experience: "Family Vacation"
    },
    {
      image: "https://images.unsplash.com/photo-1598346762291-aee88549193f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
      rating: 5,
      quote: "The organic farming workshop was enlightening. We learned so much about sustainable living.",
      author: "karim & Emma Davis",
      date: "Fall 2023",
      experience: "Farm Workshop"
    },
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      rating: 5,
      quote: "Waking up to roosters and having fresh farm breakfast was magical. Our kids loved feeding the animals!",
      author: "The suraj Family",
      date: "Spring 2023",
      experience: "Family Vacation"
    },
    {
      image: "https://images.unsplash.com/photo-1598346762291-aee88549193f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
      rating: 5,
      quote: "The organic farming workshop was enlightening. We learned so much about sustainable living.",
      author: "sumit & Emma Davis",
      date: "Fall 2023",
      experience: "Farm Workshop"
    },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup auto-scrolling
  useEffect(() => {
    if (autoScrollEnabled) {
      autoScrollRef.current = setInterval(() => {
        handleNext();
      }, 5000); // Auto-scroll every 5 seconds
    }
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [autoScrollEnabled, currentIndex]);

  // Pause auto-scroll when user interacts
  useEffect(() => {
    if (isDragging && autoScrollEnabled) {
      clearInterval(autoScrollRef.current);
    } else if (!isDragging && autoScrollEnabled) {
      // Resume auto-scroll after interaction
      autoScrollRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isDragging, autoScrollEnabled]);

  const maxIndex = testimonials.length - 1; // Now we scroll one by one

  // Mouse drag handling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    // Determine direction and scroll one card at a time
    if (walk > 50) {
      handlePrev();
      setIsDragging(false);
    } else if (walk < -50) {
      handleNext();
      setIsDragging(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex(prev => {
      const next = prev + 1;
      if (next > maxIndex) {
        return 0; // Loop back to start
      }
      return next;
    });
  };

  const handlePrev = () => {
    setCurrentIndex(prev => {
      const next = prev - 1;
      if (next < 0) {
        return maxIndex; // Loop back to end
      }
      return next;
    });
  };

  // Handle mouse wheel scrolling
  const handleWheel = (e) => {
    e.preventDefault();
    // Scroll one by one
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Toggle auto-scroll
  const toggleAutoScroll = () => {
    setAutoScrollEnabled(prev => !prev);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <div className="monthly-tag">
          Farms Guest <span className="line"></span>
        </div>
        <h2 className="title">Guest Experiences</h2>
        <p className="description">Discover What Our Visitors Say</p>
      </div>

      <div className="navigation-controls">
        {/* <button 
          className="nav-button" 
          onClick={toggleAutoScroll}
          title={autoScrollEnabled ? "Pause auto-scroll" : "Resume auto-scroll"}
        >
        </button> */}
        <button 
          className="nav-button" 
          onClick={handlePrev}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="nav-button" 
          onClick={handleNext}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div 
        className="testimonials-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <div 
          className="testimonials-track"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            transition: "transform 0.5s ease"
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card"
              style={{ 
                flex: `0 0 ${100 / cardsToShow}%`,
                opacity: index === currentIndex ? 1 : 0.7,
                transform: index === currentIndex ? 'scale(1.02)' : 'scale(1)',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              <div className="testimonial-image">
                <img 
                  src={testimonial.image} 
                  alt={`Review by ${testimonial.author}`} 
                />
              </div>

              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18}
                    fill="#ffd700"
                    stroke="#ffd700"
                  />
                ))}
              </div>

              <div className="quote-content">
                {testimonial.quote}
              </div>

              <div className="author-info">
                <div className="author-details">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.experience}</p>
                </div>
                <div className="date-info">
                  <Calendar size={14} />
                  <span>{testimonial.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FarmhouseTestimonials;