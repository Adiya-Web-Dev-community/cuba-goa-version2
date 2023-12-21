import "./OurProperties.css";
import React, { useState, useEffect } from "react";
import PropertyList from "./PropertyList";
import axios from "../../../helpers/axios";
import Pagination from "./Pagination";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PropertiesForm from "./PropertiesForm";
import Header from "../../Header/Header";
import PreLoader from "../../Preloader-Component/Preloader-Component";

const Footer = React.lazy(() => import("../Footer/Footer"));

const OurProperties = () => {
  const [allProperties, setAllProperties] = useState("");
  const [showRoomForm, setRoomForm] = useState(false);

  const token = localStorage.getItem("user");

  const getPropertiesData = async () => {
    await axios(`/hotelbook`)
      .then((res) => {
        // console.log(res.data)
        setAllProperties(res.data);
        //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("allProperties =>", allProperties);
  useEffect(() => {
    getPropertiesData();
  }, [allProperties.length]);

  //delete property functionality =>
  function deleteProperty(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-delete-alert">
            <h1>Delete Resort ?</h1>
            <p>Are you sure you want to delete the selected Resort?</p>
            <div>
              <button onClick={onClose}>Cancel</button>
              <button
                onClick={() => {
                  axios
                    .delete(`/hotelbook/${id}`, {
                      headers: {
                        authorization: token.authorization,
                      },
                    })
                    .then((resp) => {
                      console.log(resp);
                      getPropertiesData().catch((err) => {
                        console.log(err);
                      });
                    });
                  onClose();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      },
    });
  }

  if (!allProperties) {
    return <PreLoader />;
  }

  return (
    <>
      <Header />
      <main className="our-properties-main">
        <div className="quba-goa-search">
          <div className="banner">
            <h2>The Cuba Goa Properties</h2>
            <h6 style={{ margin: "20px 0" }}>
              BEACH HUTS, BUNGALOWS & RESORTS
            </h6>
          </div>
          <div className="properties-to-book">
            {/* filter section do at veyr last */}
          </div>
          <div className="add-on-btn" style={{ marginBottom: "50px" }}>
            <PropertiesForm getPropertiesData={getPropertiesData} />
          </div>
          <div className="our-property-card-container">
            <section>
              <PropertyList
                allProperties={allProperties}
                getPropertiesData={getPropertiesData}
                deleteProperty={deleteProperty}
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OurProperties;
