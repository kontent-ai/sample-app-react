import React from 'react';
import { Link } from 'react-router-dom'
import { LogAboutUs } from '../Utilities/ActivityLogging'

const Header = (props) => {
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav role="navigation">
            <ul>
              <li>
                <Link to={`/${props.language}`}>Home</Link>
              </li>
              <li>
                <Link to={`/${props.language}/store`}>Product catalog</Link>
              </li>
              <li>
                <Link to={`/${props.language}/articles`}>Articles</Link>
              </li>
              <li>
                <Link to={`/${props.language}/about`} onClick={LogAboutUs}>About us</Link>
              </li>
              <li>
                <Link to={`/${props.language}/cafes`}>Cafes</Link>
              </li>
              <li>
                <Link to={`/${props.language}/contacts`}>Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="additional-menu-buttons user-menu">
            <nav role="navigation">
              <ul className="dropdown-items-list dropdown-desktop-visible">
                <li>
                  <a onClick={() => props.changeLanguage("en-US")}>English</a>
                </li>
                <li>
                  <a onClick={() => props.changeLanguage("es-ES")}>Español</a>
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

export default Header;
