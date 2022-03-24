import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { translate } from "react-translate";
import { Client } from "../Client";
import Metadata from "../Components/Metadata";
import RichText from "../Components/RichText";
import { defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";

const Brewer = ({ language, match: { params: { brewerSlug } }, t }) => {

  const [brewer, setBrewer] = useState(initLanguageCodeObject());

  useEffect(() => {

    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('brewer')
      .equalsFilter('elements.url_pattern', brewerSlug);


    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {

        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setBrewer(data => ({
          ...data,
          [currentLanguage]: response.data.items[0]
        }));
      });
  }, [language, brewerSlug]);

  const brewerData = brewer[language || defaultLanguage];
  
  if (brewerData.length === 0) {
    return <div className="container" />;
  }


  const name =
    brewerData.elements.productName.value.trim().length > 0
      ? brewerData.elements.productName.value
      : t('noNameValue');

  const imageLink =
    brewerData.elements.image.value[0] !== undefined ? (
      <img alt={name} src={brewerData.elements.image.value[0].url} title={name} />
    ) : (
      <div className="placeholder-tile-image">
        {t('noTeaserValue')}
      </div>
    );

  const descriptionElement =
    brewerData.elements.longDescription.value !== '<p><br></p>' ? (
      <RichText element={brewerData.elements.longDescription} />
    ) : (
      <p>{t('noDescriptionValue')}</p>
    );

  return (
    <div className="container">
      <Metadata
        title={brewerData.elements.metadataMetaTitle}
        description={brewerData.elements.metadataMetaDescription}
        ogTitle={brewerData.elements.metadataOgTitle}
        ogImage={brewerData.elements.metadataOgImage}
        ogDescription={brewerData.elements.metadataOgDescription}
        twitterTitle={brewerData.elements.metadataMetaTitle}
        twitterSite={brewerData.elements.metadataTwitterSite}
        twitterCreator={brewerData.elements.metadataTwitterCreator}
        twitterDescription={brewerData.elements.metadataTwitterDescription}
        twitterImage={brewerData.elements.metadataTwitterImage}
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
            <div className="description">{descriptionElement}</div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default translate('Brewer')(Brewer);