// import React, { useState, useEffect } from "react";
// import "./Spa.css";
// import axios from "../../../helpers/axios";
// import arrow from "../../../assets/arrow.png";
// import { useNavigate } from "react-router-dom";
// import { Icon } from "react-icons-kit";
// import { location2 } from "react-icons-kit/icomoon/location2";
// import spaimage from "../../../assets/alpine-hut-3225908_1280.jpg";
// import Footer from "../Footer/Footer";
// import ChatOpeningButton from "../Chat/ChatOpeningButton";

// const Spa = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//     // eslint-disable-next-line
//   }, []);
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   const getSpaList = async () => {
//     try {
//       const response = await axios.get("/allSpaList");
//       if (response.data.success) {
//         console.log(response.data.data);
//         setData(response.data.data);
//       } else {
//         console.log(response.data.message);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getSpaList();
//   }, []);

//   if (!data) {
//     return (
//       <p style={{ textAlign: "center", marginTop: "25rem" }}>Loading...</p>
//     );
//   }

//   return (
//     <>
//       <main class="spa-parent">
//         <section className="entry-point-spa" style={{ padding: "0" }}>
//           <div className="spa-main-cont">
//             {/* <div className="firts-content-spa">
//               <h2>SPA</h2>
//             </div>
//             <h4 >AYURVEDIC SPA TREATMENTS IN GOA</h4> */}
//             <img src={spaimage} alt="spaimage" />
//           </div>

//           <div style={{ marginTop: "2rem" }}>
//             <h5 style={{ textAlign: "center" }} className="spatitleheading">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, architecto!
//             </h5>
//           </div>
//         </section>

//         <div className="card-wrapper">
//           {data.map((spa, index) => {
//             return (
//               <div
//                 className="card"
//                 key={index + 1}
//                 data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}
//                 data-aos-delay="10"
//               >
//                 <div className="img-wrap1">
//                   <img
//                     src={spa.imgUrl}
//                     alt="resortImg"
//                     className="img_wrap_spa_five"
//                   ></img>
//                 </div>
//                 <div className="content">
//                   <h3 style={{}}>{spa.name}</h3>
//                   <p>{spa.details}</p>
//                   <p>{spa.benefits}</p>
//                   <div className="button-wrap" style={{ cursor: "pointer" }}>
//                     <p
//                       style={{ color: "darkblue" }}
//                       onClick={() => {
//                         navigate(`/spa-details/${spa._id}`);
//                       }}
//                     >
//                       Book Session
//                     </p>
//                     <div style={{ cursor: "pointer" }}>
//                       <img src={arrow} alt="" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="img-wrap2">
//                   <img
//                     src={spa.imgUrl}
//                     alt="resortImg"
//                     className="img_wrap_spa_five"
//                   ></img>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       {/*
// import { Icon } from 'react-icons-kit' 
// import { location2 } from 'react-icons-kit/icomoon/location2'
//  */}
//       <div className="property-locations">
//         <div className="location-header">
//           <div>
//             <Icon icon={location2} size={30} style={{ color: "orange" }}></Icon>
//           </div>
//           <h3 style={{}}>Maya Farms Property Locations</h3>
//         </div>
//         <div className="dummy-border"></div>

//         <div className="location-addresses">
//           <section className="address-section">
//             <h6>Maya Farms BUNGALOWS</h6>
//             <div></div>
//             <p>
//               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae, eligendi?

//             </p>
//           </section>
//           <section className="address-section">
//             <h6>CUBA PATNEM BEACH BUNGALOWS</h6>
//             <div></div>
//             <p>
//               North side of Patnem Beach, Palolem-Patnem Road, Canacona, Goa -
//               403702
//             </p>
//           </section>
//           <section className="address-section">
//             <h6>Maya Farms PREMIUM HUTS</h6>
//             <div></div>
//             <p>
//              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam ratione ab ipsa quos rerum doloribus eligendi deserunt! Enim doloribus, quis nulla error reiciendis sed nemo atque necessitatibus, iste voluptates sequi!
//             </p>
//           </section>
//           <section className="address-section">
//             <h6>PALOLEM Farms RESORT</h6>
//              <div></div>
//             <p>
//              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione dolores nemo debitis? Necessitatibus, esse eius?
//             </p>
//           </section>
//           <section className="address-section">
//             <h6>Maya Farms </h6>
//             <div></div>
//             <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, provident.</p>
//           </section>
//         </div>
//       </div>
//       <ChatOpeningButton />
//       <Footer />
//     </>
//   );
// };

// export default Spa;



// SpaListing.js
import React, { useState, useEffect } from "react";
import { Icon } from "react-icons-kit";
import { location2 } from "react-icons-kit/icomoon/location2";
import axios from "../../../helpers/axios";
import { heart } from "react-icons-kit/feather/heart";
import { useNavigate } from "react-router-dom";
import ChatOpeningButton from "../Chat/ChatOpeningButton";
import Footer from "../Footer/Footer";
import "./SpaListing.css";

const SpaListing = () => {
  const [data, setData] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getSpaList();
  }, []);

  const getSpaList = async () => {
    try {
      const response = await axios.get("/allSpaList");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDotClick = (spaId, index) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [spaId]: index
    }));
  };

  if (!data.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
   <div>
     <div className="spa-container">
      <h1 className="spa-title">Farm Houses</h1>
      
      <div className="spa-grid">
        {data.map((spa, index) => (
          <div key={spa._id} className="spa-card">
            <div className="image-containers">
              <img src={spa.imgUrl} alt={spa.name} className="spa-image" />
              
              <button className="favorite-button">
                <Icon icon={heart} size={20} />
              </button>
              
              <div className="navigation-dots">
                {[...Array(5)].map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    className={`dot ${(activeImageIndex[spa._id] || 0) === dotIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(spa._id, dotIndex)}
                  />
                ))}
              </div>
            </div>

            <div className="spa-content">
              <div className="spa-header">
                <div className="spa-info">
                  <h3 className="spa-name">{spa.name}</h3>
                  <div className="location">
                    <Icon icon={location2} size={16} />
                    <span>755 KM</span>
                  </div>
                </div>
                <div className="rating">
                  <span>★</span>
                  <span>4.9</span>
                </div>
              </div>
              
              <p className="spa-description">{spa.details}</p>
              
              <div className="spa-price">
                <span className="amount">₹16000{spa.price}</span>
                <span className="period">/ session</span>
              </div>
            </div>

            <button
              className="card-overlays"
              onClick={() => navigate(`/spa-details/${spa._id}`)}
            />
          </div>
        ))}
      </div>

      <div className="locations-section">
        <div className="locations-header">
          <Icon icon={location2} size={24} className="location-icon" />
          <h2>Maya Farms Property Locations</h2>
        </div>

        <div className="locations-grid">
          {[
            "Maya Farms BUNGALOWS",
            "CUBA PATNEM BEACH BUNGALOWS",
            "Maya Farms PREMIUM HUTS",
            "PALOLEM Farms RESORT",
            "Maya Farms"
          ].map((location, index) => (
            <div key={index} className="location-card">
              <h3>{location}</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, eligendi?</p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
    <ChatOpeningButton />
      <Footer />
   </div>
  );
};

export default SpaListing;