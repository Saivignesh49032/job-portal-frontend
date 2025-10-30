import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>NetPy Technologies</h3>
            <p>careers@netpy.in | +1 (555) 123-4567</p>
          </div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NetPy Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
