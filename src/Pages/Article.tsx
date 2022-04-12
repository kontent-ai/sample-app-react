import React from 'react';
import { spinnerService } from "@simply007org/react-spinners";
import { useEffect, useState } from "react";
import { Client } from "../Client";
import { defaultLanguage, initLanguageCodeObject } from "../Utilities/LanguageCodes";
import RichText from "../Components/RichText";
import Metadata from "../Components/Metadata";
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

interface ArticleProps{
  language: string,
}

const Article: React.FC<ArticleProps> = ({ language}) => {
  const { formatDate, formatMessage } = useIntl();
  const { articleId } = useParams();
  const [article, setArticle] = useState(initLanguageCodeObject());

  useEffect(() => {
    spinnerService.show("apiSpinner");

    const query = Client.items()
      .type('article')
      .equalsFilter('system.id', articleId!!)
      .elementsParameter([
        'title',
        'teaser_image',
        'post_date',
        'body_copy',
        'video_host',
        'video_id',
        'tweet_link',
        'theme',
        'display_options',
        'metadata__meta_title',
        'metadata__meta_description',
        'metadata__og_title',
        'metadata__og_description',
        'metadata__og_image',
        'metadata__twitter_title',
        'metadata__twitter_site',
        'metadata__twitter_creator',
        'metadata__twitter_description',
        'metadata__twitter_image'
      ]);


    if (language) {
      query.languageParameter(language);
    }

    query
      .toPromise()
      .then(response => {

        const currentLanguage = language || defaultLanguage;

        spinnerService.hide("apiSpinner");
        setArticle((data: any) => ({
          ...data,
          [currentLanguage]: response.data.items[0]
        }));
      });
  }, [language, articleId]);

  const currentArticle = article[language];
  if (currentArticle && currentArticle.length === 0) {
    return <div className="container" />;
  }

  let makeFormatDate = (value: string) => {
    return formatDate(value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  };

  let title =
    currentArticle.elements.title.value.trim().length > 0
      ? currentArticle.elements.title.value
      : formatMessage({id: 'Article.noTitleValue'});

  let imageLink =
    currentArticle.elements.teaserImage.value[0] !== undefined ? (
      <img
        alt={title}
        className="img-responsive"
        src={currentArticle.elements.teaserImage.value[0].url}
        title={title}
      />
    ) : (
      <div className="img-responsive placeholder-tile-image">
        {formatMessage({id: 'Article.noTeaserValue'})}
      </div>
    );

  let postDate = makeFormatDate(currentArticle.elements.postDate.value);

  let bodyCopyElement =
    currentArticle.elements.bodyCopy.value !== '<p><br></p>' ? (
      <RichText
        className="article-detail-content"
        element={currentArticle.elements.bodyCopy}
      />
    ) : (
      <p className="article-detail-content">
        {formatMessage({id: 'Article.noBodyCopyValue'})}
      </p>
    );

  return (
    <div className="container">
      <Metadata
        title={currentArticle.elements.metadataMetaTitle}
        description={currentArticle.elements.metadataMetaDescription}
        ogTitle={currentArticle.elements.metadataOgTitle}
        ogImage={currentArticle.elements.metadataOgImage}
        ogDescription={currentArticle.elements.metadataOgDescription}
        twitterTitle={currentArticle.elements.metadataMetaTitle}
        twitterSite={currentArticle.elements.metadataTwitterSite}
        twitterCreator={currentArticle.elements.metadataTwitterCreator}
        twitterDescription={currentArticle.elements.metadataTwitterDescription}
        twitterImage={currentArticle.elements.metadataTwitterImage}
      />
      <article className="article-detail col-lg-9 col-md-12 article-detail-related-box">
        <h2>{title}</h2>
        <div className="article-detail-datetime">{postDate}</div>
        <div className="row">
          <div className="article-detail-image col-md-push-2 col-md-8">
            {imageLink}
          </div>
        </div>
        <div className="row">{bodyCopyElement}</div>
      </article>
    </div>
  );

}

export default Article;
