import React, { useState, useEffect } from 'react'
import './Home.css'
import Video from '../../video/Video'
// import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
// import { Image } from 'react-bootstrap'
// import axios from '../../../helpers/axios';

// import HomeList from '../home-list/HomeList';
// import Pagination from '../home-list/Pagination';
// import resortImage from '../../../assets/CUBA_PATNEM_BEACH_BUNGALOWS.jpg'
import axios from '../../../helpers/axios'
import { useNavigate } from 'react-router-dom'
import arrow from '../../../assets/arrow.png'
import { location2 } from 'react-icons-kit/icomoon/location2'
import { Icon } from 'react-icons-kit'
import { cross } from 'react-icons-kit/icomoon/cross'
import Footer from '../Footer/Footer'
import { Box, Button, Typography, Modal } from '@mui/material'
import cubaIcon from '../../../assets/logocubagoa.png'
import { toast } from 'react-hot-toast';

const Home = () => {

  const style = {
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid dakblue',
    boxShadow: 1000,
    borderRadius: '1rem'
  };

  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [])


  //SHOW ROOMS
  const viewRooms = (id, resortname) => {
    navigate(`/${resortname}/${id}/rooms`)
    console.log(resortname, id)
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => { setOpen(false) };

  const [allProperties, setAllProperties] = useState([])
  const getPropertiesData = async () => {
    await axios.get(`/hotelbook`)
      .then((res) => {
        // console.log(res.data)
        setAllProperties(res.data)
        //  setSelectedVal([res.data[0].resortName, res.data[0]._id])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log("allProperties =>", allProperties)
  useEffect(() => {
    handleOpen()
    getPropertiesData()
  }, [])

  const [email, setEmail] = useState('')
  const handleCouponSubmit = async () => {
    console.log(email)
    navigate('/')
    handleClose();
    toast.success("You're are eligible for discounts and offers")
  }

  if (!allProperties) {
    return (
      <h1>.</h1>
    )
  }


  return (
    <div className='home-wrap'>
      <Video />
      {/* <div style={{ marginTop: '1rem' }} className=''>
        <h2 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2.5rem' }}>FEATURED PROPERTIES</h2>
        <HomeList currentList={currentList} />
        <Pagination totalPosts={allProperties.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div> */}
      <div className='home-content'  >
        <div className='content-wrapper' data-aos='zoom-in' data-aos-delay='80'>
          <h6>
            Discover CUBA GOA, a prestigious collection of independent luxury hotels in the alluring area of Goa, India. Discover a world of unrivalled luxury and hospitality. Check out our beautiful properties right away!
          </h6>
          <div className='inner-wrapper'  >
            <p   >
              Experience the ideal getaway in Cuba Goa, where your family can take pleasure in sand beaches, sports courts, and playgrounds. This resort is the ideal city vacation because it offers stunning views and a variety of outdoor excursions that can be rented. Expect to find all the comforts you want while travelling, together with breathtaking scenery. We provide a break from the ordinary with extravagant hospitality offerings.
            </p>
            <p >
              A treasure trove of leisure can be found in the sun-kissed beaches and stunning scenery. Hotels in Cuba Goa is an unmatched haven for both leisure and business, creating the ideal getaway for families and productive conclaves. A broad international and local cuisine awaits, nestled in the embrace of nature. These delicious foods go nicely with our exotic drinks, adding to South Goa's serene vibe as an oasis of elegant beauty
            </p>
          </div>

        </div>
      </div>

      <div className='' >
        <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Featured Properties</h2>
        <div style={{ border: '0.2px solid lightgrey', width: '30%', margin: 'auto' }}></div>
        <div className='container1' >
          {allProperties.filter((resort) => {
            if (resort.type === 'resort') {
              return resort
            }
          }).map((property, index) => {
            return (
              <div className='card' key={index + 1} data-aos={(index % 2 === 0) ? ('flip-left') : ('flip-right')} data-aos-delay="35" >
                <div className='img-wrap1'>
                  <img src={property.resortImgURL} alt='resortImg'></img>
                </div>
                <div className='content'>
                  <h3 >{property.resortName}</h3>
                  <p>
                    {property.resortDescription}
                  </p>
                  <div className='button-wrap' style={{ cursor: 'pointer' }}
                    onClick={() => viewRooms(property._id, property.resortName)}>
                    <p style={{ color: 'red' }}>view room </p>
                    <div
                      style={{ cursor: 'pointer' }}>
                      <img src={arrow} alt='' /></div>
                  </div>
                </div>

                <div className='img-wrap2'>
                  <img src={property.resortImgURL} alt='resortImg'></img>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <div className='property-locations'>
        <div className='location-header'>
          <div style={{ display: 'none' }}><Icon icon={location2} size={30} style={{ color: 'orange' }}></Icon></div>
          <h3 style={{}}>Cuba Goa Property Locations</h3>
        </div>
        <div className='dummy-border' ></div>

        <div className='location-addresses'>
          {allProperties.slice(0, 5).map((resort, i) => {
            return (
              <section className='address-section' key={i + 1}>
                <h6>{resort.resortName}</h6>
                <div></div>
                <p>{resort.resortAddress}</p>
              </section>
            )

          })}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='modalbox'  >
          <Icon icon={cross} size={15} style={
            {
              marginTop: '0',
              position: 'absolute',
              top: '2%',
              left: '90%',
              color: 'black',
              cursor: 'pointer'
            }}
            onClick={handleClose} />
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderRadius: '10px' }}>
            <p>
              <img src={cubaIcon} style={{ width: '150px', height: '70px' }} alt='' />
            </p>
            <h4>Welcome Back!</h4>
            <p >As a token of our appreciation, enjoy a 20% discount on your next purchase!</p>
            <p >Use code: REPEAT20</p>
            <p >If you are repeat customer enter your email id</p>
            <input type='email' placeholder='Enter Email' style={{ width: '80%' }}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button onClick={handleCouponSubmit}>SUBMIT</button>
          </div>
        </Box>
      </Modal>

       <button className="button__loader">
            <span className="button__text">
                Become a member
            </span>
        </button>
      <Footer />
    </div>
  )
}

export default Home