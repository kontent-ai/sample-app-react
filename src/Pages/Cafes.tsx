import React from 'react';
import { spinnerService } from '@simply007org/react-spinners';
import { useEffect, useState } from 'react';
import { Client } from '../Client';
import { createCafeModel } from '../Utilities/CafeListing';
import {
  defaultLanguage,
  ILanguageObjectWithArray,
  initLanguageCodeObjectWithArray,
} from '../Utilities/LanguageCodes';
import { Cafe } from '../Models/cafe';
import { useIntl } from 'react-intl';
import { projectModel } from '../Models/_project';
import { CafeModel } from '../ViewModels/CafeModel';

const Cafes: React.FC = () => {
  const { formatMessage, locale: language } = useIntl();
  const [cafes, setCafes] = useState<ILanguageObjectWithArray<Cafe>>(
    initLanguageCodeObjectWithArray()
  );

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items()
      .type(projectModel.contentTypes.cafe.codename)
      .orderByDescending('system.name');

    if (language) {
      query.languageParameter(language);
    }

    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      spinnerService.hide('apiSpinner');
      setCafes((data) => ({
        ...data,
        [currentLanguage]: response.data.items as Cafe[],
      }));
    });
  }, [language]);

  if (cafes[language].length === 0) {
    return <div className="container" />;
  }
  const companyCafes = cafes[language].filter(
    (cafe: Cafe) => cafe.elements.country.value === 'USA'
  );
  const partnerCafes = cafes[language].filter(
    (cafe: Cafe) => cafe.elements.country.value !== 'USA'
  );

  const companyCafeComponents = companyCafes.map((cafe: Cafe) => {
    const model = createCafeModel(cafe);

    return (
      <div className="col-md-6" key={cafe.system.codename}>
        <div
          className="cafe-image-tile js-scroll-to-map"
          data-address={model.dataAddress}
        >
          <div
            className="cafe-image-tile-image-wrapper"
            style={{
              backgroundImage: model.imageLink,
              backgroundSize: 'cover',
              backgroundPosition: 'right',
            }}
          />
          <div className="cafe-image-tile-content">
            <h3 className="cafe-image-tile-name">{model.name}</h3>
            <address className="cafe-tile-address">
              <span key={model.name} className="cafe-tile-address-anchor">
                {model.street}, {model.city}
                <br />
                {model.zipCode}, {model.countryWithState}
              </span>
            </address>
            <p>{model.phone}</p>
          </div>
        </div>
      </div>
    );
  });

  const partnerCafeModels = partnerCafes.map((cafe: Cafe) =>
    createCafeModel(cafe)
  );

  const partnerCafeLocations = partnerCafeModels
    .map((model: CafeModel) => model.location)
    .reduce((result: string[], location: string) => {
      if (result.indexOf(location) < 0) {
        result.push(location);
      }
      return result;
    }, [])
    .sort();

  const partnerCafeComponents = partnerCafeLocations.map((location: string) => {
    const locationPartnerCafes = partnerCafeModels
      .filter((model: CafeModel) => model.location === location)
      .map((model: CafeModel, modelIndex: number) => {
        return (
          <p key={modelIndex}>
            {model.name}, {model.street}, {model.phone}
          </p>
        );
      });

    return (
      <div key={location}>
        <h3>{location}</h3>
        {locationPartnerCafes}
      </div>
    );
  });

  return (
    <div className="container">
      <h2>{formatMessage({ id: 'Cafes.ourCafesTitle' })}</h2>
      <div className="row">{companyCafeComponents}</div>
      <h2>{formatMessage({ id: 'Cafes.partnerCafesTitle' })}</h2>
      <div className="row">{partnerCafeComponents}</div>
    </div>
  );
};

export default Cafes;
