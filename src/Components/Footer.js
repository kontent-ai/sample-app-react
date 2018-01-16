import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div
        class="footer-wrapper"
        style={{ display: 'table row', height: '100%' }}
      >
        <footer role="contentinfo">
          <div
            class="footer-container"
            style={{
              background: '#1D1D1D',
              color: '#fff',
              paddingBottom: '2px'
            }}
          >
            <div
              class="container"
              style={{
                marginRight: 'auto',
                marginLeft: 'auto',
                paddingLeft: '8px',
                paddingRight: '8px'
              }}
            >
              <div
                class="row"
                style={{ marginLeft: '-0.5px', marginRight: '-0.5px' }}
              >
                <div
                  class="col-md-4 col-lg-4 footer-col"
                  style={{ textAlign: 'center' }}
                >
                  <h3 class="contact-title">Contact</h3>
                  <p>
                    (+1) 617-632-4520<br />
                    <a href="mailto:dancinggoat@localhost.local">
                      dancinggoat@localhost.local
                    </a>
                    <br />
                    <br /> Dancing Goat Ltd<br /> 62 E Lake St Chicago,<br />{' '}
                    Illinois 60601, USA
                  </p>
                </div>
                <div
                  class="col-md-4 col-lg-4 footer-col"
                  style={{ textAlign: 'center' }}
                >
                  <h3>Follow us</h3>
                  <a
                    class="followus-link"
                    href="https://www.facebook.com/Dancing.Goat"
                    target="_blank"
                  >
                    <img
                      alt="Follow us on Facebook"
                      class=""
                      src="Images/facebook-icon.png"
                      title="Follow us on Facebook"
                    />
                  </a>
                  <a
                    class="followus-link"
                    href="https://twitter.com/DancingGoat78"
                    target="_blank"
                  >
                    <img
                      alt="Follow us on Twitter"
                      class=""
                      src="Images/twitter-icon.png"
                      title="Follow us on Twitter"
                    />
                  </a>
                </div>
                <div class="col-md-4 col-lg-4 footer-col" />
              </div>
            </div>
          </div>
          <div
            class="container copyright"
            style={{
              background: '#1D1D1D',
              color: '#fff'
            }}
          >
            Copyright &copy; 2016 Dancing Goat. All rights reserved.
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
