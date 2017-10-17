# Kentico Cloud sample JavaScript single-page application

 This is a sample website written in JavaScript utilizing the Kentico Cloud Delivery API to manage and retrieve content. You can register your account for free at <https://app.kenticocloud.com>.

## Application setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
2. Clone the sample application repository.
3. Navigate to the root folder of the application in the command line.
4. Type `npm install` to install required npm packages.
5. Type `npm start` to start a development server.
6. The application opens in your browser at <http://localhost:3000>.

After starting, the sample application retrieves content from the default Kentico Cloud sample project.

## Preview content from your project

If you already have a Kentico Cloud account and you want to connect the sample application to a project of your own, you need to provide your Project ID and your Preview API key to authorize requests to the Delivery Preview API. For example, you can connect the application to your modified version of the sample project.

To preview content in the sample application, follow these steps:

1. In Kentico Cloud, select your project.
2. Navigate to the Development section.
3. Copy your Project ID and Preview API key.
4. Open the `src\Client.js` file in the sample application folder.
5. Find the `projectId` and `previewApiKey` constants.
6. Change the values of the constants using the Project ID and Preview API key you copied.
7. Save the file.

When you now run the application, you will see all project content including the unpublished version of content items.

## Content administration

1. Navigate to <https://app.kenticocloud.com> in your browser.
2. Sign in with your credentials.
3. Manage content in the content administration interface of your sample project.

You can learn more about content editing with Kentico Cloud in the [documentation](http://help.kenticocloud.com/).

## Content delivery

You can retrieve content either through the Kentico Cloud Delivery SDKs or the Kentico Cloud Delivery API:

* For published content, use `https://deliver.kenticocloud.com/PROJECT_ID/items`.
* For unpublished content, use `https://preview-deliver.kenticocloud.com/PROJECT_ID/items`.

For more info about the API, see the [API reference](https://developer.kenticocloud.com/reference).

You can find the Delivery and other SDKs at <https://github.com/Kentico>.

## Tracking visitors and their activity

In single-page applications you have to use custom activities to track visitor activity. Here's an example of how to start tracking visits of About Us page:

1. In Kentico Cloud, select your project.
2. Navigate to the Development > API keys.
3. Copy your Project ID.
4. Open the `public\index.html` file in the sample application folder.
5. Find function `ket('start', '975bf280-fd91-488c-994c-2f04416e5ee3');` and replace it's second parameter with your Project ID.
6. Save the file.
7. Go back to Kentico Cloud and navigate to Development > Tracking.
8. Create a new custom activity and copy its codename.
9. Open the `src\Utilities\ActivityLogging.js` file in the sample application folder.
10. Find `Custom_Activity_Codename` and replace it with the codename you copied.
11. Save the file.

When you now run the application and visit the About Us page, you should be able to see your visit in Analytics of Kentico Cloud. You can also create a new dynamic segment of people who did the custom activity you created and see that the segment is not empty. It should contain you as an anonymous visitor. You can learn more about creating segments with Kentico Cloud in the [documentation](https://help.kenticocloud.com/contact-tracking-and-content-personalization/segments/creating-segments-of-your-visitors).
