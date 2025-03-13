import "./Gallery.css";
import React, { useEffect, useState } from "react";
import axios from "../../../helpers/axios";
import Images from "./Images";
import Footer from "../Footer/Footer";
import ChatOpeningButton from "../Chat/ChatOpeningButton";

const PremiumGallery = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('resorts');
  const [resortName, setResortName] = useState("");
  const [getData, setGetData] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const propertyCategories = [
    { 
      id: 'resorts', 
      name: 'Luxury Resorts',
      priceRange: '300-1000',
      features: ['24/7 Room Service', 'Spa Access', 'Fine Dining']
    },
    
    { 
      id: 'farmhouses', 
      name: 'Premium Farm Houses',
      priceRange: '200-500',
      features: ['Private Garden', 'Organic Farm', 'Countryside Views']
    },
    { 
      id: 'villas', 
      name: 'Private Villas',
      priceRange: '400-1500',
      features: ['Private Pool', 'Personal Chef', 'Exclusive Location']
    }
  ];

  const getPropertiesData = async () => {
    try {
      const res = await axios.get(`/hotelbook`);
      // Assuming the API response doesn't include category, we'll add it here
      const propertiesWithCategories = res.data.map(property => ({
        ...property,
        category: assignPropertyCategory(property)
      }));
      setAllProperties(propertiesWithCategories);
      setFilteredProperties(propertiesWithCategories.filter(p => p.category === 'resorts'));
      setGetData(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to assign category based on property characteristics
  const assignPropertyCategory = (property) => {
    // This is an example logic - adjust based on your actual property data
    if (property.amenities?.includes('farm') || property.resortName.toLowerCase().includes('farm')) {
      return 'farmhouses';
    } else if (property.amenities?.includes('villa') || property.resortName.toLowerCase().includes('villa')) {
      return 'villas';
    }
    return 'resorts';
  };

  useEffect(() => {
    getPropertiesData();
  }, []);

  useEffect(() => {
    if (getData) {
      const categoryProperties = allProperties.filter(p => p.category === selectedCategory);
      setFilteredProperties(categoryProperties);
      
      if (categoryProperties.length > 0) {
        setResortName(categoryProperties[0]?.resortName);
        setSelectedProperty(categoryProperties[0]?.resortName);
        const arr = [];
        for (let i = 0; i < categoryProperties[0].rooms.length; i++) {
          for (let j = 0; j < categoryProperties[0].rooms[i].imgUrl.length; j++) {
            arr.push(categoryProperties[0]?.rooms[i].imgUrl[j]);
          }
        }
        setImages(arr);
      } else {
        setResortName("");
        setSelectedProperty(null);
        setImages([]);
      }
    }
  }, [selectedCategory, getData]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedProperty(null);
  };

  const handleGetImages = async (id, name) => {
    try {
      const response = await axios.post(`/images/${id}`);
      if (response.data.success) {
        setSelectedProperty(name);
        setResortName(response.data.resort[0]?.resortName);
        const arr = [];
        for (let i = 0; i < response.data.resort[0]?.rooms.length; i++) {
          for (let j = 0; j < response.data.resort[0]?.rooms[i].imgUrl.length; j++) {
            arr.push(response.data.resort[0]?.rooms[i].imgUrl[j]);
          }
        }
        setImages(arr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'unset';
  };

  const getCategoryInfo = (categoryId) => {
    return propertyCategories.find(cat => cat.id === categoryId);
  };

  return (
    <div>
    <div className="premium-gallery">
    <div className="hero-section" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1738249034651-1896f689be58?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
  <h1>Premium Properties</h1>
  <p>Discover Extraordinary Stays for Discerning Travelers</p>
</div>

      <div className="category-tabs">
        {propertyCategories.map(category => (
          <button
            key={category.id}
            className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="category-info">
        <div className="category-details">
          <h2>{getCategoryInfo(selectedCategory)?.name}</h2>
          <p>Price Range: ${getCategoryInfo(selectedCategory)?.priceRange} per night</p>
          <div className="category-features">
            {getCategoryInfo(selectedCategory)?.features.map((feature, index) => (
              <span key={index}>{feature}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="property-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property, index) => (
            <div 
              key={index} 
              className={`property-card ${selectedProperty === property.resortName ? 'selected' : ''}`}
              onClick={() => handleGetImages(property._id, property.resortName)}
            >
              <div className="property-image">
                <img src={property.rooms[0]?.imgUrl[0]} alt={property.resortName} />
                <div className="property-price">
                  From ${property.rooms[0]?.price}/night
                </div>
              </div>
              <div className="property-info">
                <h3>{property.resortName}</h3>
                <div className="property-features">
                  <span>• {property.rooms.length} Room Types</span>
                  {getCategoryInfo(property.category)?.features.slice(0, 2).map((feature, index) => (
                    <span key={index}>• {feature}</span>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-properties">
            <h3>No properties available in this category</h3>
            <p>Please check back later or explore other categories</p>
          </div>
        )}
      </div>

      {selectedProperty && (
        <div className="selected-property-showcase">
          <h2>{resortName}</h2>
          <div className="showcase-slider">
            <Images images={images} interval={1300} />
          </div>
          
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div 
                key={i} 
                className="gallery-item"
                onClick={() => openModal(img)}
              >
                <img src={img} alt={`Property view ${i + 1}`} />
                <div className="hover-overlay">
                  <span>View Full Size</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={modalImage} alt="Full view" />
          </div>
        </div>
      )}

      

    </div>
    <ChatOpeningButton />
    <Footer />
   
    </div>
  );
};

export default PremiumGallery;