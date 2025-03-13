import './ContactUs.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../../helpers/axios'
import { Toast, toast } from 'react-hot-toast'

import Footer from '../Footer/Footer'

const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.23603774019!2d73.99195594979129!3d15.03505517026267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe4f99fabed4bf%3A0xf84f6c3840f81702!2sVal!5e0!3m2!1sen!2sin!4v1680012284137!5m2!1sen!2sin'





const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, [])
    const [contactUsForm, setContactUsForm] = useState({ firstName: "",  email: "", contact: "",  message: "" })
    const handleContactUsForm = (params) => (e) => {
        setContactUsForm({ ...contactUsForm, [params]: e.target.value })
    }
    const SubmitContactUsForm = async (e) => {
        e.preventDefault()
        await axios.post('/contactus', contactUsForm)
            .then((res) => {
                console.log(res.data)
                toast.success('your query has been poasted')
                setContactUsForm({ firstName: "", lastName: "", email: "", contact: "", yourOrganization: "", message: "" })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const [allProperties, setAllProperties] = useState([])
    const getPropertiesData = async () => {
        await axios.get(`/hotelbook`)
            // await axios(`http://localhost:4001/hotelbook`)
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
        getPropertiesData()
    }, [])


    return (
        <>
            <main className='main-contact'>

                <section>
                    <h2>Contact Mayi Farms - Perfect Farm Stays</h2>
                    <h5 style={{ marginBottom: '60px' }}></h5>


                    {/* {allProperties.map((el, i) => (
                        <div className='beach-location' key={i + 1}>
                            <div className='beach-location-map'>
                                <iframe src={mapUrl} style={{ height: '100%', width: '100%' }} title='resortMap' ></iframe>
                            </div>
                            <div className='beach-contact'>
                                <h4>{el.resortName}</h4>
                                <p>{el.resortAddress}</p>
                            </div>
                        </div>
                    ))} */}

                    <div className='contact-info'>
                        <form onClick={(e) => e.preventDefault()} className='contact-form'>
                            <div className='inputbox'>
                                <label htmlFor='firstname'>Name</label>
                                <input id='firstname' placeholder='Enter your  name' type='text' onChange={handleContactUsForm('firstName')} value={contactUsForm.firstName} />
                            </div>
                           
                            <div className='inputbox'>
                                <label htmlFor='email'>Email </label>
                                <input id='email' type='email' placeholder='Enter your email' onChange={handleContactUsForm('email')} value={contactUsForm.email} />
                            </div>
                            <div className='inputbox'>
                                <label htmlFor='contact'>Contact</label>
                                <input id='contact' type='number' placeholder='Enter your contact number' onChange={handleContactUsForm('contact')} value={contactUsForm.contact} />
                            </div>
                           
                            <div className='inputbox'>
                                <label htmlFor='message'>Message</label>
                                <textarea id='message' className='Message' placeholder='Enter your message' onChange={handleContactUsForm('message')} value={contactUsForm.message} />
                            </div>
                            <button type='submit' onClick={SubmitContactUsForm}>Submit</button>
                        </form>
                        <div className='contact-info-of'>
                            <p><span>Phone Number:-</span>  954-954-9904</p>
                            <p><span>Email:-</span> hello@mayifarms.com</p>
                            <p><span>Hours Of Operation:-</span> 24/7</p>
                            <p><span>Timings:- </span>9 AM to 7 PM. Everyday</p>

                        </div>
                    </div>

                </section>


            </main>

            <Footer />
        </>
    )
}

export default ContactUs