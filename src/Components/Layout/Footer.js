import React from 'react';
import { FaFacebook, FaInstagramSquare, FaWhatsapp,FaEnvelope,FaPhone,FaMapMarkerAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import '../../Styles/footer.css'
function Footer() {
  return (
    
    <div className="row footer bg-dark text-light p-3">
    <div className='about-us col-4'>
      <h6>About Us</h6>
   
     <p>A-rof Traders, your one-stop shop for gentle and effective baby care products! We understand the preciousness of your little ones and believe in providing the very best for their delicate needs.</p>
     <div className='social-icons d-flex justify-content-center'>
    <a href="">     <FaInstagramSquare className='icon'/></a>           
      <a href="">               <FaWhatsapp className='icon'/></a>           
      <a href="">  <FaFacebook className='icon'/></a>           
      <a href="">  <FaSquareXTwitter className='icon'/></a>           

    </div>
    
</div>
<div className="contact-us col-4 ">
  
        <h6>Contact Us</h6>
          <p>
            <FaEnvelope className="contact-icon" /> arofknr@gmail.com
          </p>
          <p>
            <FaPhone className="contact-icon" /> +919562240222
          </p>
          <p>
            <FaMapMarkerAlt className="contact-icon" /> Madai,Kannur,Kerala
          </p>
        
      </div>
      <div className="footer-navigation col-4">
        <h6>Navigation</h6>
        <Link>Home</Link>
        <Link>Produts</Link>
        <Link>Contact Us</Link>

      </div>
      {/* <div className="footer-items d-flex justify-content-center">
        <Link to="/about" className="text-light mx-3">About</Link>
        <Link to="/contact" className="text-light mx-3">Contact</Link>
        <Link to="/policy" className="text-light mx-3">Privacy Policy</Link>
      </div> */}
      <div className="copy-right text-center mt-3">
        <p>All Rights Reserved &copy; A-rof Traders</p>
      </div>
    </div>
  );
}

export default Footer;
