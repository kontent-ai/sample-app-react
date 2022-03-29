# Kontent sample React single-page application

[![Netlify Status](https://api.netlify.com/api/v1/badges/5018e8db-b76e-4f19-8ad2-7fd9da21a2ee/deploy-status)](https://app.netlify.com/sites/kontent-sample-app-react/deploys)
[![Live Demo](https://img.shields.io/badge/live-demo-brightgreen.svg)](https://kontent-sample-app-react.netlify.app/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-kontent)

This is a sample website written in JavaScript utilizing the Kontent Delivery API to manage and retrieve content from Kontent by Kentico. You can register your account for free at <https://app.kontent.ai>. For a brief walkthrough, check out [Running the React sample app](https://kontent.ai/learn/tutorials/develop-apps/get-started/run-the-react-sample-app) at Kontent Learn.

## Application setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
2. Clone the sample application repository.
3. Navigate to the root folder of the application in the command line.
4. Type `npm install` to install required npm packages.
5. Type `npm start` to start a development server.
6. The application opens in your browser at <http://localhost:3000>.

After starting, the sample application retrieves content from the **default** Kontent sample project.

### Connecting to your sample project

At the first run of the app, you'll be presented with a configuration page. It will allow you to connect the app to your Kontent project or create a new one. You'll also be able to start a trial and convert to a free plan when the trial expires.

Alternatively, you can connect your project manually as per the chapter below.

#### Connecting to your project manually

If you want to change the source Kontent project, follow these steps:

1. In Kontent, choose Project settings from the app menu.
2. Under Development, choose API keys.
3. Copy your Project ID.
4. Open `.env.example` in the root directory.
5. Replace `your_project_id` with your Project ID and remove `REACT_APP_PREVIEW_API_KEY` entry.
6. Save and rename the file `.env`.

When you now run the sample application, the application retrieves content from your project.

## Get creative

Deploy, explore and change the app directly in the browser.

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/clone-from-repo?REPO_URL=https://github.com/Kentico/kontent-sample-app-react)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Kentico/kontent-sample-app-react)

## Previewing content from your project

If you already have a Kontent account and you want to connect the sample application to a project of your own, you need to provide your Project ID and your Preview API key to authorize requests to the Delivery Preview API. For example, you can connect the application to your modified version of the sample project.

To preview content in the sample application, follow these steps:

1. In Kontent, choose Project settings from the app menu.
2. Under Development, choose API keys.
3. Copy your Project ID and Preview API key.
4. Open `.env.example` in the root directory .
5. Replace `your_project_id` and `your_api_key` with your Project ID and Preview API key.
6. Save and rename the file `.env`.

When you now run the application, you will see all project content including the unpublished version of content items.

## Content administration

1. Navigate to <https://app.kontent.ai> in your browser.
2. Sign in with your credentials.
3. Manage content in the content administration interface of your sample project.

You can learn more about content editing in our tutorials at [Kontent Learn](https://kontent.ai/learn/tutorials/write-and-collaborate/create-content/introducing-content-items).

## Content delivery

You can retrieve content either through the Kontent Delivery SDKs or the Kontent Delivery API:

- For published content, use `https://deliver.kontent.ai/PROJECT_ID/items`.
- For unpublished content, use `https://preview-deliver.kontent.ai/PROJECT_ID/items`.

For more info about the API, see the [API reference](https://kontent.ai/learn/reference).

You can find the Delivery and other SDKs at <https://github.com/Kentico>.

## Deployment

You can use eg. [surge](http://surge.sh/) to deploy your app live. Check out the step-by-step guide on our [blog](https://kontent.ai/blog/3-steps-to-rapidly-deploy-headless-single-page-app).

## Wall of Fame

We would like to express our thanks to the following people who contributed and made the project possible:

- [Bee Martinez](https://github.com/beemtz)

Would you like to become a hero too? Pick an [issue](https://github.com/Kentico/kontent-sample-app-react/issues) and send us a pull request!

