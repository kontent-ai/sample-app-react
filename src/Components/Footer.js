import React from 'react';
import Link from '../Components/LowerCaseUrlLink';
import { translate } from 'react-translate';
const Footer = props => {
  return (
    <div className="footer-wrapper">
      <footer role="contentinfo">
        <div className="footer-container">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 footer-col">
                <h3 className="contact-title">{props.t('contact')}</h3>
                <p>
                  (+0) 000-000-0000
                  <br />
                  <Link to="mailto:dancinggoat@localhost.local">
                    dancinggoat@localhost.local
                  </Link>
                  <br />
                  <br /> Dancing Goat Ltd
                  <br /> 62 E Lake St Chicago,
                  <br /> {props.t('cityStateZip')}
                </p>
              </div>
              <div className="col-md-4 col-lg-4 footer-col">
                <h3>{props.t('followUs')}</h3>
                <Link
                  className="followus-link"
                  to={'https://www.facebook.com/Dancing.Goat'}
                  target="_blank"
                >
                  <img
                    alt="Follow us on Facebook"
                    className=""
                    src="/Images/facebook-icon.png"
                    title={props.t('followUsOnFacebook')}
                  />
                </Link>
                <Link
                  className="followus-link"
                  to={'https://twitter.com/DancingGoat78'}
                  target="_blank"
                >
                  <img
                    alt="Follow us on Twitter"
                    className=""
                    src="/Images/twitter-icon.png"
                    title={props.t('followUsOnTwitter')}
                  />
                </Link>
              </div>
              <div className="col-md-4 col-lg-4 footer-col" />
            </div>
          </div>
        </div>
        <div className="container copyright">
          Copyright &copy; 2016 Dancing Goat. {props.t('allRightsReserved')}
        </div>
      </footer>
    </div>
  );
};
export default translate('Footer')(Footer);
