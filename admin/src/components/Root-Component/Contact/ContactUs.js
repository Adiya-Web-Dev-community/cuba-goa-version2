import axios from '../../../helpers/axios'
import './ContactUs.css'
import React, { useState } from 'react'
import ContactUsList from './queryList'
import PreLoader from '../../Preloader-Component/Preloader-Component'
const Footer = React.lazy(() => import('../Footer/Footer'))

const govaBeachLocation = [

    {
        title: 'CUBA BEACH BUNGALOWS',
        address: 'Center of Palolem Beach, Palolem Beach,',
        centercode: 'Canacona, Goa - 403702',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7707.401625336536!2d74.01700904311096!3d15.009304470806802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe4551d05b02bb%3A0x1e1bc67d4b0fbbf5!2sPalolem%20Beach!5e0!3m2!1sen!2sin!4v1680011785814!5m2!1sen!2sin',
    },
    {
        title: 'CUBA PATNEM BEACH BUNGALOWS',
        address: 'North side of Patnem Beach, Palolem-Patnem',
        centercode: 'Road, Canacona, Goa - 403702',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3853.9247708238695!2d74.02999444979095!3d14.996880721212925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPatnem%20Beach%2C%20Road%2C%20Palolem%2C%20Canacona%2C%20Goa%20403702!5e0!3m2!1sen!2sin!4v1680011880087!5m2!1sen!2sin',
    },
    {
        title: 'CUBA PREMIUM HUTS',
        address: 'Center of Palolem Beach, Palolem Beach,',
        centercode: 'Canacona, Goa - 403702',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3853.681999055738!2d74.02107894979115!3d15.010347670877957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCuba%20Beach%20Bunglows%20Palolem%20beach%2C%20Palolem%2C%20Canacona%2C%20Goa%20403702!5e0!3m2!1sen!2sin!4v1680012024098!5m2!1sen!2sin',
    },
    {
        title: 'PALOLEM BEACH RESORT',
        address: 'Entrance of Palolem Beach, Besides car parking',
        centercode: 'area, Palolem Beach, Canacona, Goa - 403702',
        mapUrl: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d30829.449362733354!2d74.00570968797223!3d15.01039362079482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPalolem%20Beach%20Resort%20Palolem%20-%20Patnem%20Beach%20Road%20Patnem%2C%20Palolem%2C%20Canacona%2C%20Goa%20403702!5e0!3m2!1sen!2sin!4v1680012105192!5m2!1sen!2sin",
    },
    {
        title: 'CUBA AGONDA',
        address: 'Tambli Val, Agonda Beach Road, Agonda,',
        centercode: 'Canacona, Goa - 403702',
        phoneNumber: '(703)095-8777',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.23603774019!2d73.99195594979129!3d15.03505517026267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe4f99fabed4bf%3A0xf84f6c3840f81702!2sVal!5e0!3m2!1sen!2sin!4v1680012284137!5m2!1sen!2sin',
    },

]


const ContactUs = () => {
    const [queryList, setQueryList] = useState()
    const token = localStorage.getItem('token')
    const fetchQueries = async () => {
        await axios.get('/contactus', {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                // console.log(res.data)
                setQueryList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useState(() => {
        fetchQueries();
    }, [])

    if (!queryList) {
        return (<PreLoader />)
    }


    return (
        <>
            <div className='contact-us-cont'>
                <ContactUsList queryList={queryList} setQueryList={setQueryList} />
                <div style={{ marginTop: '10rem' }}>
                </div>
            </div>
        </>
    )
}

export default ContactUs
