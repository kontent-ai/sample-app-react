import { spinnerService } from '@simply007org/react-spinners';
import React, { useEffect, useState } from 'react';
import { matchesTaxonomy } from '../Utilities/CheckboxFilter';
import {
  defaultLanguage,
  initLanguageCodeObjectWithArray,
} from '../Utilities/LanguageCodes';
import CheckboxFilter from './CheckboxFilter';
import CoffeeStoreListing from './CoffeeStoreListing';
import { ITaxonomyTerms } from '@kontent-ai/delivery-sdk';
import { useIntl } from 'react-intl';
import { Coffee } from '../Models/content-types/coffee';
import { contentTypes } from '../Models/project/contentTypes';
import { useClient } from '../Client';
import { useKontentSmartLink } from '../Utilities/SmartLink';

interface filterType {
  [index: string]: string[];
  processings: string[];
  productStatuses: string[];
}

const CoffeeStoreContainer: React.FC = () => {
  const [coffees, setCoffees] = useState(
    initLanguageCodeObjectWithArray<Coffee>()
  );
  const [processings, setProcessings] = useState<ITaxonomyTerms[]>([]);
  const [productStatuses, setProductStatuses] = useState<ITaxonomyTerms[]>([]);
  const { locale: language, formatMessage } = useIntl();

  const [filter, setFilter] = useState<filterType>({
    processings: [],
    productStatuses: [],
  });

  const [Client] = useClient();

  useKontentSmartLink([language, coffees, processings, productStatuses, filter]);

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items<Coffee>()
      .type(contentTypes.coffee.codename)
      .orderByAscending('elements.product_name');

    if (language) {
      query.languageParameter(language);
    }

    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      spinnerService.hide('apiSpinner');
      setCoffees((data) => ({
        ...data,
        [currentLanguage]: response.data.items as Coffee[],
      }));
    });
  }, [language, Client]);

  useEffect(() => {
    Client.taxonomy('processing')
      .toPromise()
      .then((response) => {
        setProcessings(response.data.taxonomy.terms);
      });
  }, [Client]);

  useEffect(() => {
    Client.taxonomy('product_status')
      .toPromise()
      .then((response) => {
        setProductStatuses(response.data.taxonomy.terms);
      });
  }, [Client]);

  const matches = (coffee: Coffee): boolean =>
    matchesTaxonomy(coffee, filter.processings, 'processing') &&
    matchesTaxonomy(coffee, filter.productStatuses, 'productStatus');

  const toggleFilter = (filterName: string, filterValue: string): void => {
    setFilter((filter) => ({
      ...filter,
      [filterName]: filter[filterName].includes(filterValue)
        ? filter[filterName].filter((x: string) => x !== filterValue)
        : [...filter[filterName], filterValue],
    }));
  };

  return (
    <div className="product-page row">
      <div className="flex">
        <aside className="col-md-4 col-lg-3 product-filter">
          <h4>
            {formatMessage({
              id: 'CoffeeStoreContainer.coffeeProcessingTitle',
            })}
          </h4>
          <CheckboxFilter
            options={processings.map((processing) => {
              return {
                id: processing.codename,
                checked: filter.processings.includes(processing.codename),
                label: processing.name,
                onChange: (event) =>
                  toggleFilter('processings', event.target.id),
              };
            })}
          />
          <h4>{formatMessage({ id: 'CoffeeStoreContainer.statusTitle' })}</h4>
          <CheckboxFilter
            options={productStatuses.map((productStatus) => {
              return {
                id: productStatus.codename,
                checked: filter.productStatuses.includes(
                  productStatus.codename
                ),
                label: productStatus.name,
                onChange: (event) =>
                  toggleFilter('productStatuses', event.target.id),
              };
            })}
          />
        </aside>
        <CoffeeStoreListing
          coffees={coffees[language].filter((coffee: Coffee) =>
            matches(coffee)
          )}
        />
      </div>
    </div>
  );
};

export default CoffeeStoreContainer;
