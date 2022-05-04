import React from 'react';
import { spinnerService } from '@simply007org/react-spinners';
import { useEffect, useState } from 'react';
import { Client } from '../Client';
import Metadata from '../Components/Metadata';
import RichText from '../Components/RichText';
import {
  defaultLanguage,
  initLanguageCodeObject,
} from '../Utilities/LanguageCodes';
import { FactAboutUs } from '../Models/fact_about_us';
import { useIntl } from 'react-intl';
import { AboutUs } from '../Models/about_us';
import { projectModel } from '../Models/_project';

interface AboutProps {
  urlSlug?: string;
}

const About: React.FC<AboutProps> = ({ urlSlug }) => {
  const { locale: language, formatMessage } = useIntl();
  const [facts, setFacts] = useState(initLanguageCodeObject<AboutUs>(null));
  const [metadata, setMetadata] = useState(initLanguageCodeObject());

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items<AboutUs>()
      .type(projectModel.contentTypes.about_us.codename)
      .elementsParameter([
        'facts',
        'modular_content',
        'title',
        'description',
        'image',
      ]);

    if (language) {
      query.languageParameter(language);
    }

    if (urlSlug) {
      query.equalsFilter('elements.url_pattern', urlSlug);
    }
    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      spinnerService.hide('apiSpinner');
      setFacts((data) => ({
        ...data,
        [currentLanguage]: response.data.items[0] as AboutUs,
      }));
    });
  }, [language, urlSlug]);

  useEffect(() => {
    // do not use spinner for metadata fetch

    const query = Client.items()
      .type('about_us')
      .elementsParameter([
        'metadata__meta_title',
        'metadata__meta_description',
        'metadata__og_title',
        'metadata__og_description',
        'metadata__og_image',
        'metadata__twitter_title',
        'metadata__twitter_site',
        'metadata__twitter_creator',
        'metadata__twitter_description',
        'metadata__twitter_image',
      ]);

    if (language) {
      query.languageParameter(language);
    }

    if (urlSlug) {
      query.equalsFilter('elements.url_pattern', urlSlug);
    }
    query.toPromise().then((response) => {
      const currentLanguage = language || defaultLanguage;

      setMetadata((data) => ({
        ...data,
        [currentLanguage]: response.data.items[0],
      }));
    });
  }, [language, urlSlug]);

  const factsComponent =
    facts[language]?.elements.facts.linkedItems &&
    facts[language]?.elements.facts.linkedItems.map(
      (fact: FactAboutUs, index: number) => {
        const title =
          fact.elements.title.value.trim().length > 0
            ? fact.elements.title.value
            : formatMessage({ id: 'About.noTitleValue' });

        const descriptionElement =
          fact.elements.description.value !== '<p><br></p>' ? (
            <RichText
              className="text-and-image-text"
              element={fact.elements.description}
            />
          ) : (
            <p className="text-and-image-text">
              {formatMessage({ id: 'About.noDescriptionValue' })}
            </p>
          );

        const imageLink =
          fact.elements.image.value[0] !== undefined ? (
            <img
              alt={title}
              className="img-responsive"
              src={fact.elements.image.value[0].url}
              title={title}
            />
          ) : (
            <div className="img-responsive placeholder-tile-image">
              {formatMessage({ id: 'About.noTeaserValue' })}
            </div>
          );

        if (index % 2 === 0) {
          return (
            <section className="row text-and-image" key={index}>
              <h2 className="col-lg-12">{title}</h2>
              <div className="col-md-6">{descriptionElement}</div>
              <div className="col-md-6">{imageLink}</div>
            </section>
          );
        }

        return (
          <section className="row text-and-image" key={index}>
            <h2 className="col-lg-12">{title}</h2>
            <div className="col-md-6 col-md-push-6">{descriptionElement}</div>
            <div className="col-md-6 col-md-pull-6">{imageLink}</div>
          </section>
        );
      }
    );

  const metaDataElements = metadata[language]?.elements || {};

  return (
    <div className="container">
      <Metadata
        title={metaDataElements.metadataMetaTitle}
        description={metaDataElements.metadataMetaDescription}
        ogTitle={metaDataElements.metadataOgTitle}
        ogImage={metaDataElements.metadataOgImage}
        ogDescription={metaDataElements.metadataOgDescription}
        twitterTitle={metaDataElements.metadataMetaTitle}
        twitterSite={metaDataElements.metadataTwitterSite}
        twitterCreator={metaDataElements.metadataTwitterCreator}
        twitterDescription={metaDataElements.metadataTwitterDescription}
        twitterImage={metaDataElements.metadataTwitterImage}
      />
      {factsComponent}
    </div>
  );
};

export default About;
