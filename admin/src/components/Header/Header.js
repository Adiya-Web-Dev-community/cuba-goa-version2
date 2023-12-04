import React, { useEffect } from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import {AiOutlineMenu} from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate,useLocation} from 'react-router-dom';
import { CButton } from '@coreui/react';



const Header = () => {
  const navigate = useNavigate()
  const [hidenew,setNavBar] = useState(true)
  let token = localStorage.getItem('token')

//   useEffect(()=>{
//      if(user?.username && location1!=='/'){
//           return 
//      } 

//     if(user?.username  ){
//       navigate('/')
//       return
//     }
// navigate('/landing-page')
//   },[])

function LogOut(){
localStorage.removeItem('token')
navigate('/landing-page')
}


  return (
    <>
   {/* <Navigate to={'/login2'} replace={true}></Navigate> */}

    <header className='main-header'>
       <div className='header-manue'>
        <button onClick={()=>setNavBar((val)=>!val)}>
          <AiOutlineMenu/>
        </button>
       </div>
        <nav className={hidenew?'main-nav deactive-nav':'main-nav'}>
            <NavLink to='/'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>HOME</span></NavLink>
            <NavLink to='/bookings' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>BOOKINGS</span></NavLink>
            {/* <NavLink to='/our-clients'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>CLIENTS</span></NavLink> */}
            {/* <NavLink to='/resorts' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>RESORTS</span></NavLink> */}
            <NavLink to='/our-properties'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>OUR PROPERTIES </span></NavLink>
            {/* <NavLink to='/forSale'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>FOR SALE</span></NavLink> */}
            <NavLink  to='/spa' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>SPA</span></NavLink>
            <NavLink to='/about' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>ABOUT</span></NavLink>
            <NavLink to='/contact-us' className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>CONTACT US</span></NavLink>
            {/* <NavLink to='/contact-us'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>CONTACT US</span></NavLink>
            <NavLink to='/gallery'  className={({ isActive }) => (isActive ? 'main-nav-active' : '')}><span>GALLERY</span></NavLink> */}
        
        <div className='logout-btn-cont'>
          <CButton variant='outline' onClick={LogOut}  color='info' >Log Out</CButton>
        </div>   
        </nav>  
      
    </header>
    <Outlet/>
    </>
  )
}

export default Header
