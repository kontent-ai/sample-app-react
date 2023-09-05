import React from 'react';
import { spinnerService } from '@simply007org/react-spinners';
import { useEffect, useState } from 'react';
import { useClient } from '../Client';
import Metadata from '../Components/Metadata';
import RichText from '../Components/RichText';
import {
  defaultLanguage,
  initLanguageCodeObject,
} from '../Utilities/LanguageCodes';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Coffee as CoffeeType } from '../Models/content-types/coffee';
import { contentTypes } from '../Models/project/contentTypes';
import { resolveChangeLanguageLink } from '../Utilities/LanugageLink';
import { useKontentSmartLink } from '../Utilities/SmartLink';

const Coffee: React.FC = () => {
  const [coffee, setCoffee] = useState(initLanguageCodeObject<CoffeeType>());
  const { coffeeSlug } = useParams();
  const { locale: language, formatMessage } = useIntl();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [Client] = useClient();

  useKontentSmartLink([language, coffee]);

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items<CoffeeType>()
      .type(contentTypes.coffee.codename)
      .equalsFilter('elements.url_pattern', coffeeSlug!!);

    if (language) {
      query.languageParameter(language);
    }

    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      if (response.data.items[0].system.language !== language) {
        navigate(
          resolveChangeLanguageLink(
            pathname,
            response.data.items[0].system.language
          ),
          { replace: true }
        );
      }

      spinnerService.hide('apiSpinner');
      setCoffee((data) => ({
        ...data,
        [currentLanguage]: response.data.items[0] as CoffeeType,
      }));
    });
  }, [language, coffeeSlug, pathname, navigate, Client]);

  const coffeeData = coffee[language || defaultLanguage];

  if (!coffeeData) {
    return <div className="container" />;
  }

  const name =
    coffeeData.elements.productName.value.trim().length > 0
      ? coffeeData.elements.productName.value
      : formatMessage({ id: 'Coffee.noNameValue' });

  const imageLink =
    coffeeData.elements.image.value[0] !== undefined ? (
      <img
        alt={name}
        src={coffeeData.elements.image.value[0].url}
        title={name}
      />
    ) : (
      <div className="placeholder-tile-image">
        {formatMessage({ id: 'noTeaserValue' })}
      </div>
    );

  const descriptionElement =
    coffeeData.elements.longDescription.value !== '<p><br></p>' ? (
      <RichText element={coffeeData.elements.longDescription} />
    ) : (
      <p>{formatMessage({ id: 'noDescriptionValue' })}</p>
    );

  const farm =
    coffeeData.elements.farm.value.trim().length > 0
      ? coffeeData.elements.farm.value
      : '\u00A0';

  const variety =
    coffeeData.elements.variety.value.trim().length > 0
      ? coffeeData.elements.variety.value
      : '\u00A0';

  const processing =
    coffeeData.elements.processing.value.length > 0
      ? coffeeData.elements.processing.value[0].name
      : '\u00A0';
  const altitude =
    coffeeData.elements.altitude.value.trim().length > 0
      ? coffeeData.elements.altitude.value + ' feet'
      : '\u00A0';

  return (
    <div
      className="container"
      data-kontent-item-id={coffee[language]?.system.id}
    >
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
              <h2
                data-kontent-element-codename={
                  contentTypes.coffee.elements.product_name.codename
                }
              >
                {name}
              </h2>
            </header>
          </div>
        </div>
        <div className="row-fluid">
          <div className="col-lg-7 col-md-6">
            <figure
              className="image"
              data-kontent-element-codename={
                contentTypes.coffee.elements.image.codename
              }
            >
              {imageLink}
            </figure>
            <div
              className="description"
              data-kontent-element-codename={
                contentTypes.coffee.elements.long_description.codename
              }
            >
              {descriptionElement}
              <div className="product-detail-properties">
                <h4>Parameters</h4>
                <dl className="row">
                  <dt className="col-xs-12 col-sm-4">Farm</dt>
                  <dd
                    className="col-xs-12 col-sm-8"
                    data-kontent-element-codename={
                      contentTypes.coffee.elements.farm.codename
                    }
                  >
                    {farm}
                  </dd>
                  <dt className="col-xs-12 col-sm-4">Variety</dt>
                  <dd
                    className="col-xs-12 col-sm-8"
                    data-kontent-element-codename={
                      contentTypes.coffee.elements.variety.codename
                    }
                  >
                    {variety}
                  </dd>
                  <dt className="col-xs-12 col-sm-4">Processing</dt>
                  <dd
                    className="col-xs-12 col-sm-8"
                    data-kontent-element-codename={
                      contentTypes.coffee.elements.processing.codename
                    }
                  >
                    {processing}
                  </dd>
                  <dt className="col-xs-12 col-sm-4">Altitude</dt>
                  <dd
                    className="col-xs-12 col-sm-8"
                    data-kontent-element-codename={
                      contentTypes.coffee.elements.altitude.codename
                    }
                  >
                    {altitude}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Coffee;
