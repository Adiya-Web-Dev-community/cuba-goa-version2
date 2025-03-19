import React, { useState } from 'react';
import { Camera, X, Heart, Star, Calendar, User, Tag, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import './BentoGuestPage.css';
import Footer from '../Footer/Footer';

const EnhancedBentoGuestPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Emily Parker",
      date: "2025-02-23",
      image: "https://images.unsplash.com/photo-1600252016254-f3edb5f3ae95?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
      comment: "The perfect weekend getaway! Waking up to roosters and fresh country air was exactly what we needed.",
      featured: true,
      category: "Family Stay",
      likes: 124,
      photos: [],
      liked: false
    },
    {
      id: 2,
      name: "James Wilson",
      date: "2025-02-22",
      image: "https://images.unsplash.com/photo-1558030929-66237a030c98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
      comment: "Such a peaceful escape from city life. The kids loved feeding the chickens!",
      featured: false,
      category: "Weekend Retreat",
      likes: 89,
      photos: [],
      liked: false
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      date: "2025-02-21",
      image: "https://images.unsplash.com/photo-1558030929-66237a030c98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
      comment: "A magical farm experience! The sunset views from the porch were breathtaking.",
      featured: true,
      category: "Romantic Getaway",
      likes: 156,
      photos: [],
      liked: false
    },
    {
      id: 4,
      name: "Alex Thompson",
      date: "2025-02-20",
      image: "https://images.unsplash.com/photo-1558030929-66237a030c98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhcm0lMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D",
      comment: "Learned so much about sustainable farming. An educational and fun experience!",
      featured: false,
      category: "Educational Visit",
      likes: 92,
      photos: [],
      liked: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 3) {
      alert('You can only upload up to 3 photos');
      return;
    }

    const imagePreviews = files.map(file => URL.createObjectURL(file));
    setSelectedImages(imagePreviews.slice(0, 3));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
    
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      date: currentDate,
      image: selectedImages[0] || "/placeholder-image.jpg",
      comment: formData.comment,
      featured: false,
      category: formData.category,
      likes: 0,
      photos: selectedImages,
      liked: false
    };
    
    setReviews([newReview, ...reviews]);
    setShowForm(false);
    setSelectedImages([]);
    setFormData({
      name: '',
      category: '',
      comment: ''
    });
  };

  // New function to handle like button clicks
  const handleLikeClick = (id) => {
    setReviews(reviews.map(review => {
      if (review.id === id) {
        const newLikedState = !review.liked;
        const newLikes = newLikedState ? review.likes + 1 : review.likes - 1;
        
        // Show toast notification when a review is favorited
        if (newLikedState) {
          toast.success(`You favorited ${review.name}'s review!`);
        }
        
        return {
          ...review,
          liked: newLikedState,
          likes: newLikes
        };
      }
      return review;
    }));
  };

  return (
    <div className="farmstay">
      <div className="farmstay-main">
        {/* Modern Hero Section */}
        <section className="farmstay-hero">
          <div className="farmstay-hero-overlay"></div>
          <div className="farmstay-hero-content">
            <h1 className="farmstay-hero-title">Experience Farm Life</h1>
            <p className="farmstay-hero-subtitle">
            We would love to hear from you
            </p>
            <button 
              className="farmstay-cta-button"
              onClick={() => setShowForm(true)}
            >
              Share Your Story
            </button>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="farmstay-reviews">
          <div className="farmstay-section-header">
            <h2 className="farmstay-section-title">Guest Experiences</h2>
            <div className="farmstay-divider"></div>
          </div>
          
          <div className="farmstay-grid">
            {reviews.map((review) => (
              <article 
                key={review.id} 
                className={`farmstay-card ${review.featured ? 'farmstay-card-featured' : ''}`}
              >
                <div className="farmstay-card-image">
                  <img src={review.image} alt={`${review.name}'s farm experience`} className="farmstay-img" />
                  <span className="farmstay-category">
                    <Tag size={14} className="farmstay-category-icon" />
                    {review.category}
                  </span>
                </div>
                <div className="farmstay-card-body">
                  <div className="farmstay-card-meta">
                    <div className="farmstay-guest-info">
                      <h3 className="farmstay-guest-name">{review.name}</h3>
                      <div className="farmstay-date-wrapper">
                        <Calendar size={14} className="farmstay-date-icon" />
                        <time className="farmstay-date">{review.date}</time>
                      </div>
                    </div>
                    <button 
                      className="farmstay-like-button"
                      onClick={() => handleLikeClick(review.id)}
                    >
                      <Heart 
                        size={16} 
                        className={`farmstay-heart-icon ${review.liked ? 'farmstay-heart-active' : ''}`}
                        fill={review.liked ? "#ff4d4d" : "none"}
                        stroke={review.liked ? "#ff4d4d" : "currentColor"}
                      />
                      <span>{review.likes}</span>
                    </button>
                  </div>
                  
                  <div className="farmstay-card-content">
                    <p className="farmstay-comment">{review.comment}</p>
                  </div>
                  
                  {/* Display additional photos if available */}
                  {review.photos && review.photos.length > 1 && (
                    <div className="farmstay-additional-photos">
                      {review.photos.slice(1).map((photo, index) => (
                        <div key={index} className="farmstay-photo-wrapper">
                          <img 
                            src={photo} 
                            alt={`Additional photo ${index + 1}`}
                            className="farmstay-additional-photo"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Modal Form */}
        {showForm && (
          <div className="farmstay-modal-backdrop" onClick={() => setShowForm(false)}>
            <div className="farmstay-modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="farmstay-modal-close"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
              <h2 className="farmstay-modal-title">Share Your Story</h2>
              <div className="farmstay-modal-subtitle">Tell us about your farm stay experience</div>
              
              <form className="farmstay-form" onSubmit={handleSubmit}>
                <div className="farmstay-form-field">
                  <label className="farmstay-label">
                    <User size={16} className="farmstay-input-icon" />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name" 
                      className="farmstay-input"
                      required 
                    />
                  </label>
                </div>
                
                <div className="farmstay-form-field">
                  <label className="farmstay-label">
                    <Tag size={16} className="farmstay-input-icon" />
                    <select 
                      className="farmstay-select" 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Experience Type</option>
                      <option>Family Holiday</option>
                      <option>Friends Hangout</option>
                      <option>Celebration</option>
                      <option>Corporate Gathering</option>
                      <option>Weekend Retreat</option>
                      <option>Work from Farm</option>
                    </select>
                  </label>
                </div>

                <div className="farmstay-form-field">
                  <textarea 
                    placeholder="Share your memorable moments..." 
                    className="farmstay-textarea"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="4"
                    required 
                  />
                </div>

                <div className="farmstay-form-field">
                  <div className="farmstay-upload">
                    <Camera size={28} className="farmstay-upload-icon" />
                    <p className="farmstay-upload-text">
                      {selectedImages.length === 0 
                        ? "Add up to 3 photos from your farm stay" 
                        : `${selectedImages.length} photo${selectedImages.length > 1 ? 's' : ''} selected`}
                    </p>
                    <input 
                      type="file" 
                      className="farmstay-file-input" 
                      accept="image/*" 
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Preview selected images */}
                {selectedImages.length > 0 && (
                  <div className="farmstay-image-preview-container">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="farmstay-image-preview">
                        <img src={image} alt={`Preview ${index + 1}`} className="farmstay-preview-img" />
                        <button 
                          type="button" 
                          className="farmstay-remove-image"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button type="submit" className="farmstay-submit">
                  <Send size={16} className="farmstay-submit-icon" />
                  Share Your Story
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default EnhancedBentoGuestPage;