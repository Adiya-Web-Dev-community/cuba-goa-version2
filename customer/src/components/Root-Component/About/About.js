import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import axios from "../../../helpers/axios";
import "./About.css";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaCamera, FaPalette, FaMusic, FaHotel, FaCouch, FaUserTie, FaPhotoVideo } from "react-icons/fa";
function About() {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/spa"); // Navigate to the About page
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);


  const serviceIcons = {
    "Food Catering": <FaUtensils size={30} />,
    "Event Photography": <FaCamera  size={30} />,
    "Decorations": <FaPalette size={30} />,
    "Music/Entertainment": <FaMusic  size={30}/>,
    "Decoration": <FaHotel size={30}/>,
    "Tent/Accessories": <FaCouch  size={30}/>,
    "Chef/Cook": <FaUserTie  size={30}/>,
    "Photography": <FaPhotoVideo size={30}/>
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("/about-us");
      if (res.data.data && res.data.data.length > 0) {
        setAboutUsData(res.data.data[0]);
        setError(null);
      } else {
        setError("No data available");
      }
    } catch (err) {
      setError("Failed to load content");
      console.error("Error fetching about data:", err);
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={fetchData}>
          Try Again
        </button>
      </div>
    );
  }

  if (!aboutUsData) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="about-page">
      <div className="hero-banner">
        <div className="hero-image">
          {aboutUsData.bannerImgUrl && (
            <img
              src={aboutUsData.bannerImgUrl}
              alt="About Us"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.background =
                  "linear-gradient(45deg, #2193b0, #6dd5ed)";
              }}
            />
          )}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {aboutUsData.heading1 || "Welcome to"}
            <span className="hero-subtitle">Mayi Farms</span>
          </h1>
          <p className="hero-description">{aboutUsData.description}</p>
        </div>
      </div>

      <section className="experience-section">
        {aboutUsData.farmhouse_stays && (
          <div className="experience-item">
            <div className="experience-image">
              <img
                src={aboutUsData.farmhouse_stays.imageUrl}
                alt="Farmhouse Stays"
              />
            </div>
            <div className="experience-content">
              <h3>{aboutUsData.farmhouse_stays.title}</h3>
              <p>{aboutUsData.farmhouse_stays.content}</p>
            </div>
          </div>
        )}

        {aboutUsData.farmhouse_events && (
          <div className="experience-item reversed">
            <div className="experience-image">
              <img src={aboutUsData.farmhouse_events.imageUrl} alt="Events" />
            </div>
            <div className="experience-content">
              <h3>{aboutUsData.farmhouse_events.title}</h3>
              <p>{aboutUsData.farmhouse_events.content}</p>
            </div>
          </div>
        )}

        {aboutUsData.corporate_gatherings && (
          <div className="experience-item">
            <div className="experience-image">
              <img
                src={aboutUsData.corporate_gatherings.imageUrl}
                alt="Corporate Gatherings"
              />
            </div>
            <div className="experience-content">
              <h3>{aboutUsData.corporate_gatherings.title}</h3>
              <p>{aboutUsData.corporate_gatherings.content}</p>
            </div>
          </div>
        )}
      </section>

      {/* Rest of the component remains the same */}

      <section className="features-section">
  <h2 className="features-title">Our Offerings</h2>
  <div className="features-container">
    {aboutUsData.farmhouse_events?.services?.map((service, index) => (
      <div key={index} className="feature-item flex items-center gap-2">
        <span className="feature-icon text-2xl">
          {serviceIcons[service] } {/* Default icon if not found */}
        </span>
        <p className="feature-text">{service}</p>
      </div>
    ))}
  </div>
</section>

      <div className=" cta-section">
        {aboutUsData.amenities && (
          <section className="">
            <div className="cta-content">
              <h2>{aboutUsData.amenities.content}</h2>
            </div>
          </section>
        )}

        {aboutUsData.cta && (
          <section className="">
            <div className="cta-content">
              <h2>{aboutUsData.cta.title}</h2>
              <button className="cta-button" onClick={handleClick}>
                Explore Now
              </button>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default About;
