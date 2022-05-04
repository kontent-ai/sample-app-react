import React from 'react';
import Link from './LowerCaseUrlLink';
import { englishCode, spanishCode } from '../Utilities/LanguageCodes';
import MessageBox from './MessageBox';
import { ParsedQs } from 'qs';
import { useIntl } from 'react-intl';
import { SetLanguageType } from '../LocalizedApp';

interface HeaderProps {
  message?: string | ParsedQs | string[] | ParsedQs[] | undefined;
  changeLanguage: SetLanguageType;
}

const Header: React.FC<HeaderProps> = (props) => {
  const messageBox = props.message && <MessageBox message={props.message} />;
  const { locale: language, formatMessage } = useIntl();
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to={`/${language}`}>
                  {formatMessage({ id: 'Header.homeLinkTitle' })}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/store`}>
                  {formatMessage({ id: 'Header.storeLinkTitle' })}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/articles`}>
                  {formatMessage({ id: 'Header.articlesLinkTitle' })}
                </Link>
              </li>
              {language.toLowerCase() === englishCode.toLowerCase() ? (
                <li>
                  <Link to={`/${language}/about-us`}>
                    {formatMessage({ id: 'Header.aboutLinkTitle' })}
                  </Link>
                </li>
              ) : language.toLowerCase() === spanishCode.toLowerCase() ? (
                <li>
                  <Link to={`/${language}/acerca-de`}>
                    {formatMessage({ id: 'Header.aboutLinkTitle' })}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to={`/${language}/cafes`}>
                  {formatMessage({ id: 'Header.cafesLinkTitle' })}
                </Link>
              </li>
              <li>
                <Link to={`/${language}/contacts`}>
                  {formatMessage({ id: 'Header.contactsLinkTitle' })}
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
                    onClick={(e): void => {
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
                    onClick={(e): void => {
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
              <Link to={`/${language}`} className="logo-link">
                Dancing Goat
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
