import "./OurProperties.css";
import React, { useState, useEffect } from "react";
import axios from "../../../helpers/axios";
import PropertyCard from "./Property-Card/PropertyCard";
import OurPropertyBannerVideo from "./Our-Properties-Video/Our-Properties-Video";
import Footer from "../Footer/Footer";
import ChatOpeningButton from "../Chat/ChatOpeningButton";

const OurProperties = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  const [allProperties, setAllProperties] = useState("");
  // const [showRoomForm, setRoomForm] = useState(false)
  const [searchResortName, setSearchResortName] = useState("");

  const getPropertiesData = async () => {
    await axios
      .get(`/hotelbook`)

      .then((res) => {
        // console.log('property list', res.data)
        setAllProperties(res.data);
        //    setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("allProperties =>", allProperties)
  useEffect(() => {
    getPropertiesData();
    // eslint-disable-next-line
  }, []);

  if (!allProperties) {
    return (
      <p style={{ textAlign: "center", marginTop: "10rem" }}>LOADING...</p>
    );
  }

  return (
    <>
      <main className="our-properties-main">
        <div className="quba-goa-search">
          <OurPropertyBannerVideo />
          <div className="properties-to-book">
            <input
              type="text"
              placeholder="Search"
              name="searchResortName"
              value={searchResortName}
              onChange={(e) =>
                setSearchResortName(e.target.value.toLowerCase())
              }
              style={{ width: "90%", paddingLeft: "1rem" }}
            />
          </div>
          {/* {searchResortName} */}
          <div className="property-card-wrapper">
            {
              // eslint-disable-next-line
              allProperties
                .filter((property) => {
                  if (searchResortName === "") {
                    return property;
                  } else {
                    if (
                      property.resortName
                        .toLowerCase()
                        .includes(searchResortName)
                    ) {
                      return property;
                    }
                  }
                })
                .map((property) => {
                  return <PropertyCard property={property} />;
                })
            }
          </div>
        </div>
      </main>
      <ChatOpeningButton />
      <Footer />
    </>
  );
};

export default OurProperties;
