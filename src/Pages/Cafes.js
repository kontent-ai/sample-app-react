import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { translate } from "react-translate";
import { Client } from "../Client";
import { createCafeModel } from "../Utilities/CafeListing";
import { defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";

const Cafes = ({ language, t }) => {

  const [cafes, setCafes] = useState(initLanguageCodeObject());

  useEffect(() => {
    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('cafe')
      .orderByDescending('system.name')

    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {

        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setCafes(data => ({
          ...data,
          [currentLanguage]: response.data.items
        }));
      });
  }, [language]);

  if (cafes[language].length === 0) {
    return (<div className="container" />);
  }
  const companyCafes = cafes[language].filter(cafe => cafe.elements.country.value === 'USA');
  const partnerCafes = cafes[language].filter(cafe => cafe.elements.country.value !== 'USA');

  const companyCafeComponents = companyCafes.map((cafe) => {
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
              backgroundPosition: 'right'
            }}
          />
          <div className="cafe-image-tile-content">
            <h3 className="cafe-image-tile-name">{model.name}</h3>
            <address className="cafe-tile-address">
              <span name={model.name} className="cafe-tile-address-anchor">
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

  const partnerCafeModels = partnerCafes.map((cafe) => createCafeModel(cafe));

  const partnerCafeLocations = partnerCafeModels
    .map(model => model.location)
    .reduce((result, location) => {
      if (result.indexOf(location) < 0) {
        result.push(location);
      }
      return result;
    }, [])
    .sort();

  const partnerCafeComponents = partnerCafeLocations.map((location) => {
    let locationPartnerCafes = partnerCafeModels
      .filter(model => model.location === location)
      .map((model, modelIndex) => {
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
      <h2>{t('ourCafesTitle')}</h2>
      <div className="row">{companyCafeComponents}</div>
      <h2>{t('partnerCafesTitle')}</h2>
      <div className="row">{partnerCafeComponents}</div>
    </div>
  );
}

export default translate('Cafes')(Cafes);

