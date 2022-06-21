# Kontent sample React single-page application

[![Netlify Status](https://api.netlify.com/api/v1/badges/5018e8db-b76e-4f19-8ad2-7fd9da21a2ee/deploy-status)](https://app.netlify.com/sites/kontent-sample-app-react/deploys)
[![Live Demo](https://img.shields.io/badge/live-demo-brightgreen.svg)](https://kontent-sample-app-react.netlify.app/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-kontent)

This is a sample website written in Typescript utilizing the Kontent Delivery API to retrieve content from Kontent by Kentico. You can register your developer account at <https://app.kontent.ai>. For a brief walkthrough, check out [Running the React sample app](https://kontent.ai/learn/tutorials/develop-apps/get-started/run-the-react-sample-app) at Kontent Learn.

## Application setup

1. Install the latest version of NodeJS and npm. You can download both at <https://nodejs.org/en/download/>.
2. Clone the sample application repository.
3. Navigate to the root folder of the application in the command line.
4. Type `npm install` to install required npm packages.
5. Type `npm start` to start a development server.
6. The application opens in your browser at <http://localhost:3000>.

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

## About

This section describes the application.

### Used toolchain

This application is based on the [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) using the following template `--template typescript`.

### Model mapping and data fetching

There are two types of model mapping in this application:

#### content type -> DTO -> component

For generating component models from content types, we have used [Kontent.ai model generator](https://github.com/Kentico/kontent-model-generator-js) tool. All generated models can be found in `src/Models` folder. The `_project.ts` exports `projectModel` which contains information about the project structure such as project languages as well as other information such as codenames about content types. Generated models are used to obtain correctly typed objects via client.

#### content type -> DTO -> view model -> component

Some models displayed in views might require an adjustment from content types. For example, the `Cafe` content type contains fields for `city` and `street` and we would like to have a model containing an address in the format `city, street`. You can find an example for such a view model in `CafeModel.tsx` that can be found in the `src/ViewModels` folder. To convert `Cafe` into `CafeModel` you can use the function located in `src/Utilities/CafeListing.ts`


#### Data fetching

This solution fetches data using the [Delivery client](https://github.com/Kentico/kontent-delivery-sdk-js). For more implementation detail to set up the client see `src/Client.ts`. The data are fetched and stored in a `container` component directly in its state. Then they are passed to the `presentation` component. For a better understanding see the code example below. However, depending on your needs, you can use other technologies for managing application states such as:

- Context
- Redux
- Flux
- ...

```typescript
const Component: React.FC = () => {
    const [data, setData] = useState([] : DTOComponentProps);

    useEffect(() => {
      const query = Client.items<GeneratedDTO>()
          .type(projectModel.contentTypes.generatedDTO.codename)
          ...

      const items : GeneratedDTO[] = query.ToPromise()
          .then(data => data.items()
          .then(items => setData(items));
    }, []);

    return (
        {data.map(item => <DisplayItem dto={item}/>)}
    );
    ...
}
```

### Filtering in product catalog

Filters in Kontent.ai are implemented using taxonomies. Filtering examples can be found in `src/Components/BrewerStoreContainer.tsx` or `src/Components/CoffeeStoreContainer.tsx`. Firstly, the taxonomies groups that contain possible values for filters are loaded in `useEffect` blocks. We store selected values for filtering in `filter` variable. Items to be displayed are then selected with functional `filter` function checking whether the item matches the filter.

```tsx

interface FilterType {
  [index: string]: string[];
  filterVariable1: string[];
  filterVariable2: string[];
}

const Container: React.FC = () => {
    const [filterVariable1, setFilterVariable1] = useState<ITaxonomyTerms[]>([]);
      const [filterVariable2, setFilterVariable2] = useState<ITaxonomyTerms[]>([]);

      const [filter, setFilter] = useState<FilterType>({
          filterVariable1: [],
          filterVariable2: [],
      });

      useEffect(() => {
          Client.taxonomy('filter_variable_1')
            .toPromise()
            .then((response) => {setFilterVariable1(response.data.taxonomy.terms);});
      }, []);

      useEffect(() => {
          Client.taxonomy('filter_variable_2')
            .toPromise()
            .then((response) => {setFilterVariable2(response.data.taxonomy.terms);});
      }, []);

      const matches = (coffee: Coffee): boolean =>
          matchesTaxonomy(coffee, filter.processings, 'filterVariable1') &&
          matchesTaxonomy(coffee, filter.productStatuses, 'filterVariable2');
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
              onChange: (event) => toggleFilter('filterVariable1', event.target.id),
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

### Localization

In Kontent each language is identified by codename, in case of this project it is `en-US` and `es-ES`.

#### Resoure strings

Not every text of the application must be stored in Kontent.ai. Some strings, such as button texts, navigation texts and so on, can be stored locally. For those texts we use [React-intl](https://formatjs.io/docs/getting-started/installation/). For every language we have created JSON file in `src/Localization` folder. As we use `React-intl` it can not parse nested JSON objects and therefore the format of files is `key:value`. To load all files from `src/Localization` folder we have prepared a script, see `src/utilities/LocalizationLoader.ts`.

```json
// en-US.json
{
  "LatestArticles.title": "Latest articles",
  "LatestArticles.noTitleValue": "(Article has no title)",
  "LatestArticles.noTeaserValue": "(Article has no teaser image)",
  "LatestArticles.noSummaryValue": "No summary filled"
  // ...
}
```

#### Prefixes and Localizable Url slugs

The language prefix is obtained from URL in the `LocalizedApp.tsx` and then it is propagated via IntlProvider to the whole application. Content language is then adjusted by modifying `Client` with `languageParameter()` method to obtain items in specific language. By default it uses [language fallbacks](https://kontent.ai/learn/tutorials/manage-kontent/projects/set-up-languages/#a-language-fallbacks) set up in the project.

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

You might want to request items based on the url slugs. For more information how it works in Kontent see this [link](https://kontent.ai/learn/tutorials/develop-apps/get-content/localized-content-items/#a-get-items-by-localized-url-slug). We have provided an example in this application for `src/Pages/About.tsx' page.

### Handling 404

For the not found resources we use prefixed 404 pages for both languages. As the content in one page should be in one language, this approach might help you to optimize SEO. If language is not set in the URL the application uses the last used language, which is set in cookies.

## Deployment

You can use eg. [surge](http://surge.sh/) to deploy your app live. Check out the step-by-step guide on our [blog](https://kontent.ai/blog/3-steps-to-rapidly-deploy-headless-single-page-app).

## Wall of Fame

We would like to express our thanks to the following people who contributed and made the project possible:

- [Bee Martinez](https://github.com/beemtz)

Would you like to become a hero too? Pick an [issue](https://github.com/Kentico/kontent-sample-app-react/issues) and send us a pull request!
