import React, { useEffect } from 'react'
import './TermsConditions.css'
import Footer from '../Footer/Footer'


const TermsConditions = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
     // eslint-disable-next-line
},[])
  return (
    <>
      <div className="policy-container">
      <header className="policy-header">
        <h1>Need-to-Know Information at Mayi Farms</h1>
        <p className="policy-intro">
          By booking the farmhouse for a stay, weekend getaway, party, or event, 
          you agree to the following terms and conditions:
        </p>
      </header>

      <main className="policy-content">
        <section className="policy-section">
          <h2>Booking and Payments Policy</h2>
          <ul className="policy-list">
            <li>A valid booking is confirmed only upon receipt of a deposit or full payment, 
                as per the booking agreement.</li>
            <li>The remaining balance must be paid in full on or before check-in.</li>
            <li>Payments can be made via Phone-pay, Google pay, Cards or net banking.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Check-in and Check-out Policy</h2>
          <ul className="policy-list">
            <li>Check-in time is from 1:00 PM and check-out time is by 11:00 AM. 
                Early check-in or late check-out may be possible based on availability 
                and subject to additional charges.</li>
            <li>Guests must vacate the premises by the agreed check-out time; 
                failure to do so may incur extra charges.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Cancellations and Refunds Policy</h2>
          <ul className="policy-list">
            <li>Cancellations made more than 10 Days before the booking date will be 
                eligible for a full refund, minus a cancellation / Handling fee of 6%.</li>
            <li>Cancellations within 7 Days will be subject to a cancellation fee of 
                booking amount.</li>
            <li>No refund will be issued for no-shows or early departures.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Guests and Occupancy Policy</h2>
          <ul className="policy-list">
            <li>The maximum number of guests permitted on the property is as disclosed 
                during booking. Exceeding this number may result in additional charges 
                or cancellation of the booking.</li>
            <li>All guests count must be registered at the time of booking. With Local 
                Govt ID of one guest.</li>
            <li>Unregistered guests are not allowed on the premises without prior approval.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Use of Facilities</h2>
          <ul className="policy-list">
            <li>Guests are permitted to use the pool, lawn, and rooms for the intended 
                purpose. Any damage or misuse of facilities will result in additional 
                charges and be adjusted against deposit.</li>
            <li>The pool is accessible during designated hours. Please adhere to pool 
                safety rules and ensure that children are supervised at all times. Pool 
                usage shall be closed during the event hours.</li>
            <li>Guests are expected to respect the peace and privacy of others on the 
                property. Noise levels must be kept to a reasonable level, especially 
                during nighttime.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Parties and Events</h2>
          <ul className="policy-list">
            <li>The farmhouse can be used for private events such as parties or corporate 
                gatherings only with prior approval. Specific event guidelines, including 
                noise restrictions, security, and clean-up requirements, will be provided.</li>
            <li>Additional charges may apply for events, depending on the number of guests 
                and specific needs (e.g., catering, decorations, additional services).</li>
            <li>The organizer is responsible for the conduct of all guests and ensuring 
                the event adheres to local laws and regulations.</li>
          </ul>
        </section>
      </main>
      <p>Note:Please carefully go through our terms and conditions carefully before booking confirmation</p>
    </div>
      
      <Footer />
    </>
  )
}

export default TermsConditions