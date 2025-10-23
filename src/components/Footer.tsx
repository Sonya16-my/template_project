import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-columns">
          <div className="footer-column">
            <h3>COMPANY</h3>
            <ul>
              <li>About</li>
              <li>Contact Us</li>
              <li>Jobs</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>HELP</h3>
            <ul>
              <li>Track My Music</li>
              <li>Community Support</li>
              <li>Community Guidelines</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>FOLLOW US</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="language-selector">
            <select>
              <option>English</option>
              <option>Deutsch</option>
              <option>Español</option>
            </select>
          </div>
          <div className="copyright">
            © 2024 Music Discovery. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;