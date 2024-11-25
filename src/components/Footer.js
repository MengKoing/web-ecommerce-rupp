import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="footer_section">
      <div className="container">
        <div className="row">
          {/* Contact Section */}
          <div className="col-md-4 footer-col">
            <div className="footer_contact">
              <h4>Contact Us</h4>
              <div className="contact_link_box">
                <Link to="/location">
                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                  <span>Location</span>
                </Link>
                <Link to="/contact">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                  <span>Call +855 1234214</span>
                </Link>
                <Link to="/contact">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <span>demo@gmail.com</span>
                </Link>
              </div>
            </div>
          </div>


          {/* Opening Hours Section */}
          <div className="col-md-4 footer-col">
            <h4>Opening Hours</h4>
            <p>Everyday</p>
            <p>10.00 Am - 10.00 Pm</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <p>
            &copy; <span>{currentYear}</span> All Rights Reserved By{" "}
            <a href="https://html.design/" target="_blank" rel="noopener noreferrer">
              Free Html Templates
            </a>
            <br />
            <br />
            &copy; <span>{currentYear}</span> Distributed By{" "}
            <a href="https://themewagon.com/" target="_blank" rel="noopener noreferrer">
              ThemeWagon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
