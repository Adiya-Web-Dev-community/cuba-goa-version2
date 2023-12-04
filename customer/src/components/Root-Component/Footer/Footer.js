import React from 'react'
import './Footer.css'
import { Icon } from 'react-icons-kit'
import { mail2 } from 'react-icons-kit/icomoon/mail2'
import { location2 } from 'react-icons-kit/icomoon/location2'
import { phone } from 'react-icons-kit/icomoon/phone'
import { compass } from 'react-icons-kit/icomoon/compass'

import logo from '../../../assets/logocubagoa.png'
import instagram from '../../../assets/instagram.png'
import facebook from '../../../assets/facebook.png'
import { useNavigate } from 'react-router'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <div><Icon icon={location2} size={30}></Icon></div>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>Center of Palolem Beach, Palolem Beach, Canacona, Goa - 403702</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <div><Icon icon={phone} size={30}></Icon></div>
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>(976) 444-2775 / 78</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <div><Icon icon={mail2} size={30}></Icon></div>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>info@cubagoa.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <img src={logo} className="img-fluid" alt="logo" />
                </div>

                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <section style={{ display: 'flex' }}>
                    <div>
                      <a href="https://www.instagram.com/cubagoa/?hl=en">
                        <img src={instagram} className="img-fluid" alt="logo" /></a>
                    </div>
                    <div>
                      <a href="https://www.facebook.com/cubagoa/">
                        <img src={facebook} className="img-fluid" alt="logo" /></a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul className='footer-ul'>
                  <li onClick={() => { navigate('/') }}>Home</li>
                  <li onClick={() => { navigate('/our-properties') }}>Properties</li>
                  <li onClick={() => { navigate('/spa') }}>spa</li>
                  <li onClick={() => { navigate('/events') }}>Events</li>
                  <li onClick={() => { navigate('/gallery') }}>Gallery</li>
                  <li onClick={() => { navigate('/aboutus') }}>About us</li>
                  <li onClick={() => { navigate('/contactus') }}>Contact Us</li>
                  <li onClick={() => { navigate('/terms-conditions') }}>Term & Conditions</li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <Icon icon={compass} size={25} ></Icon>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer