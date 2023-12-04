import React, { useState, useEffect } from "react";
import "./Spa.css";
import axios from "../../../helpers/axios";
import arrow from '../../../assets/arrow.png'
import { useNavigate } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { location2 } from 'react-icons-kit/icomoon/location2'
import spaimage from '../../../assets/spa-bg-2.png'
import Footer from "../Footer/Footer";

const Spa = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [])
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  const getSpaList = async () => {
    try {
      const response = await axios.get("/allSpaList");
      if (response.data.success) {
        console.log(response.data.data);
        setData(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSpaList();
  }, []);



  if (!data) {
    return (
      <p style={{ textAlign: 'center', marginTop: '25rem' }}>Loading...</p>
    )
  }

  return (
    <>
      <main class="spa-parent">
        <section className="entry-point-spa" style={{ padding: '0' }}>

          <div className="spa-main-cont">
            {/* <div className="firts-content-spa">
              <h2>SPA</h2>
            </div>
            <h4 >AYURVEDIC SPA TREATMENTS IN GOA</h4> */}
            <img src={spaimage} alt='spaimage' />
          </div>


          <div style={{ marginTop: '2rem' }}>
            <h5 style={{ textAlign: 'center' }} className='spatitleheading'>
              Greetings from the World of Rejuvenation. At Kalpaka Spa, put yourself in the capable hands of our Kerala-trained massage therapists.
            </h5>
          </div>

        </section>


        <div className='card-wrapper'>
          {data.map((spa, index) => {
            return (
              <div className='card' key={index + 1} data-aos={(index % 2 === 0) ? ('flip-left') : ('flip-right')} data-aos-delay="10" >
                <div className='img-wrap1'>
                  <img src={spa.imgUrl} alt='resortImg'></img>
                </div>
                <div className='content'>
                  <h3 style={{}}>{spa.name}</h3>
                  <p>
                    {spa.details}
                  </p>
                  <p>
                    {spa.benefits}
                  </p>
                  <div className='button-wrap' style={{ cursor: 'pointer' }}>
                    <p style={{ color: 'darkblue' }}
                      onClick={() => { navigate(`/spa-details/${spa._id}`) }}
                    >Book Session</p>
                    <div
                      style={{ cursor: 'pointer' }}>
                      <img src={arrow} alt='' /></div>
                  </div>
                </div>

                <div className='img-wrap2'>
                  <img src={spa.imgUrl} alt='resortImg'></img>
                </div>
              </div>
            )
          })}
        </div>
      </main>


      {/*
import { Icon } from 'react-icons-kit' 
import { location2 } from 'react-icons-kit/icomoon/location2'
 */}
      <div className='property-locations'>
        <div className='location-header'>
          <div><Icon icon={location2} size={30} style={{ color: 'orange' }}></Icon></div>
          <h3 style={{}}>Cuba Goa Property Locations</h3>
        </div>
        <div className='dummy-border' ></div>

        <div className='location-addresses'>
          <section className='address-section'>
            <h6>CUBA BEACH BUNGALOWS</h6>
            <div></div>
            <p>Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>CUBA PATNEM BEACH BUNGALOWS</h6>
            <div></div>
            <p>North side of Patnem Beach, Palolem-Patnem Road, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>CUBA PREMIUM HUTS</h6>
            <div></div>
            <p>Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>PALOLEM BEACH RESORT</h6>
            <div></div>
            <p>Entrance of Palolem Beach, Besides car parking area, Palolem Beach, Canacona, Goa - 403702</p>
          </section>
          <section className='address-section'>
            <h6>CUBA AGONDA</h6>
            <div></div>
            <p>Tambli Val, Agonda Beach Road, Agonda, Canacona, Goa - 403702</p>
          </section>
        </div>
      </div>


      <Footer />
    </>



  );
};

export default Spa;
