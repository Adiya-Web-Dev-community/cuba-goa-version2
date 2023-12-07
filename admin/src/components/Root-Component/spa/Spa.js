import React, { useState, useEffect } from "react";
import "./Spa.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../helpers/axios";
import SpaCard from "./SpaCard";
import { Row } from "react-bootstrap";
import massageImg from '../../../assets/Massage.jpg'
import { CButton } from "@coreui/react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Spa = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token')
  const getSpaList = async () => {
    try {
      // const response = await axios.get("http://localhost:4001/allSpaList");
      const response = await axios.get("/allSpaList");
      if (response.data.success) {
        // console.log(response.data.data);
        setData(response.data.data);
        // console.log(data)
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //delete spa funnction =>
  function deleteSpa(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='confirm-delete-alert'>
            <h1>Delete Spa ?</h1>
            <p>Are you sure you want to delete the selected Spa?</p>
            <div>
              <button onClick={onClose}>Cancel</button>
              <button
                onClick={() => {
                  axios.delete(`/delete/spa/${id}`, {
                    headers: {
                      authorization: token
                    }
                  })
                    .then((resp) => {
                      console.log(resp)
                      getSpaList()
                        .catch((err) => {
                          console.log(err)
                        })
                    })
                  onClose();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      }
    });
  }

  useEffect(() => {
    getSpaList();
  }, []);

  return (
    <>
      <main className="main-spa">
        <main class="spa-parent">
          <section className="entry-point-spa">

            <div className="spa-main-cont">
              <div className="firts-content-spa">
                <h2>SPA</h2>
              </div>
              <h4>AYURVEDIC SPA TREATMENTS IN GOA</h4>
              <h4>“Kalpaka Spa”</h4>

              <h5>
                Welcome to a World of Rejuvenation. At Kalpaka Spa– Find Yourself
                In The Hands Of Our Expert Masseurs – All The Way From Kerala.
              </h5>
            </div>

            <div className="spa-quots">
              <div className="spa-quots-content">
                <h6>CALM THOSE NERVES, AWAY FROM SUBURBS . . .</h6>
                <p>
                  Calm Those Nerves, Away From Suburbs . . . Fatigued, tired, and
                  stressed out? We have something just for you that would provide
                  a perfect escape from the hustle and bustle of the city life. A
                  full body massage with natural oils that permeate the body and
                  relieve those tense muscles, allowing you to get rid of
                  lassitude and filling you with vigour. The vitamin E in the oils
                  will bring back the shine to your skin and help your body to
                  loosen up. Choose from below:
                </p>
              </div>
              <div className="spa-quots-img">
                <img
                  alt="Agonda Beach Resort"
                  src={massageImg}
                />
              </div>
            </div>
          </section>
          <div className="spa-button-container">
            <CButton

              onClick={() => {
                navigate("/addSpa");
              }}
            >
              ADD ON
            </CButton>
          </div>

          <section className="spa-cards">
            {data.map((card, index) => {
              return <SpaCard card={card} deleteSpa={deleteSpa} getSpaList={getSpaList} />;
            })}
          </section>

          <section>
            <div className="spa-footer">
              <p className="normal-text-spa">
                For more details,
                <a className="cta" href="/pages/beach-huts-bungalows-resorts">
                  Get in Touch With Cuba Goa Today!
                </a>
              </p>
            </div>
          </section>
        </main>
      </main>
    </>
  );
};

export default Spa;
