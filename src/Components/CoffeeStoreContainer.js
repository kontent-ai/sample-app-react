import { spinnerService } from '@simply007org/react-spinners';
import React, { useEffect, useState } from 'react';
import { translate } from 'react-translate';
import { Client } from '../Client';
import { matchesTaxonomy } from '../Utilities/CheckboxFilter';
import { defaultLanguage, initLanguageCodeObject } from '../Utilities/LanguageCodes';
import CheckboxFilter from './CheckboxFilter';
import CoffeeStoreListing from './CoffeeStoreListing';

const CoffeeStoreContainer = ({ language, t }) => {
  const [coffees, setCoffees] = useState(initLanguageCodeObject());
  const [processings, setProcessings] = useState([]);
  const [productStatuses, setProductStatuses] = useState([]);

  const [filter, setFilter] = useState({
    processings: [],
    productStatuses: []
  });

  useEffect(() => {
    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('coffee')
      .orderByAscending('elements.product_name');

    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {
        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setCoffees(data => ({
          ...data,
          [currentLanguage]: response.data.items
        }));
      });
  }, [language]);

  useEffect(() => {
    Client.taxonomy('processing')
      .toPromise()
      .then(response => {
        setProcessings(response.data.taxonomy.terms);
      });
  }, []);

  useEffect(() => {
    Client.taxonomy('product_status')
      .toPromise()
      .then(response => {
        setProductStatuses(response.data.taxonomy.terms);
      });
  }, []);

  const matches = (coffee) => (
    matchesTaxonomy(coffee, filter.processings, "processing")
    && matchesTaxonomy(coffee, filter.productStatuses, "productStatus")
  );

  const toggleFilter = (filterName, filterValue) => {
    setFilter(filter => ({
      ...filter,
      [filterName]: filter[filterName].includes(filterValue)
        ? filter[filterName].filter(x => x !== filterValue)
        : [...filter[filterName], filterValue]
    }));
  };

  return (
    <div className="product-page row">
      <div className="flex">
        <aside className="col-md-4 col-lg-3 product-filter">
          <h4>{t('coffeeProcessingTitle')}</h4>
          <CheckboxFilter options={processings.map((processing) => {
            return {
              id: processing.codename,
              checked: filter.processings.includes(processing.codename),
              label: processing.name,
              onChange: (event) => toggleFilter('processings', event.target.id)
            }
          })} />
          <h4>{t('statusTitle')}</h4>
          <CheckboxFilter options={productStatuses.map((productStatus) => {
            return {
              id: productStatus.codename,
              checked: filter.productStatuses.includes(productStatus.codename),
              label: productStatus.name,
              onChange: (event) => toggleFilter('productStatuses', event.target.id)
            }
          })} />
        </aside>
        <CoffeeStoreListing language={language} coffees={coffees[language].filter(coffee => matches(coffee))} />
      </div>
    </div>
  );
};

export default translate("CoffeeStoreContainer")(CoffeeStoreContainer);
