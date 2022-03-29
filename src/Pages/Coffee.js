import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { translate } from "react-translate";
import { Client } from "../Client";
import Metadata from "../Components/Metadata";
import RichText from "../Components/RichText";
import { defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";

const Coffee = ({ language, match: { params: { coffeeSlug } }, t }) => {

  const [coffee, setCoffee] = useState(initLanguageCodeObject());

  useEffect(() => {

    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('coffee')
      .equalsFilter('elements.url_pattern', coffeeSlug);


    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {

        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setCoffee(data => ({
          ...data,
          [currentLanguage]: response.data.items[0]
        }));
      });
  }, [language, coffeeSlug]);

  const coffeeData = coffee[language || defaultLanguage];

  if (coffeeData.length === 0) {
    return <div className="container" />;
  }


  const name =
    coffeeData.elements.productName.value.trim().length > 0
      ? coffeeData.elements.productName.value
      : t('noNameValue');

  const imageLink =
    coffeeData.elements.image.value[0] !== undefined ? (
      <img alt={name} src={coffeeData.elements.image.value[0].url} title={name} />
    ) : (
      <div className="placeholder-tile-image">
        {t('noTeaserValue')}
      </div>
    );

  const descriptionElement =
    coffeeData.elements.longDescription.value !== '<p><br></p>' ? (
      <RichText element={coffeeData.elements.longDescription} />
    ) : (
      <p>{t('noDescriptionValue')}</p>
    );

  const farm =
    coffeeData.elements.farm.value.trim().length > 0 ? coffeeData.elements.farm.value : '\u00A0';

  const variety =
    coffeeData.elements.variety.value.trim().length > 0 ? coffeeData.elements.variety.value : '\u00A0';

  const processing =
    coffeeData.elements.processing.value.length > 0
      ? coffeeData.elements.processing.value[0].name
      : '\u00A0';
  const altitude =
    coffeeData.elements.altitude.value.trim().length > 0
      ? coffeeData.elements.altitude.value + ' feet'
      : '\u00A0';

  return (
    <div className="container">
      <Metadata
        title={coffeeData.elements.metadataMetaTitle}
        description={coffeeData.elements.metadataMetaDescription}
        ogTitle={coffeeData.elements.metadataOgTitle}
        ogImage={coffeeData.elements.metadataOgImage}
        ogDescription={coffeeData.elements.metadataOgDescription}
        twitterTitle={coffeeData.elements.metadataMetaTitle}
        twitterSite={coffeeData.elements.metadataTwitterSite}
        twitterCreator={coffeeData.elements.metadataTwitterCreator}
        twitterDescription={coffeeData.elements.metadataTwitterDescription}
        twitterImage={coffeeData.elements.metadataTwitterImage}
      />
      <article className="product-detail">
        <div className="row">
          <div className="col-md-12">
            <header>
              <h2>{name}</h2>
            </header>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-7 col-md-6">
            <figure className="image">{imageLink}</figure>
            <div className="description">
              {descriptionElement}
              <div className="product-detail-properties">
                <h4>Parameters</h4>
                <dl className="row">
                  <dt className="col-xs-12 col-sm-4">Farm</dt>
                  <dd className="col-xs-12 col-sm-8">{farm}</dd>
                  <dt className="col-xs-12 col-sm-4">Variety</dt>
                  <dd className="col-xs-12 col-sm-8">{variety}</dd>
                  <dt className="col-xs-12 col-sm-4">Processing</dt>
                  <dd className="col-xs-12 col-sm-8">{processing}</dd>
                  <dt className="col-xs-12 col-sm-4">Altitude</dt>
                  <dd className="col-xs-12 col-sm-8">{altitude}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </article >
    </div >
  );
}

export default translate('Coffee')(Coffee);