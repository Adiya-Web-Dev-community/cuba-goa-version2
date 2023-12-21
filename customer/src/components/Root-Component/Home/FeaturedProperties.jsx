import React from "react";
import "./FeaturedProperties.css";
import { SiCodereview } from "react-icons/si";

const FeaturedProperties = ({
  ref,
  properties,
  loading,
  settingLoading,
  viewRooms,
  arrow,
  //   imgRefs,
}) => {
  // console.log(loading);
  return (
    <>
      {properties
        .filter((resort) => {
          // console.log(resort);
          if (resort.type === "resort") {
            return resort;
          }
        })
        .map((property, index) => {
          // console.log(property.resortImgURL);
          return (
            <div
              className="card"
              key={index + 1}
              // ref={ref}
              // data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}
              // data-aos-delay="35"
            >
              <div className="img-wrap1">
                <div
                  className="imagetag"
                  style={{
                    background: `url(${property.resortImgURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                {/* <img
                  // className={`${loading === index ? "loaded" : "loading"}`}
                  // data-src={property.resortImgURL}
                  src={property.resortImgURL}
                  onLoad={() => settingLoading(index)}
                  alt="resortImg"
                  data-index={index}
                /> */}
              </div>
              <div className="content">
                <h3 className="property_name">{property.resortName}</h3>
                <p className="property_des">{property.resortDescription}</p>
                <div
                  className="button-wrap"
                  style={{ cursor: "pointer" }}
                  onClick={() => viewRooms(property._id, property.resortName)}
                >
                  <p className="icon_content" style={{ color: "red" }}>
                    view room
                  </p>

                  <SiCodereview className="icon_room" />
                </div>
              </div>

              {/* <div className="img-wrap2">
                <img src={property.resortImgURL} alt="resortImg"></img>
              </div> */}
            </div>
          );
        })}
    </>
  );
};

export default FeaturedProperties;
