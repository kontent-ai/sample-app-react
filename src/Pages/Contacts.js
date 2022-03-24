import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { translate } from "react-translate";
import { Client } from "../Client";
import ContactMap from "../Components/ContactMap";
import { createCafeModel } from "../Utilities/CafeListing";
import { defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";

const Contacts = ({ language, t }) => {
  const [companyCafes, setCompanyCafes] = useState(initLanguageCodeObject());
  const [selectedAddress, setSelectedAddress] = useState(undefined);

  useEffect(() => {
    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('cafe')
      .equalsFilter("elements.country", "USA")
      .orderByDescending('system.name')

    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {

        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setCompanyCafes(data => ({
          ...data,
          [currentLanguage]: response.data.items
        }));
      });
  }, [language]);

  const selectAddress = (address) => {
    setSelectedAddress(address);
  }

  if (companyCafes[language].length === 0) {
    return (<div className="container" />);
  }

  const roastery = createCafeModel(companyCafes[language][0]);
  const roasteryComponent = (
    <div className="col-md-12">
      <h2 className="contact-title">{t('roasteryTitle')}</h2>
      <ul className="contact-info">
        <li>{roastery.phone}</li>
        <li>
          <a href={'mailto:' + roastery.email} target="_top">
            {roastery.email}
          </a>
        </li>
        <li>
          <a
            href="/#"
            onClick={e => {
              e.preventDefault();
              selectAddress(roastery.dataAddress);
            }}
            data-address={roastery.dataAddress}
            className="js-scroll-to-map"
          >
            {roastery.dataAddress},<br />
            {roastery.zipCode}, {roastery.countryWithState}
            <br />
          </a>
        </li>
      </ul>
    </div>
  );

  const companyCafeComponents = companyCafes[language].map(cafe => {
    const model = createCafeModel(cafe);
    return (
      <div className="col-md-6 col-lg-3" key={cafe.system.codename}>
        <div
          onClick={() => selectAddress(model.dataAddress)}
          className="cafe-tile cursor-hand js-scroll-to-map"
          data-address={model.dataAddress}
        >
          <div className="cafe-tile-content">
            <h3 className="cafe-tile-name">{model.name}</h3>
            <address className="cafe-tile-address">
              <a
                href="/#"
                name={model.name}
                className="cafe-tile-address-anchor"
                onClick={e => e.preventDefault()}
              >
                {model.street}, {model.city}
                <br />
                {model.zipCode}, {model.countryWithState}
              </a>
            </address>
            <p>{model.phone}</p>
          </div>
        </div>
      </div>
    );
  });

  const cafesAddresses = companyCafes[language].map(cafe => {
    return `${cafe.elements.city.value}, ${cafe.elements.street.value}`;
  });

  return (
    <div className="container">
      {roasteryComponent}
      <div>
        <h2>{t('ourCafesTitle')}</h2>
        <div className="row">{companyCafeComponents}</div>
      </div>
      <h2 className="map-title">{t('mapTitle')}</h2>
      <ContactMap
        cafesAddresses={cafesAddresses}
        focusOnAddress={selectedAddress}
      />
    </div>
  );
}

export default translate('Contacts')(Contacts);