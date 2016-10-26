# Dancing Goat SPA

## SUMMARY

Dancing Goat Single Page Application is a sample website utilizing Kentico Deliver service to manage and retrieve content.

## PREREQUISITIES

1. Latest version of NodeJS and npm. Both of these components can downloaded here: https://nodejs.org/en/download/ .
2. Account at https://app.kenticocloud.com with a sample project that is created automatically for every new subscription. You can read more about Kentico Deliver service activation here: https://kenticocloud.com/docs#enabling-kentico-deliver .

## CONTENT ADMINISTRATION

1. Navigate to https://app.kenticocloud.com in your browser.
2. Sign in with your credentials.
3. You are redirected to content administration interface of your sample project. For more details about the content editing, please see https://kenticocloud.com/docs .

## APPLICATION SETUP

1. Copy the Project ID from the https://app.kenticocloud.com . More details about getting Project ID: https://kenticocloud.com/docs#getting-project-id .
2. Insert the Project ID to the string value of the projectId constant in the 'src\Client.js' file. 
2. Navigate to the root folder of the application in the command line.
3. Type 'npm install' to install required npm packages.
4. Type 'npm start' to start development server.
5. The application should open in your browser.

## PREVIEW CONTENT

1. To preview the unpublished content you need to provide the Preview API key to the application.
2. Copy the Preview API key from the https://app.kenticocloud.com. For more details, please read: https://kenticocloud.com/docs#previewing-unpublished-content-using-deliver-api .
3. Insert the Preview API key to the string value of the previewApiKey constant in the 'src\Client.js' file.
4. If your application is running, you should immediately  see the unpublished version of the content. If not, please proceed with the steps from previous paragraph.

## CONTENT DELIVERY

The content can be reached either through REST API on URL: http://deliver.kenticocloud.com/PROJECT_ID/items, or through Deliver SDKs.

For more information about the Kentico Deliver REST API, please see http://docs.kenticodeliver.apiary.io .

You can find Deliver SDKs in our organization repositories here: https://github.com/Kentico .
