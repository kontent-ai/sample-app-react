import { spinnerService } from '@simply007org/react-spinners';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Client } from '../Client';
import { matchesTaxonomy } from '../Utilities/CheckboxFilter';
import {
  defaultLanguage,
  initLanguageCodeObjectWithArray,
} from '../Utilities/LanguageCodes';
import BrewerStoreListing from './BrewerStoreListing';
import CheckboxFilter from './CheckboxFilter';
import { ITaxonomyTerms } from '@kentico/kontent-delivery';
import { useIntl } from 'react-intl';
import { Brewer } from '../Models/brewer';
import { projectModel } from '../Models/_project';

interface filterType {
  [index: string]: string[];
  manufacturers: string[];
  priceRanges: string[];
  productStatuses: string[];
}

const BrewerStoreContainer: React.FC = () => {
  const { formatMessage } = useIntl();

  const [brewers, setBrewers] = useState(
    initLanguageCodeObjectWithArray<Brewer>()
  );
  const { locale: language } = useIntl();

  const [manufacturers, setManufacturers] = useState<ITaxonomyTerms[]>([]);
  const priceRanges = [
    { min: 0, max: 50 },
    { min: 50, max: 250 },
    { min: 250, max: 5000 },
  ];
  const [productStatuses, setProductStatuses] = useState<ITaxonomyTerms[]>([]);

  const [filter, setFilter] = useState<filterType>({
    manufacturers: [],
    priceRanges: [],
    productStatuses: [],
  });

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items<Brewer>()
      .type(projectModel.contentTypes.brewer.codename)
      .orderByAscending('elements.product_name');

    if (language) {
      query.languageParameter(language);
    }

    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      spinnerService.hide('apiSpinner');
      setBrewers((data) => ({
        ...data,
        [currentLanguage]: response.data.items as Brewer[],
      }));
    });
  }, [language]);

  useEffect(() => {
    Client.taxonomy('manufacturer')
      .toPromise()
      .then((response) => {
        setManufacturers(response.data.taxonomy.terms);
      });
  }, []);

  useEffect(() => {
    Client.taxonomy('product_status')
      .toPromise()
      .then((response) => {
        setProductStatuses(response.data.taxonomy.terms);
      });
  }, []);

  const matches = (brewer: Brewer): boolean =>
    matchesTaxonomy(brewer, filter.manufacturers, 'manufacturer') &&
    matchesPriceRanges(brewer) &&
    matchesTaxonomy(brewer, filter.productStatuses, 'productStatus');

  const matchesPriceRanges = (brewer: Brewer): boolean => {
    if (filter.priceRanges.length === 0) {
      return true;
    }
    const price = brewer.elements.price.value!!;
    const ranges = filter.priceRanges.map((priceRange) => ({
      min: +priceRange.split('-')[0],
      max: +priceRange.split('-')[1],
    }));

    return ranges.some(
      (priceRange) => priceRange.min <= price && price <= priceRange.max
    );
  };

  const formatPrice = (price: number, language: string): string => {
    return price.toLocaleString(language, {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    });
  };

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
            {formatMessage({ id: 'BrewerStoreContainer.manufacturerTitle' })}
          </h4>
          <CheckboxFilter
            options={manufacturers.map((manufacturer) => {
              return {
                id: manufacturer.codename,
                checked: filter.manufacturers.includes(manufacturer.codename),
                label: manufacturer.name,
                onChange: (event) =>
                  toggleFilter('manufacturers', event.target.id),
              };
            })}
          />
          <h4>{formatMessage({ id: 'BrewerStoreContainer.priceTitle' })}</h4>
          <CheckboxFilter
            options={priceRanges.map((priceRange) => {
              const priceRangeId = `${priceRange.min}-${priceRange.max}`;
              return {
                id: priceRangeId,
                checked: filter.priceRanges.includes(priceRangeId),
                label: `${formatPrice(
                  priceRange.min,
                  language
                )} - ${formatPrice(priceRange.max, language)}`,
                onChange: (event) =>
                  toggleFilter('priceRanges', event.target.id),
              };
            })}
          />
          <h4>{formatMessage({ id: 'BrewerStoreContainer.statusTitle' })}</h4>
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
        <BrewerStoreListing
          brewers={brewers[language].filter((brewer: Brewer) =>
            matches(brewer)
          )}
        />
      </div>
    </div>
  );
};

export default BrewerStoreContainer;
