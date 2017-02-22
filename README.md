# Kentico Cloud sample JavaScript single-page application

 Dancing Goat is a sample website written in JavaScript utilizing the Kentico Cloud Delivery API to manage and retrieve content.

## Prerequisites

1. Latest version of NodeJS and npm. You can download both at https://nodejs.org/en/download/.
2. A Kentico Cloud account. You can register at https://app.kenticocloud.com.

## Content administration

1. Navigate to https://app.kenticocloud.com in your browser.
2. Sign in with your credentials.
3. Manage content in the content administration interface of your sample project.

You can learn more about content editing with Kentico Cloud in the [documentation](http://help.kenticocloud.com/).

## Application setup

1. In Kentico Cloud, navigate to the Development section and copy the ID of your project.
2. Open the `src\Client.js` file.
3. Find the `projectId` constant and paste the Project ID as its value.
3. Save the changes.
4. Navigate to the root folder of the application in the command line.
5. Type `npm install` to install required npm packages.
6. Type `npm start` to start a development server.
7. The application opens in your browser at http://localhost:3000.

## Preview content
For previewing content that is not yet published, you need to provide the Preview API key to the application.

1. In Kentico Cloud, navigate to the Development section and copy the Preview API key for the Delivery API.
2. Open the `src\Client.js` file.
3. Find the `previewApiKey` constant and paste the Preview API key as its value.
4. Save the changes.
5. If the application is running, you will see the unpublished version of the content. If not, please follow the **Application setup** section.

## Content delivery

You can retrieve content either through the Kentico Cloud Delivery SDKs or the Kentico Cloud Delivery API:
* For published content, use `https://deliver.kenticocloud.com/PROJECT_ID/items`.
* For unpublished content, use `https://preview-deliver.kenticocloud.com/PROJECT_ID/items`.

For more info about the API, see the [API reference](http://docs.kenticodeliver.apiary.io).

You can find the Delivery and other SDKs at https://github.com/Kentico.