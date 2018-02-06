import React from 'react'
import Link from '../Components/LowerCaseUrlLink';
import { translate } from 'react-translate'
const Footer = (props) => {

    return(
      <div className="footer-wrapper">
        <footer role="contentinfo">
          <div className="footer-container">
            <div className="container">
              <div className="row">
                <div className="col-md-4 col-lg-4 footer-col">
                  <h3 className="contact-title">Contact</h3>
                  <p>
                    (+1) 617-632-4520<br />
                    <Link to="mailto:dancinggoat@localhost.local">dancinggoat@localhost.local</Link><br />
                    <br /> Dancing Goat Ltd<br /> 62 E Lake St Chicago,<br /> Illinois 60601, USA
                  </p>
                </div>
                <div className="col-md-4 col-lg-4 footer-col">
                  <h3>Follow us</h3>
                  <Link className="followus-link" to={"https://www.facebook.com/Dancing.Goat"} target="_blank">
                    <img alt="Follow us on Facebook" className="" src="/Images/facebook-icon.png" title="Follow us on Facebook" />
                  </Link>
                  <Link className="followus-link" to={"https://twitter.com/DancingGoat78"} target="_blank">
                    <img alt="Follow us on Twitter" className="" src="/Images/twitter-icon.png" title="Follow us on Twitter" />
                  </Link>
                </div>
                <div className="col-md-4 col-lg-4 footer-col" />
              </div>
            </div>
          </div>
          <div className="container copyright">
            Copyright &copy; 2016 Dancing Goat. All rights reserved.
          </div>
        </footer>
      </div>
    )

}
export default translate("Footer")(Footer);
