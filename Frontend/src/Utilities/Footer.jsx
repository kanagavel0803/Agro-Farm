import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const footerData = {
  about: "AgroFarm is committed to providing high-quality agricultural products, including premium seeds, fertilizers, and farming tools, ensuring better yield and sustainable farming.",
  address: "Dharmapuri,India",
  phone: "+91 98765 43210",
  email: "mini@agrofarm.com",
  socialLinks: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
  },
  copyright: `© ${new Date().getFullYear()} AgroStores. All rights reserved.`,
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section about">
          <h3>About Us</h3>
          <p>{footerData.about}</p>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt className="footer-icon" /> {footerData.address}</p>
          <p><FaPhone className="footer-icon" /> {footerData.phone}</p>
          <p><FaEnvelope className="footer-icon" /> {footerData.email}</p>
        </div>

        <div className="footer-section follow">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href={footerData.socialLinks.facebook} className="social-link"><FaFacebook className="social-icon" /></a>
            <a href={footerData.socialLinks.twitter} className="social-link"><FaTwitter className="social-icon" /></a>
            <a href={footerData.socialLinks.instagram} className="social-link"><FaInstagram className="social-icon" /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
