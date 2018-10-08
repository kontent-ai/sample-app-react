import React from 'react';
import { translate } from 'react-translate';

import Link from '../Components/LowerCaseUrlLink';
import { englishCode, spanishCode } from '../Utilities/LanguageCodes';
import MessageBox from './MessageBox';

const Header = props => {
  const messageBox = props.message && <MessageBox message={props.message} />;
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to={`/${props.language}`}>
                  {props.t('homeLinkTitle')}
                </Link>
              </li>
              <li>
                <Link to={`/${props.language}/store`}>
                  {props.t('storeLinkTitle')}
                </Link>
              </li>
              <li>
                <Link to={`/${props.language}/articles`}>
                  {props.t('articlesLinkTitle')}
                </Link>
              </li>
              {props.language.toLowerCase() === englishCode.toLowerCase() ? (
                <li>
                  <Link to={`/${props.language}/about-us`}>
                    {props.t('aboutLinkTitle')}
                  </Link>
                </li>
              ) : props.language.toLowerCase() === spanishCode.toLowerCase() ? (
                <li>
                  <Link to={`/${props.language}/acerca-de`}>
                    {props.t('aboutLinkTitle')}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to={`/${props.language}/cafes`}>
                  {props.t('cafesLinkTitle')}
                </Link>
              </li>
              <li>
                <Link to={`/${props.language}/contacts`}>
                  {props.t('contactsLinkTitle')}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="additional-menu-buttons user-menu">
            <nav>
              <ul className="dropdown-items-list dropdown-desktop-visible">
                <li>
                  <a
                    href="/#"
                    onClick={e => {
                      e.preventDefault();
                      window.location.pathname.endsWith('acerca-de')
                        ? props.changeLanguage(englishCode, '/about-us')
                        : props.changeLanguage(englishCode);
                    }}
                  >
                    English
                  </a>
                </li>
                <li>
                  <a
                    href="/#"
                    onClick={e => {
                      e.preventDefault();
                      window.location.pathname.endsWith('about-us')
                        ? props.changeLanguage(spanishCode, '/acerca-de')
                        : props.changeLanguage(spanishCode);
                    }}
                  >
                    Español
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {messageBox}
      <div className="header-row">
        <div className="container">
          <div className="col-xs-8 col-md-8 col-lg-4 logo">
            <h1 className="logo">
              <Link to={`/${props.language}`} className="logo-link">
                Dancing Goat
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default translate('Header')(Header);
