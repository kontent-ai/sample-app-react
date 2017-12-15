import React from 'react';
import { Link } from 'react-router-dom'
import { LogAboutUs } from '../Utilities/ActivityLogging'

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav role="navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/store">Product catalog</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
              <li>
                <Link to="/about" onClick={LogAboutUs}>About us</Link>
              </li>
              <li>
                <Link to="/cafes">Cafes</Link>
              </li>
              <li>
                <Link to="/contacts">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="header-row">
        <div className="container">
          <div className="col-xs-8 col-md-8 col-lg-4 logo">
            <h1 className="logo">
              <Link to="/" className="logo-link">Dancing Goat</Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
