import { spinnerService } from '@simply007org/react-spinners';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { translate } from 'react-translate';
import { Client } from '../Client';
import { matchesTaxonomy } from '../Utilities/CheckboxFilter';
import { defaultLanguage, initLanguageCodeObject } from '../Utilities/LanguageCodes';
import BrewerStoreListing from './BrewerStoreListing';
import CheckboxFilter from './CheckboxFilter';

const BrewerStoreContainer = ({ language, t }) => {
  const [brewers, setBrewers] = useState(initLanguageCodeObject());

  const [manufacturers, setManufacturers] = useState([]);
  const priceRanges = [
    { min: 0, max: 50 },
    { min: 50, max: 250 },
    { min: 250, max: 5000 }
  ];
  const [productStatuses, setProductStatuses] = useState([]);

  const [filter, setFilter] = useState({
    manufacturers: [],
    priceRanges: [],
    productStatuses: []
  });

  useEffect(() => {
    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('brewer')
      .orderByAscending('elements.product_name');

    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {
        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setBrewers(data => ({
          ...data,
          [currentLanguage]: response.data.items
        }));
      });
  }, [language]);

  useEffect(() => {

    Client.taxonomy('manufacturer')
      .toPromise()
      .then(response => {
        setManufacturers(response.data.taxonomy.terms);
      });
  }, []);

  useEffect(() => {
    Client.taxonomy('product_status')
      .toPromise()
      .then(response => {
        setProductStatuses(response.data.taxonomy.terms);
      });
  }, []);

  const matches = (brewer) => (
    matchesTaxonomy(brewer, filter.manufacturers, "manufacturer")
    && matchesPriceRanges(brewer)
    && matchesTaxonomy(brewer, filter.productStatuses, "productStatus")
  );

  const matchesPriceRanges = (brewer) => {
    if (filter.priceRanges.length === 0) {
      return true;
    }
    const price = brewer.elements.price.value;
    const ranges = filter.priceRanges.map(priceRange => ({
      min: priceRange.split("-")[0],
      max: priceRange.split("-")[1],
    }));

    return ranges.some(
      priceRange => priceRange.min <= price && price <= priceRange.max
    );
  };

  const formatPrice = (price, language) => {
    return price.toLocaleString(language, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    });
  };

  const toggleFilter = (filterName, filterValue) => {
    setFilter(filter => ({
      ...filter,
      [filterName]: filter[filterName].includes(filterValue)
        ? filter[filterName].filter(x => x !== filterValue)
        : [...filter[filterName], filterValue]
    }));
  }

  return (
    <div className="product-page row">
      <div className="flex">
        <aside className="col-md-4 col-lg-3 product-filter">
          <h4>{t('manufacturerTitle')}</h4>
          <CheckboxFilter options={manufacturers.map((manufacturer) => {
            return {
              id: manufacturer.codename,
              checked: filter.manufacturers.includes(manufacturer.codename),
              label: manufacturer.name,
              onChange: (event) => toggleFilter('manufacturers', event.target.id)
            }
          })} />
          <h4>{t('priceTitle')}</h4>
          <CheckboxFilter options={priceRanges.map((priceRange) => {
            const priceRangeId = `${priceRange.min}-${priceRange.max}`;
            return {
              id: priceRangeId,
              checked: filter.priceRanges.includes(priceRangeId),
              label: `${formatPrice(priceRange.min, language)} - ${formatPrice(priceRange.max, language)}`,
              onChange: (event) => toggleFilter('priceRanges', event.target.id)
            };
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
        <BrewerStoreListing language={language} brewers={brewers[language].filter(brewer => matches(brewer))} />
      </div>
    </div>
  );
};

export default translate("BrewerStoreContainer")(BrewerStoreContainer);
