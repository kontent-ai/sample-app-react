import React from 'react';
import Link from './LowerCaseUrlLink';
import { englishCode, spanishCode } from '../Utilities/LanguageCodes';
import MessageBox from './MessageBox';
import { ParsedQs } from 'qs';
import { useIntl } from 'react-intl';

interface HeaderProps {
  message: string | ParsedQs | string[] | ParsedQs[] | undefined,
  language: string,
  changeLanguage: (newLanguage: any, newUrl?: any) => void,
}


const Header: React.FC<HeaderProps> = (props) => {
  const messageBox = props.message && <MessageBox message={props.message} />;
  const { formatMessage } = useIntl();
  return (
    <header className="header" role="banner">
      <div className="menu">
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to={`/${props.language}`}>
                  { formatMessage({ id: 'Header.homeLinkTitle' }) }
                </Link>
              </li>
              <li>
                <Link to={`/${props.language}/store`}>
                  { formatMessage({ id:'Header.storeLinkTitle' }) }
                </Link>
              </li>
              <li>
                <Link to={`/${props.language}/articles`}>
                  { formatMessage({ id :'Header.articlesLinkTitle' }) }
                </Link>
              </li>
              {props.language.toLowerCase() === englishCode.toLowerCase() ? (
                <li>
                  <Link to={`/${props.language}/about-us`}>
                    { formatMessage({id: 'Header.aboutLinkTitle'} )  }
                  </Link>
                </li>
              ) : props.language.toLowerCase() === spanishCode.toLowerCase() ? (
                <li>
                  <Link to={`/${props.language}/acerca-de`}>
                    { formatMessage({ id: 'Header.aboutLinkTitle' })  }
                  </Link>
                </li>
              ) : null}
              <li>
                <Link to={`/${props.language}/cafes`}>
                  { formatMessage({ id: 'Header.cafesLinkTitle' }) }
                </Link>
              </li>
              <li>
                <Link to={`/${props.language}/contacts`}>
                  { formatMessage({ id:'Header.contactsLinkTitle'}) }
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

export default Header;
