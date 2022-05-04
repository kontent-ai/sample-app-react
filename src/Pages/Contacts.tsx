import React from 'react';
import { spinnerService } from '@simply007org/react-spinners';
import { useEffect, useState } from 'react';
import { Client } from '../Client';
import { createCafeModel } from '../Utilities/CafeListing';
import {
  defaultLanguage,
  initLanguageCodeObjectWithArray,
} from '../Utilities/LanguageCodes';
import { Cafe } from '../Models/cafe';
import { useIntl } from 'react-intl';
import { projectModel } from '../Models/_project';

const Contacts: React.FC = () => {
  const { locale: language, formatMessage } = useIntl();
  const [companyCafes, setCompanyCafes] = useState(
    initLanguageCodeObjectWithArray<Cafe>()
  );

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items<Cafe>()
      .type(projectModel.contentTypes.cafe.codename)
      .equalsFilter('elements.country', 'USA')
      .orderByDescending('system.name');

    if (language) {
      query.languageParameter(language);
    }

    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      spinnerService.hide('apiSpinner');
      setCompanyCafes((data) => ({
        ...data,
        [currentLanguage]: response.data.items as Cafe[],
      }));
    });
  }, [language]);

  if (companyCafes[language]?.length === 0) {
    return <div className="container" />;
  }

  const roastery = createCafeModel(companyCafes[language][0]);
  const roasteryComponent = (
    <div className="col-md-12">
      <h2 className="contact-title">
        {formatMessage({ id: 'Contacts.roasteryTitle' })}
      </h2>
      <ul className="contact-info">
        <li>{roastery.phone}</li>
        <li>
          <a href={'mailto:' + roastery.email} target="_top">
            {roastery.email}
          </a>
        </li>
        <li>
          <p>
            {roastery.dataAddress},<br />
            {roastery.zipCode}, {roastery.countryWithState}
            <br />
          </p>
        </li>
      </ul>
    </div>
  );

  const companyCafeComponents = companyCafes[language].map((cafe: Cafe) => {
    const model = createCafeModel(cafe);
    return (
      <div className="col-md-6 col-lg-3" key={cafe.system.codename}>
        <div
          className="cafe-tile js-scroll-to-map"
          data-address={model.dataAddress}
        >
          <div className="cafe-tile-content">
            <h3 className="cafe-tile-name">{model.name}</h3>
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
  return (
    <div className="container">
      {roasteryComponent}
      <div>
        <h2>{formatMessage({ id: 'Contacts.ourCafesTitle' })}</h2>
        <div className="row">{companyCafeComponents}</div>
      </div>
    </div>
  );
};

export default Contacts;
