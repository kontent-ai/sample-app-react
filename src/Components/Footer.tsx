import React from 'react';
import Link from '../Components/LowerCaseUrlLink';
import { useIntl } from 'react-intl';

const Footer: React.FC = () => {
  const { formatMessage } = useIntl();
  return (
    <div className="footer-wrapper">
      <footer role="contentinfo">
        <div className="footer-container">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 footer-col">
                <h3 className="contact-title">
                  {formatMessage({ id: 'Footer.contact' })}
                </h3>
                <p>
                  (+0) 000-000-0000
                  <br />
                  <Link to="mailto:dancinggoat@localhost.local">
                    dancinggoat@localhost.local
                  </Link>
                  <br />
                  <br /> Dancing Goat Ltd
                  <br /> 62 E Lake St Chicago,
                  <br /> {formatMessage({ id: 'Footer.cityStateZip' })}
                </p>
              </div>
              <div className="col-md-4 col-lg-4 footer-col">
                <h3>{formatMessage({ id: 'Footer.followUs' })}</h3>
                <Link
                  className="followus-link"
                  to={'https://www.facebook.com/Dancing.Goat'}
                  target="_blank"
                >
                  <img
                    alt="Follow us on Facebook"
                    className=""
                    src="/Images/facebook-icon.png"
                    title={formatMessage({ id: 'Footer.followUsOnFacebook' })}
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
                    title={formatMessage({ id: 'Footer.followUsOnTwitter' })}
                  />
                </Link>
              </div>
              <div className="col-md-4 col-lg-4 footer-col" />
            </div>
          </div>
        </div>
        <div className="container copyright">
          Copyright &copy; 2016 Dancing Goat.{' '}
          {formatMessage({ id: 'Footer.allRightsReserved' })}
        </div>
      </footer>
    </div>
  );
};
export default Footer;
