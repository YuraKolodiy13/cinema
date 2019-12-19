import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Footer.scss';


class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="footer-socials">
            <Link to="#" target="_blank" className="fab fa-twitter"/>
            <Link to="#" target="_blank" className="fab fa-facebook-f"/>
            <Link to="#" target="_blank" className="fab fa-instagram"/>
            <Link to="#" target="_blank" className="fab fa-linkedin-in"/>
            <Link to="#" target="_blank" className="fab fa-google"/>
            <Link to="#" target="_blank" className="fab fa-youtube"/>
          </div>
          <div className="copyright">© {(new Date().getFullYear())} Cinema</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
