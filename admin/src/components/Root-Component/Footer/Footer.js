import React from 'react'
import './Footer.css'
import { AiOutlineRight} from 'react-icons/ai';
import logo from '../../../assets/logo.png'
import { useNavigate,useLocation} from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='fintPrintBar'>
    {/* <div className='row'>
      <p><strong>Please note the current interest rate as of November 2022:</strong></p>
      <p >From 7.99% OAC with amortization of 180 months for new cottages. Maximum to finance $200,000. These rates are subject to change without notice. E &amp; O.E. For down payments, a maximum of $20,000 can be paid using a credit card. Any further payments can be paid by transfer or certified cheque.</p>
    </div> */}
  </div>


  <footer id='footer'>
    
    <div className='footer1 another '>

      <div className='footer2'>
        <div>
          <img onClick={() => {navigate('/')}} src={logo} alt="Great Blue Resorts"></img>
        </div> 
      </div> 

      <div class="social page">
        <h3>LET'S GET SOCIAL</h3>
        <div class="socialLinks">
          <a href="https://www.facebook.com/greatblueresorts" target="_blank" title="Like us on facebook">
            <img src="https://www.greatblueresorts.com/wp-content/themes/do180-theme/images/facebook-2.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/cubagoa/?hl=en" target="_blank" title="Follow us on instagram">
            <img src="https://www.greatblueresorts.com/wp-content/themes/do180-theme/images/instagram-2.png" alt="instagram" />
          </a>
          {/* <a href="https://www.twitter.com/greatblueresort" target="_blank" title="Follow us on twitter">
            <img src="https://www.greatblueresorts.com/wp-content/themes/do180-theme/images/twitter-2.png" alt="twitter" />
          </a>
          <a href="https://www.youtube.com/channel/UCStX7YFUTZkhCoVSnz971iA" target="_blank" title="Watch our videos on youtube">
            <img src="https://www.greatblueresorts.com/wp-content/themes/do180-theme/images/youtube-2.png" alt="youtube" />
          </a> */}
        </div>
      </div >

      <div class="newsletter">

        <h3>
          HELPFUL LINKS
        </h3>
        <p>
        <div onClick={() => navigate('/our-properties')}>OUR PROPERTIES </div>
        <div onClick={() => navigate('/about')}>ABOUT US</div>
        <div onClick={() => navigate('/contact-us')}>CONTACT US</div>
        </p>
      </div>

    </div >

    
  </footer >
  {/* <div className='formTab tellMe open'>
    <h3 class="mainFormTitle open"> DISCOVER MORE {<AiOutlineRight/>}</h3>
  </div> */}
  </>
  )
}

export default Footer