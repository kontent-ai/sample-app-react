import React, { Component } from 'react';

// import adminStyles from './Admin.css';

class Configuration extends Component {
  render() {
    require('./Admin.css')
    return (

      <div>
        <div className="logotype-row">
          <div className="content">
            <div className="logotype">
              <a href="/" className="logotype-link">
                <svg viewBox="0 0 152 54" id="kenticoCloud" width="100%" height="100%">
                  <title>Kentico Cloud—the cloud-first CMS for digital agencies and their clients</title>
                  <g fill="#fff" fill-rule="evenodd">
                    <circle cx="27.1" cy="27" r="5.8"></circle>
                    <path d="M15.1 33.4l-6.9 6.9c-4.1 4.1 2.9 8.3 2.9 8.3l9.7-9.7c3.5-3.4-2.2-8.9-5.7-5.5zM39.1 20.6l6.9-6.9c4.1-4.1-2.9-8.3-2.9-8.3l-9.7 9.7c-3.4 3.4 2.3 8.9 5.7 5.5zM15.1 20.6c3.5 3.5 9-2.2 5.6-5.6l-6.9-6.9C9.7 4 5.4 11 5.4 11s5.8 5.7 9.7 9.6zM39.1 33.4c-3.5-3.5-9 2.2-5.6 5.7l6.9 6.9c4.1 4.1 8.3-2.9 8.3-2.9s-5.7-5.8-9.6-9.7zM40.1 23c-4.9 0-4.8 7.9.1 7.9H50c5.8 0 3.9-7.9 3.9-7.9H40.1zM14.1 23H4.3c-5.8 0-3.8 8-3.8 8h13.7c4.9 0 4.8-8-.1-8zM23.2 40v9.8c0 5.8 7.9 3.9 7.9 3.9V40c0-5-7.9-4.9-7.9 0zM31.1 14V4.2c0-5.8-7.9-3.9-7.9-3.9V14c0 5 7.9 4.9 7.9 0zM71.4 17.1c1.7-2.4 5-6.4 6.3-7.7v-.1h-2.3c-1.3 0-1.7.1-2.5 1-1.8 2-3.3 4.3-4.8 6.5v-5.2c0-1.2-.6-2.3-2.2-2.3h-1.1v14.5c0 1.2.6 2.3 2.2 2.3h1.1v-8.5c1.7 2.7 3.3 5.1 5.4 7.5.6.7 1.5 1.1 2.3 1.1 1.3 0 1.9-.5 2.2-1.7-.5-.1-.8-.3-1.3-.7-2.2-1.9-3.7-4.4-5.3-6.7zM85.3 26.3c3.6 0 4.8-1.3 4.8-3v-1H90c-1.1 1-2.7 1.2-4 1.2-1.9 0-3.5-1.1-3.7-2.7h2.2c4.4 0 6.2-.8 6.2-3.2 0-3.2-2.5-5.1-5.3-5.1-3.8 0-6.5 2.8-6.5 7.2-.1 4 3.1 6.6 6.4 6.6zm-3.1-8.2c.1-1.5 1.2-2.8 2.8-2.8 1.5 0 2.5.7 2.5 2 0 .9-.7 1.3-3.8 1.3h-1.5v-.5zM105 26v-7.7c0-3.7-2.6-5.8-5.7-5.8-4.1 0-5.9 2.9-5.9 5.7v5.7c0 1.2.9 2.2 2.3 2.2h1v-7.6c0-1.9 1-3 2.4-3 1.7 0 2.7 1 2.7 3.2v5.2c0 1.2.9 2.2 2.4 2.2h.8V26zM111.8 9.8h-.8c-.5 0-1.1.4-1.5.9-.7.8-1 1.3-1 2.6v7.9c0 3.1 1.6 4.9 4.9 4.9 1.9 0 2.9-.9 2.9-2.2v-1.2h-.1c-.5.3-1.3.5-2.4.5-1.3 0-2.1-.7-2.1-2.4v-5.2h2.6c1.3 0 2-.9 2-1.6v-1.3h-4.6V9.8h.1zM120.6 11.9c1.1 0 1.9-.9 1.9-1.9 0-1.1-.9-1.9-1.9-1.9-1.1 0-1.9.9-1.9 1.9 0 1 .8 1.9 1.9 1.9zM122.2 15.6c0-1.7-.9-2.4-2.3-2.4h-.9v8.9c0 2.7 1.4 4.1 3.9 4.1 1.4 0 2-.6 2-2v-.7h-.6c-1.4 0-2-.4-2-1.7v-6.2h-.1zM133.4 12.7c-4.5 0-7.1 3.2-7.1 7s3.1 6.6 6.8 6.6c2.4 0 3.9-1.2 3.9-2.7V22h-.1c-.5.6-1.6 1.2-3.5 1.2-2.2 0-3.6-1.6-3.6-4 0-2 1.7-3.5 3.6-3.5 1.9 0 3.1.6 3.6 1.4h.1v-1.5c-.1-1.6-1.5-2.9-3.7-2.9zM145.6 12.5c-4.3 0-6.5 3.2-6.5 7.1 0 3.5 2.3 6.7 6.2 6.7 4.3 0 6.5-3.2 6.5-7.1 0-3.5-2.2-6.7-6.2-6.7zm0 10.9c-2.2 0-3.1-1.6-3.1-4.2 0-2.2 1-3.7 2.8-3.7 2.2 0 3.1 1.6 3.1 4.2 0 2.1-.9 3.7-2.8 3.7zM72.8 30.6c-5.1 0-8.6 3.6-8.6 8.8 0 5 3.8 8.3 8.3 8.3 2.3 0 5-1 5-3.3v-1.2h-.1c-.9 1-2.8 1.6-4.4 1.6-3.2 0-5.3-2-5.3-5.9 0-3.3 2.2-5.4 5.2-5.4 1.4 0 3.5.4 4.6 1.8h.1V34c-.1-2.2-2.1-3.4-4.8-3.4zM83.4 43.3V32.2c0-1.2-.7-2.2-2.3-2.2h-.9v13.6c0 2.7 1.5 4.1 4.2 4.1 1.4 0 2.2-.6 2.2-2V45h-.9c-1.6.1-2.3-.3-2.3-1.7zM94.5 34.1c-4.3 0-6.5 3.2-6.5 7.1 0 3.5 2.3 6.7 6.2 6.7 4.3 0 6.5-3.2 6.5-7.1.1-3.5-2.2-6.7-6.2-6.7zm0 10.9c-2.2 0-3.1-1.6-3.1-4.2 0-2.2 1-3.7 2.8-3.7 2.2 0 3.1 1.6 3.1 4.2.1 2.1-.8 3.7-2.8 3.7zM112.5 34.4h-.6v7.4c0 2.3-1 3.2-2.3 3.2-1.5 0-2.7-1-2.7-3.4v-4.8c0-1.5-.8-2.3-2.7-2.3h-.6V42c0 3.8 2.6 6 5.8 6 3.8 0 5.8-2.1 5.8-6.2v-4.9c0-1.7-.8-2.5-2.7-2.5zM128.3 30h-1v6.2c-.5-1.2-2-2.1-3.3-2.1-3.8 0-5.9 2.8-5.9 7.1 0 3.6 2.7 6.7 6.1 6.7 4.5 0 6.3-2.5 6.3-6.4v-9.3c0-1.3-.7-2.2-2.2-2.2zm-3.7 15.2c-1.9 0-3.3-1.8-3.3-4.5 0-2.1 1.1-3.7 2.7-3.7 1.8 0 3.2 1.2 3.2 4.5 0 2.3-.8 3.7-2.6 3.7z"></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <header>
          <div className="content">
            <h1>Sample Site—Configuration</h1>
            <p>For your sample app to work, you should have a Kentico Cloud project containing content. Your app should be then configured with its project ID. You can either get it by signing in using your Kentico Cloud credentials or by signing up for a trial. Later, it will be converted to a free plan.</p>
          </div>
        </header>
        <section>
          <h2>Get a Project ID</h2>
          <p>You may wish to either select from existing projects or create a new sample project. The app will be configured with its project ID.</p>
          <input type="submit" className="button-secondary" value="Get Project ID from Kentico Cloud" />
        </section>
        <div className="content sections-secondary divided">
          <section className="section-secondary">
            <h2>Set A Project ID Manually</h2>
            <p>Alternatively, you can configure your app manually by submitting a project ID below.</p>
            <div className="inline-controls">

              <div className="form-group">
                <div className="form-group-label">
                  <label htmlFor="ProjectGuid">ProjectGuid</label>
                </div>
                <div className="form-group-input">
                  <input id="ProjectGuid" name="ProjectGuid" placeholder="ProjectGuid" type="text" value="" />
                </div>
                <div className="message-validation">
                  <span className="field-validation-valid"></span>
                </div>
              </div>
              <input type="submit" className="button-secondary" value="Submit" />
            </div>
          </section>
          <section className="section-secondary">
            <h2>Use the Shared Project</h2>
            <p>Alternatively, you may wish to use the shared project (project ID "975bf280-fd91-488c-994c-2f04416e5ee3").</p>
            <p><strong>Note:</strong> You cannot edit content in the shared project.</p>
            <input type="submit" className="button-secondary" value="Use the shared project" />
          </section>
        </div>
      </div >
    );
  }
};

export default Configuration;