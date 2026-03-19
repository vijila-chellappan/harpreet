import React from "react";
import "../css/Footer.css";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaYoutube 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT SIDE */}
        <div className="footer-left">
          <h3>Services We Offer</h3>
          <p>
            Super Visa Insurance | Life Insurance | Health Insurance |
            Critical Illness Insurance | Disability Insurance | RRSP | RESP |
            Investments | Term Life Insurance | Whole Life Insurance |
            Universal Life Insurance | Business Insurance
          </p>

          <hr />

          <h4>Privacy Policy</h4>
          <ul>
            <li>Super Visa Insurance Brampton</li>
            <li>Super Visa Insurance Mississauga</li>
            <li>Super Visa Insurance Etobicoke</li>
            <li>Super Visa Insurance Cambridge</li>
            <li>Super Visa Insurance Kitchener</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="footer-right">
            <h3>Contact Detail</h3>

            <p>
                Test Company Name <br />
                123 Test Street, Unit 10 <br />
                Toronto, ON, Canada
            </p>

            <p><strong>Phone:</strong> 123-456-7890</p>
            <p><strong>Cell:</strong> 987-654-3210</p>
            <p><strong>Email:</strong> test@example.com</p>

            <hr />

            <h3>Our Social Link!</h3>
            <div className="social-icons">
                <FaFacebookF />
                <FaTwitter />
                <FaLinkedinIn />
                <FaYoutube />
            </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        Developed By <span>CanadianLIC</span>
      </div>
    </footer>
  );
};

export default Footer;