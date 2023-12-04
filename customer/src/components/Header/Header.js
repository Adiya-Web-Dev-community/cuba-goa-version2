import React, { useEffect, useState } from 'react';
import './Header.css';
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa';
import { Icon } from 'react-icons-kit';
import { cross } from 'react-icons-kit/icomoon/cross';
import cubaGoaLogo from '../../assets/logocubagoa.png'
import axios from '../../helpers/axios'
import { toast } from 'react-hot-toast'

const Header = ({ auth, setAuth }) => {
  const navigate = useNavigate()
  const [allProperties, setAllProperties] = useState();


  let restaurants = ['cuba pure veg', 'bebinca']
  let thingstodo = [
    { activity: 'north goa', pagelink: '/north-goa' },
    { activity: 'south goa', pagelink: '/south-goa' },
    { activity: 'activity', pagelink: '/activity' },
  ]

  const getPropertiesData = async () => {
    await axios.get(`/hotelbook`)
      .then((res) => {
        // console.log('property list => ', res.data)
        setAllProperties(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getPropertiesData();
  }, [])

  const token = localStorage.getItem('token')
  useEffect(() => {
    setAuth(token);
    //eslint-disable-next-line
  }, [token])




  /*  handling responsive navbar */
  const [showNavbar, setShowNavbar] = useState('none')
  // eslint-disable-next-line
  const [navbarHidden, setNavbarHidden] = useState(true)
  //funtion to show or hide navbar on clicking menu icon
  const handleOpenNavbar = () => {
    setShowNavbar('block');
    setNavbarHidden(false)
  }
  const handleCloseNavbar = () => {
    setShowNavbar('none');
    setNavbarHidden(false)
  }
  /*   handling responsive navbar ends */


  //SHOW ROOMS
  const viewRooms = (id, resortname) => {
    console.log(id, resortname)
    navigate(`/${resortname}/${id}/rooms`)
    handleCloseNavbar();
    console.log(resortname, id)
  }

  if (!allProperties) {
    return (
      <h6>.</h6>
    )
  }

  return (
    <div className='app-bar' style={{ backgroundColor: '#033F91 ' }}>

      {/* desktop view navbar */}
      <div className='desktop-section'>
        <section className='appbar-col-1'>
          <div className='r-image'>
            <img src={cubaGoaLogo} alt='cuba-goa-logo' onClick={() => { navigate('/') }} />
          </div>
        </section>
        <section className='appbar-col-2'>
          <Box className='col-2-box'>
            <Button className='btn-item' style={{ fontFamily: 'sans-serif' }} onClick={() => navigate('/')}>Home</Button>
            <Button className='btn-item' style={{ fontFamily: 'sans-serif' }} onClick={() => navigate('/aboutus')}>About Us</Button>
            <div className="dropdown"  >
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style={{
                  color: 'white', fontSize: '.65rem',
                  fontFamily: "sans-serif"
                }}>
                OUR HOTELS
              </button>
              <div className="dropdown-menu" style={{ width: '10rem' }}>
                {allProperties.filter((resort) => {
                  if (resort.type === 'resort') {
                    return resort
                  }
                }).map((property, index) => {
                  return (
                    <div >
                      <p onClick={() => viewRooms(property._id, property.resortName)}
                      >
                        {property.resortName}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <Button className='btn-item' style={{ fontFamily: 'sans-serif' }} onClick={() => navigate('/destination-wedding')}>DESTINATION WEDDINGS</Button>
            <Button className='btn-item' style={{ fontFamily: 'sans-serif' }} onClick={() => navigate('/events')}>CELEBRATE WITH US</Button>

            <div className="dropdown"  >
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style={{
                  color: 'white', fontSize: '.65rem',
                  fontFamily: "sans-serif"
                }}>
                OUR RESTAURANTS
              </button>
              <div className="dropdown-menu" style={{ width: '10rem' }}>
                {allProperties.filter((restaurant) => {
                  if (restaurant.type === 'restaurant') {
                    return restaurant
                  }
                }).map((property, index) => {
                  return (
                    <div >
                      <p onClick={() => viewRooms(property._id, property.resortName)}
                      >
                        {property.resortName}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* things to do */}
            <div className="dropdown"  >
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                style={{
                  color: 'white', fontSize: '.65rem',
                  fontFamily: "sans-serif"
                }}>
                THINGS TO DO
              </button>
              <div className="dropdown-menu" style={{ width: '10rem' }}>
                {thingstodo.map((activity, index) => {
                  return (
                    <div key={index + 1}>
                      <p
                        onClick={() => {
                          navigate(`${activity.pagelink}`)
                        }}>
                        {activity.activity}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <Button className='btn-item' style={{ fontFamily: 'sans-serif' }} onClick={() => navigate('/spa')}>SPA</Button>
            <Button className='btn-item' style={{ fontFamily: 'sans-serif' }} onClick={() => navigate('/gallery')}>GALLERY</Button>
            <Button className='btn-item' style={{ fontFamily: 'sans-serif' }} onClick={() => navigate('/contactus')}>Contact Us</Button>
            {/* <Button className='btn-item' onClick={handleonclickmybookings}>MY BOOKINGS</Button> */}
            {/* instead of my bookings menu dropdown for other options */}
            <div className="dropdown dropdownmenus"  >
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                MENU
              </button>
              <div className="dropdown-menu" >
                {auth ? (
                  <div>
                    <p onClick={() => {
                      localStorage.clear('token');
                      navigate('/');
                      toast.success('Logged out successfully')
                    }}>Logout</p>
                  </div>
                ) : (
                  <div>
                    <p onClick={() => { navigate('/signin') }}>Login</p>
                  </div>
                )}
                {auth ? (
                  <div onClick={() => { navigate('/my-bookings') }}>
                    <p>my bookings</p>
                  </div>) : (null)}
              </div>
            </div>
            {/* ends */}
          </Box>

          <div className='menu' style={{ width: '100%', marginLeft: '10%' }}
            onClick={handleOpenNavbar}><FaAlignJustify style={{ color: 'white' }} /></div>

        </section>
      </div>


      {/* mobile view navbar */}
      <div className='right-side-navbar' style={{ display: showNavbar }}>
        <Box className='col-2-box' style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Icon className='close-cross-icon' icon={cross} size={15} style={{ float: 'left', paddingLeft: '1rem', marginTop: '1rem', color: 'lightblue' }}
              onClick={handleCloseNavbar} />
          </div>
          <Button className='btn-item' onClick={() => { navigate('/'); handleCloseNavbar(); }}>Home</Button>
          <Button className='btn-item' onClick={() => { navigate('/aboutus'); handleCloseNavbar(); }}>About Us</Button>
          <div className="dropdown"  >
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              OUR HOTELS
            </button>
            <div className="dropdown-menu" style={{ width: '10rem' }}>
              {allProperties.filter((resort) => {
                if (resort.type === 'resort') {
                  return resort
                }
              }).map((property, index) => {
                return (
                  <div >
                    <p onClick={() => { viewRooms(property._id, property.resortName); }}>
                      {property.resortName}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <Button className='btn-item' onClick={() => { navigate('/destination-wedding'); handleCloseNavbar(); }}>DESTINATION WEDDINGS</Button>
          <Button className='btn-item' onClick={() => { navigate('/events'); handleCloseNavbar(); }}>CELEBRATE WITH US</Button>
          <div className="dropdown"  >
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              OUR RESTAURANTS
            </button>
            <div className="dropdown-menu" style={{ width: '10rem' }}>
              {allProperties.filter((restaurant) => {
                if (restaurant.type === 'restaurant') {
                  return restaurant
                }
              }).map((property, index) => {
                return (
                  <div >
                    <p onClick={() => { viewRooms(property._id, property.resortName); }}>
                      {property.resortName}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          {/* things to do */}
          <div className="dropdown"  >
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              THINGS TO DO
            </button>
            <div className="dropdown-menu" style={{ width: '10rem' }}>
              {thingstodo.map((activity, index) => {
                return (
                  <div >
                    <p

                      onClick={() => { navigate(`${activity.pagelink}`); handleCloseNavbar(); }}>
                      {activity.activity}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <Button className='btn-item' onClick={() => { navigate('/spa'); handleCloseNavbar(); }}>SPA</Button>
          <Button className='btn-item' onClick={() => { navigate('/gallery'); handleCloseNavbar(); }}>GALLERY</Button>
          <Button className='btn-item' onClick={() => { navigate('/contactus'); handleCloseNavbar(); }}>Contact Us</Button>
          {/* instead of my bookings menu dropdown for other options */}
          <div className="dropdown dropdownmenus"  >
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              MENU
            </button>
            <div className="dropdown-menu" >
              {auth ? (
                <div>
                  <p onClick={() => {
                    localStorage.clear('token');
                    handleCloseNavbar();
                    navigate('/');
                    toast.success('Logged out successfully')

                  }}>Logout</p>
                </div>
              ) : (
                <div>
                  <p onClick={() => { navigate('/signin'); handleCloseNavbar(); }}>Login</p>
                </div>
              )}
              {auth ? (
                <div onClick={() => { navigate('/my-bookings'); handleCloseNavbar(); }}>
                  <p>my bookings</p>
                </div>) : (null)}
            </div>
          </div>
          {/* ends */}
        </Box>
      </div>

      {/* mobile view navbar ends */}




    </div >
  )
}

export default Header