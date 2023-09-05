# Kontent.ai sample React single-page application

[![Netlify Status](https://api.netlify.com/api/v1/badges/5018e8db-b76e-4f19-8ad2-7fd9da21a2ee/deploy-status)](https://app.netlify.com/sites/kontent-sample-app-react/deploys)
[![Live Demo](https://img.shields.io/badge/live-demo-brightgreen.svg)](https://kontent-sample-app-react.netlify.app/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kontent-ai)

This is a sample website written in Typescript utilizing the Kontent.ai Delivery API to retrieve content from Kontent.ai. You can register your developer account at <https://app.kontent.ai>. For a brief walkthrough, check out [Running the React sample app](https://kontent.ai/learn/tutorials/develop-apps/get-started/run-the-react-sample-app) at Kontent.ai Learn.

## Application setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
2. Clone the sample application repository.
3. Navigate to the root folder of the application in the command line.
4. Type `npm install` to install required npm packages.
5. Type `npm start` to start a development server.
6. The application opens in your browser at <http://localhost:3000>.

### Connecting to your sample project

At the first run of the app, you'll be presented with a configuration page. It will allow you to connect the app to your Kontent.ai project or create a new one. You'll also be able to start a trial and convert to a free plan when the trial expires.

Alternatively, you can connect your project manually as per the chapter below.

#### Connecting to your project manually

If you want to change the source Kontent.ai project, follow these steps:

1. In Kontent.ai, choose Project settings from the app menu.
2. Under Development, choose API keys.
3. Copy your Environemnt ID.
4. Open `.env.example` in the root directory.
5. Replace `your_environment_id` with your Environment ID and remove `REACT_APP_PREVIEW_API_KEY` entry.
6. Save and rename the file `.env`.

When you now run the sample application, the application retrieves content from your project.

## Get creative

Deploy, explore and change the app directly in the browser.

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/clone-from-repo?REPO_URL=https://github.com/kontent-ai/sample-app-react)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kontent-ai/sample-app-react)

## Previewing content from your project

If you already have a Kontent.ai account and you want to connect the sample application to a project of your own, you need to provide your Environment ID and your Preview API key to authorize requests to the Delivery Preview API. For example, you can connect the application to your modified version of the sample project.

To preview content in the sample application, follow these steps:

1. In Kontent.ai, choose Project settings from the app menu.
2. Under Development, choose API keys.
3. Copy your Environemnt ID and Preview API key.
4. Open `.env.example` in the root directory .
5. Replace `your_environment_id` and `your_api_key` with your Environment ID and Preview API key.
6. Save and rename the file `.env`.

When you now run the application, you will see all project content including the unpublished version of content items.

## Content administration

1. Navigate to <https://app.kontent.ai> in your browser.
2. Sign in with your credentials.
3. Manage content in the content administration interface of your sample project.

You can learn more about content editing in our tutorials at [Kontent.ai Learn](https://kontent.ai/learn/tutorials/write-and-collaborate/create-content/introducing-content-items).

## Content delivery

You can retrieve content either through the Kontent.ai Delivery SDKs or the Kontent.ai Delivery API:

- For published content, use `https://deliver.kontent.ai/ENVIRONMENT_ID/items`.
- For unpublished content, use `https://preview-deliver.kontent.ai/ENVIRONMENT_ID/items`.

For more info about the API, see the [API reference](https://kontent.ai/learn/reference).

You can find the Delivery and other SDKs at <https://github.com/kontent-ai>.

## Used toolchain

This application is based on the [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) using the following template `--template typescript`.

## Model mapping and data fetching

There are two types of model mapping in this application:

### content type -> DTO -> component

Content type definitions are being generated from content types via [Kontent.ai model generator](https://github.com/kontent-ai/model-generator-js) tool. All generated types can be found in `src/Models` folder. The `_project.ts` contains information about the project structure such as project languages as well as other structure information like codenames about content types.

### content type -> DTO -> view model -> component

Some models displayed in views might require an adjustment from content types. For example, the `Cafe` content type contains fields for `city` and `street` and we would like to have a model containing an address in the format `city, street`. An example of such a view model is in `CafeModel.tsx` that can be found in the `src/ViewModels` folder. To convert `Cafe` into `CafeModel` the function located in `src/Utilities/CafeListing.ts` can be used.

### Data fetching

This solution fetches data using the [Delivery client](https://github.com/kontent-ai/delivery-sdk-js). For more implementation detail to set up the client see `src/Client.ts`. The data are fetched and stored in a `container` component directly in its state. Then they are passed to the `presentation` component. For a better understanding see the code example below. However, depending on your needs, you can use other technologies for managing application states such as:

- [Context](https://reactjs.org/docs/context.html)
- [Redux](https://react-redux.js.org/)
- [Flux](https://facebook.github.io/flux/)
- ...

```tsx
const Component: React.FC = () => {
    const [data, setData] = useState<GeneratedDTO[]>([]);


    useEffect(() => {
      const query = Client.items<GeneratedDTO>()
          .type(projectModel.contentTypes.generatedDTO.codename)
          ...

      query.ToPromise()
          .then(data => setData(data.items));
    }, []);

    return (
        {data.map(item => <DisplayItem dto={item}/>)}
    );
    ...
}
```

## Filtering by taxonomy

Filters in Kontent.ai are implemented using taxonomies. Filtering examples can be found in `src/Components/BrewerStoreContainer.tsx` or `src/Components/CoffeeStoreContainer.tsx`. Firstly, the taxonomies groups that contain possible values for filters are loaded in `useEffect` blocks. Selected values for filtering are stored in the `filter` variable. Items to be displayed are then selected with the functional `filter` function checking whether the item matches the filter.

```tsx

interface FilterType {
  [index: string]: string[];
  processings: string[];
  productStatuses: string[];
}

const Container: React.FC = () => {
    const [processings, setProcessings] = useState<ITaxonomyTerms[]>([]);
      const [productStatuses, setProductStatuses] = useState<ITaxonomyTerms[]>([]);

      const [filter, setFilter] = useState<FilterType>({
          processings: [],
          productStatuses: [],
      });

      useEffect(() => {
          Client.taxonomy('processings')
            .toPromise()
            .then((response) => {setProcessings(response.data.taxonomy.terms);});
      }, []);

      useEffect(() => {
          Client.taxonomy('product_status')
            .toPromise()
            .then((response) => {setProductStatuses(response.data.taxonomy.terms);});
      }, []);

      const matches = (coffee: Coffee): boolean =>
          matchesTaxonomy(coffee, filter.processings, 'processings') &&
          matchesTaxonomy(coffee, filter.productStatuses, 'productStatuses');
      // To see how matchesTaxonomy can work see src/Utilities/CheckboxFilter

      const toggleFilter = (filterName: string, filterValue: string): void => {
          setFilter((filter) => ({
            ...filter,
            [filterName]: filter[filterName].includes(filterValue)
            ? filter[filterName].filter((x: string) => x !== filterValue)
            : [...filter[filterName], filterValue],
            }));
      };.

      return (
          <div>
              ...
              <CheckboxFilter
              ...
              onChange: (event) => toggleFilter('processings', event.target.id),
              />
           ...
              <ItemListing
               items={ items[language].filter((item: ItemDTO) =>matches(coffee)) }
               />
           ...
           </div>
      );
}
```

## Localization

In Kontent.ai each language is identified by codename, in case of this project, it is `en-US` and `es-ES`.

### Resource strings

Not every text of the application must be stored in Kontent.ai. Some strings, such as button texts, navigation texts, and so on, can be stored directly in the application. For those texts [React-intl](https://formatjs.io/docs/getting-started/installation/) is used. For every language, there is a JSON file in `src/Localization` folder.

> `React-intl` can not parse nested JSON objects and therefore the format of files is `key:value`. To load all files from `src/Localization` folder there is a `src/utilities/LocalizationLoader.ts` script.

```jsonc
// en-US.json
{
  "LatestArticles.title": "Latest articles",
  "LatestArticles.noTitleValue": "(Article has no title)",
  "LatestArticles.noTeaserValue": "(Article has no teaser image)",
  "LatestArticles.noSummaryValue": "No summary filled"
  // ...
}
```

### Language prefixes

The language prefix is obtained from the URL in the `LocalizedApp.tsx` and then it is propagated via IntlProvider to the whole application. Content language is then adjusted by modifying `Client` with `languageParameter()` method to obtain items in a specific language. By default it uses [language fallbacks](https://kontent.ai/learn/tutorials/manage-kontent/projects/set-up-languages/#a-language-fallbacks) set up in the project.

```typescript
const Component: React.FC = () => {
  const { locale: language } = useIntl();

  useEffect(() => {
    const query = Client.items<ItemDTO>()
      .type(projectModel.contentTypes.itemDTO.codename);

    if (language) {
      query.languageParameter(language);
    }
    ...
```

### Localizable URL slugs

You might want to request items based on the URL slugs. For more information check out [Kontent.ai/learn tutorial](https://kontent.ai/learn/tutorials/develop-apps/get-content/localized-content-items/#a-get-items-by-localized-url-slug). An example in this application for this is provided in `src/Pages/About.tsx` page.

> The showcase is not ideal, because it is using a combination of the language prefixes and localizable routes. You should try to stick with one of the approaches. Because it is hard to define the behavior (priority) for language setting clashes like `/<EN-PREFIX>/articles/<ES-URL-SLUG>.

### Language fallbacks

To deal with content that is not available in current language, this project uses method called language fallbacks. It will fetch the content in the language which set as fallback language in the Kontent.ai project and redirect the website to the URL with prefix of the given language. However, it is possible to disable language fallbacks by adding a filter of `system.language` to your query. For more information about getting localized content check this [`link.`](https://kontent.ai/learn/tutorials/develop-apps/get-content/localized-content-items/?tech=javascript)

```js
var query = Client.items<AboutUs>().type(contentTypes.about_us.codename);

if (this.language) {
    query
    .languageParameter(this.language)
    .equalsFilter('system.language', 'es-ES');
}
```

## Handling 404

For the not found resources, prefixed 404 pages are used for both languages. As the content on one page should be in one language, this approach might help you to optimize SEO. If language is not set in the URL the application uses the last used language, which is set in cookies.

## Smart Links

Pages have [Smart Link](https://github.com/kontent-ai/smart-link) data attributes to create edit links when in preview mode. To enable Smart Links, you will need to [configure previews within your Kontent environment](https://kontent.ai/learn/docs/preview/preview-configuration/typescript). The application will render Smart Links when it recognizes it's in preview mode. This is done by providing the environment variable `REACT_APP_PREVIEW_API_KEY` in a `.env` file.

## Deployment

You can use eg. [surge](http://surge.sh/) to deploy your app live. Check out the step-by-step guide on our [blog](https://kontent.ai/blog/3-steps-to-rapidly-deploy-headless-single-page-app).

## Wall of Fame

We would like to express our thanks to the following people who contributed and made the project possible:

- [Bee Martinez](https://github.com/beemtz)

Would you like to become a hero too? Pick an [issue](https://github.com/kontent-ai/delivery-sdk-js/issues) and send us a pull request!
