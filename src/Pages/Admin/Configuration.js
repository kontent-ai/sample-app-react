import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { isUUID } from 'validator';

import { resetClient, Client } from '../../Client';
import {
  defaultProjectId,
  selectedProjectCookieName,
  getSampleProjectItems
} from '../../Utilities/SelectedProject';

import KontentLogo from '../../Images/Admin/kk-logo.svg';

import './Configuration.css';
import { spinnerService } from '@simply007org/react-spinners';
import SpinnerLayout from '../../Components/SpinnerLayout';

const getWindowCenterPosition = (windowWidth, windowHeight) => {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;
  const screenWidth = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
  const screenHeight = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;
  const left = screenWidth / 2 - windowWidth / 2 + dualScreenLeft;
  const top = screenHeight / 2 - windowHeight / 2 + dualScreenTop;
  return { left, top };
};

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProjectInputValue: this.props.cookies.get(
        selectedProjectCookieName
      ),
    };

    this.handleProjectInputChange = this.handleProjectInputChange.bind(this);
    this.handleSetProjectSubmit = this.handleSetProjectSubmit.bind(this);
    this.setNewProjectId = this.setNewProjectId.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.waitUntilProjectAccessible = this.waitUntilProjectAccessible.bind(
      this
    );
  }

  componentDidMount() {
    window.addEventListener('message', this.receiveMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage);
  }

  handleProjectInputChange(event) {
    this.setState({ currentProjectInputValue: event.target.value });
  }

  handleSetProjectSubmit(event) {
    event.preventDefault();
    const newProjectId = event.target[0].value;
    this.setNewProjectId(newProjectId);
  }

  setNewProjectId(newProjectId, newlyGeneratedProject) {
    if (!isUUID(newProjectId)) {
      const message = `Selected project (${newProjectId}) is not a valid GUID`;
      console.error(message);
      alert(message);
      this.setState({
        currentProjectInputValue: this.props.cookies.get(
          selectedProjectCookieName
        )
      });
      return;
    }

    resetClient(newProjectId);
    if (newlyGeneratedProject) {
      this.waitUntilProjectAccessible(newProjectId);
      spinnerService.show("apiSpinner");
      return;
    }

    this.redirectToHome(newProjectId);
  }

  waitUntilProjectAccessible(newProjectId) {
    setTimeout(() => {
      resetClient(newProjectId);
      Client.items()
        .elementsParameter(['id'])
        .depthParameter(0)
        .toPromise()
        .then(response => {
          getSampleProjectItems().then(
            sampleProjectClientResult => {
              resetClient(newProjectId);
              if (
                response.data.items.length >= sampleProjectClientResult.data.items.length
              ) {
                spinnerService.hide("apiSpinner");
                this.redirectToHome(newProjectId);
              } else {
                this.waitUntilProjectAccessible(newProjectId);
              }
            }
          );
        });
    }, 2000);
  }

  redirectToHome(newProjectId) {
    const infoMessage =
      newProjectId === defaultProjectId
        ? `You've configured your app to with a project ID of a shared Kontent project.`
        : `You've configured your app with a project ID "${newProjectId}". You can edit its contents at https://kontent.ai/.`;
    this.props.history.push(`/?infoMessage=${infoMessage}`);
  }

  openKenticoKontentProjectSelector(event) {
    event.preventDefault();
    const windowWidth = 800;
    const windowHeight = 800;
    const { left, top } = getWindowCenterPosition(windowWidth, windowHeight);

    window.open(
      'https://app.kontent.ai/sample-site-configuration',
      'Kentico Kontent',
      `status=no,width=${windowWidth},height=${windowHeight},resizable=yes,left=
      ${left},top=${top},toolbar=no,menubar=no,location=no,directories=no`
    );
  }

  receiveMessage(event) {
    if (event.origin.toLowerCase() !== 'https://app.kontent.ai') return;

    if (!event.data.projectGuid) {
      return;
    }

    this.setNewProjectId(
      event.data.projectGuid,
      event.data.newlyGeneratedProject
    );
  }

  render() {
    return (
      <SpinnerLayout>
        <div className="configuration-page">
          <div className="gradient-desk padding-bottom-xl">
            <div className="kk-container">
              <a href="/" className="logo-link">
                <img className="logo" src={KontentLogo} alt="Kentico Kontent logo" />
              </a>
            </div>
            <header>
              <div className="kk-container">
                <h1 className="headline-large">Sample Site—Configuration</h1>
                <p className="margin-top-xl">
                  For your sample app to work, you should have a Kontent
                  project containing content. Your app should be then configured
                  with its project ID. You can either get it by signing in using
                  your Kontent credentials or by signing up for a trial.
                  Later, it will be converted to a free plan.
                </p>
              </div>
            </header>
            <div className="kk-container">
              <section className="paper margin-top-xl">
                <h2 className="headline-medium">Get a Project ID</h2>
                <p className="margin-top-l">
                  You may wish to either select from existing projects or create a new
                  sample project. The app will be configured with its project ID.
                </p>
                <form onSubmit={this.openKenticoKontentProjectSelector}>
                  <input
                    type="submit"
                    className="button button-primary margin-top-xl"
                    value="Get Project ID from Kontent"
                  />
                </form>
              </section>
            </div>
            <div className="kk-container">
              <div className="row-lg row-lg--align-start">
                <section className="col paper margin-top-xl">
                  <h2 className="headline-medium">Set A Project ID Manually</h2>
                  <p className='margin-top-l'>
                    Alternatively, you can configure your app manually by submitting a
                    project ID below.
                  </p>
                  <form className='project-id-form margin-top-xl' onSubmit={this.handleSetProjectSubmit}>
                    <input
                      aria-label='Project ID'
                      autoComplete='off'
                      id="ProjectGuid"
                      name="ProjectGuid"
                      placeholder="Project ID"
                      type="text"
                      value={this.state.currentProjectInputValue}
                      onChange={this.handleProjectInputChange}
                      className="project-id-form__input text-box single-line"
                    />
                    <span className="field-validation-valid" data-valmsg-for="ProjectGuid" data-valmsg-replace="true"></span>
                    <input
                      type="submit"
                      className="button button-primary project-id-form__submit-button"
                      value="Submit"
                    />
                  </form>
                </section>
                <section className="col paper margin-top-xl">
                  <h2 className='headline-medium'>Use the Shared Project</h2>
                  <p className='margin-top-l'>
                    Alternatively, you may wish to use the shared project (project ID
                    "{defaultProjectId}
                    ").
                  </p>
                  <p className='margin-top-l'>
                    <strong>Note:</strong> You cannot edit content in the shared
                    project.
                  </p>
                  <input
                    type="submit"
                    className="button button-primary margin-top-xl"
                    value="Use the shared project"
                    onClick={() => this.setNewProjectId(defaultProjectId)}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      </SpinnerLayout>
    );
  }
}

export default withCookies(Configuration);
