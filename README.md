# Dancing Goat SPA

## SUMMARY

Dancing Goat Single Page Application is a sample website utilizing Kentico Deliver preproduction environment to retrieve content and Kentico Draft preproduction environment to manage the content.

## PREREQUISITIES

1. Latest version of NodeJS and npm (you can download both here: https://nodejs.org/en/download/ ).
2. Account at https://app.kenticocloud.com with sample project with Kentico Deliver activated (more about Kentico Deliver activation here: https://kenticocloud.com/docs#enabling-kentico-deliver ).

## CONTENT ADMINISTRATION

1. Navigate to https://app.kenticocloud.com in your browser.
2. Sign in with your credentials.
3. You are redirected to content administration interface of your Dancing Goat project. For more details about the content editing, please see https://kenticocloud.com/docs .

## APPLICATION SETUP

1. Copy the Project ID from the https://app.kenticocloud.com (more here: https://kenticocloud.com/docs#getting-project-id ) 
2. Insert the Project ID to the string value of the projectId constant in the 'src\Client.js' file. 
2. Navigate to the root folder of the application in the command line.
3. Type 'npm install' to install required npm packages.
4. Type 'npm start' to start development server.
5. The application should open in your browser.

## PREVIEW CONTENT

1. To preview the unpublished content you need to provide the Preview API key to the application.
2. Copy the Preview API key from the https://app.kenticocloud.com (more here: https://kenticocloud.com/docs#previewing-unpublished-content-using-deliver-api ) 
3. Insert the Preview API key to the string value of the previewApiKey constant in the 'src\Client.js' file.
4. If your application is running, you should immediately  see the unpublished version of the content. If not, please proceed with the steps from previous paragraph.

## CONTENT DELIVERY

1. The whole content can be reached through http://deliver.kenticocloud.com/<PROJECT_ID>/items URL, which is also a base URL for all the request on your project.
2. To read more about the Kentico Deliver API, please see http://docs.kenticodeliver.apiary.io/ .
