import React from 'react';
import { translate } from 'react-translate'

import Link from '../Components/LowerCaseUrlLink';

import { englishCode, spanishCode } from '../Utilities/LanguageCodes';
import { LogAboutUs } from '../Utilities/ActivityLogging'

const Header = (props) => {
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav role="navigation">
            <ul>
              <li>
                <Link to={`/${props.language}`}>{props.t("homeLinkTitle")}</Link>
              </li>
              <li>
                <Link to={`/${props.language}/store`}>{props.t("storeLinkTitle")}</Link>
              </li>
              <li>
                <Link to={`/${props.language}/articles`}>{props.t("articlesLinkTitle")}</Link>
              </li>
              {
                props.language.toLowerCase() === englishCode ?
                  <li>
                    <Link to={`/${props.language}/about-us`} onClick={LogAboutUs}>{props.t("aboutLinkTitle")}</Link>
                  </li>
                  : props.language.toLowerCase() === spanishCode ?
                    <li>
                      <Link to={`/${props.language}/acerca-de`} onClick={LogAboutUs}>{props.t("aboutLinkTitle")}</Link>
                    </li>
                    : null
              }
              <li>
                <Link to={`/${props.language}/cafes`}>{props.t("cafesLinkTitle")}</Link>
              </li>
              <li>
                <Link to={`/${props.language}/contacts`}>{props.t("contactsLinkTitle")}</Link>
              </li>
            </ul>
          </nav>
          <div className="additional-menu-buttons user-menu">
            <nav role="navigation">
              <ul className="dropdown-items-list dropdown-desktop-visible">
                <li>
                  <a onClick={() =>
                    location.pathname.endsWith('acerca-de') ? props.changeLanguage("en-US", "/about-us") : props.changeLanguage("en-US")
                  }>English</a>
                </li>
                <li>
                  <a onClick={() =>
                    location.pathname.endsWith('about-us') ? props.changeLanguage("es-ES", "/acerca-de") : props.changeLanguage("es-ES")
                  }>Español</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="header-row">
        <div className="container">
          <div className="col-xs-8 col-md-8 col-lg-4 logo">
            <h1 className="logo">
              <Link to={`/${props.language}`} className="logo-link">Dancing Goat</Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default translate("Header")(Header);
