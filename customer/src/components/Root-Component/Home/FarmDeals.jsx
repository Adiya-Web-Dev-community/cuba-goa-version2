import React from 'react';
import { Star } from 'lucide-react';
import './FarmDeals.css'
const FarmDeals = () => {
  const farmListings = [
    {
      id: 1,
      name: "Green Valley Farm House",
      location: "Lonavala, Maharashtra",
      price: {
        original: 15000,
        discounted: 12990
      },
      nights: "2 nights",
      rating: 4.8,
      reviews: 1205,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww"
    },
    {
      id: 2,
      name: "Hilltop Paradise Farm",
      location: "Mahabaleshwar, Maharashtra",
      price: {
        original: 18000,
        discounted: 15390
      },
      nights: "2 nights",
      rating: 4.9,
      reviews: 1105,
      image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      name: "Riverside Farm Retreat",
      location: "Karjat, Maharashtra",
      price: {
        original: 12000,
        discounted: 9990
      },
      nights: "2 nights",
      rating: 4.7,
      reviews: 985,
      image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdXNlfGVufDB8fDB8fHww"
    }
  ];

  return (
    <div className="deals-container">
      <div className="deals-header">
        <span className="weekend-label">Weekend Offers</span>
        <h1 className="deals-title">Farm House Deals For The Weekend</h1>
        <p className="deals-description">
          Don't miss out on these limited-time offers for peaceful farm stays. 
          Experience rustic charm with modern comfort at special weekend prices.
          Save on stays for 09 August - 11 August
        </p>
      </div>

      <div className="farm-listings">
        {farmListings.map((farm) => (
          <div key={farm.id} className="farm-card">
            <div className="farm-image">
              <img src={farm.image} alt={farm.name} />
            </div>
            <div className="farm-details">
              <div className="price-section">
                <span className="original-price">₹{farm.price.original}</span>
                <span className="discounted-price">₹{farm.price.discounted}</span>
                <span className="stay-duration">{farm.nights}</span>
              </div>
              <h3 className="farm-name">{farm.name}</h3>
              <p className="farm-location">{farm.location}</p>
              <div className="rating-section">
                <Star size={16} className="star-icon" />
                <span className="rating">{farm.rating}</span>
                <span className="reviews">({farm.reviews} Reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmDeals;