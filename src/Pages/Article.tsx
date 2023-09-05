import React from 'react';
import { spinnerService } from '@simply007org/react-spinners';
import { useEffect, useState } from 'react';
import {
  defaultLanguage,
  initLanguageCodeObject,
} from '../Utilities/LanguageCodes';
import RichText from '../Components/RichText';
import Metadata from '../Components/Metadata';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Article as ArticleType } from '../Models/content-types/article';
import { contentTypes } from '../Models/project/contentTypes';
import { resolveChangeLanguageLink } from '../Utilities/LanugageLink';
import { useClient } from '../Client';
import { useKontentSmartLink } from '../Utilities/SmartLink';

const Article: React.FC = () => {
  const { locale: language, formatDate, formatMessage } = useIntl();
  const { articleId } = useParams();
  const [article, setArticle] = useState(initLanguageCodeObject<ArticleType>());
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [Client] = useClient();

  useKontentSmartLink([language, article]);

  useEffect(() => {
    spinnerService.show('apiSpinner');

    const query = Client.items<ArticleType>()
      .type(contentTypes.article.codename)
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
        'metadata__twitter_image',
      ]);

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
      setArticle((data) => ({
        ...data,
        [currentLanguage]: response.data.items[0] as ArticleType,
      }));
    });
  }, [language, articleId, navigate, pathname, Client]);

  const currentArticle = article[language];
  if (!currentArticle) {
    return <div className="container" />;
  }

  const makeFormatDate = (value: string): string => {
    return formatDate(value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const title =
    currentArticle.elements.title.value.trim().length > 0
      ? currentArticle.elements.title.value
      : formatMessage({ id: 'Article.noTitleValue' });

  const imageLink =
    currentArticle?.elements.teaserImage.value[0] !== undefined ? (
      <img
        alt={title}
        className="img-responsive"
        src={currentArticle.elements.teaserImage.value[0].url}
        title={title}
        data-kontent-element-codename={
          contentTypes.article.elements.teaser_image.codename
        }
      />
    ) : (
      <div className="img-responsive placeholder-tile-image">
        {formatMessage({ id: 'Article.noTeaserValue' })}
      </div>
    );

  const postDate = makeFormatDate(currentArticle.elements.postDate.value!);

  const bodyCopyElement =
    currentArticle.elements.bodyCopy.value !== '<p><br></p>' ? (
      <RichText
        className="article-detail-content"
        element={currentArticle.elements.bodyCopy}
        data-kontent-element-codename={
          contentTypes.article.elements.body_copy.codename
        }
      />
    ) : (
      <p className="article-detail-content">
        {formatMessage({ id: 'Article.noBodyCopyValue' })}
      </p>
    );

  return (
    <div
      className="container"
      data-kontent-item-id={article[language]?.system.id}
    >
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
        <h2
          data-kontent-element-codename={
            contentTypes.article.elements.title.codename
          }
        >
          {title}
        </h2>
        <div
          className="article-detail-datetime"
          data-kontent-element-codename={
            contentTypes.article.elements.post_date.codename
          }
        >
          {postDate}
        </div>
        <div className="row">
          <div className="article-detail-image col-md-push-2 col-md-8">
            {imageLink}
          </div>
        </div>
        <div className="row">{bodyCopyElement}</div>
      </article>
    </div>
  );
};

export default Article;
