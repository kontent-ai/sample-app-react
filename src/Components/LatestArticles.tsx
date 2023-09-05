import React from 'react';
import Link from '../Components/LowerCaseUrlLink';
import { FormattedDate, useIntl } from 'react-intl';
import { Article } from '../Models/content-types/article';
import { contentTypes } from '../Models';

interface LatestArticlesProps {
  articles: Article[];
}

const LatestArticles: React.FC<LatestArticlesProps> = (props) => {
  const { locale: language, formatMessage } = useIntl();
  if (props.articles.length === 0) {
    return <div className="row" />;
  }

  const otherArticles = props.articles
    .slice(1)
    .map((article: Article, index: number) => {
      const title =
        article.elements.title.value.trim().length > 0
          ? article.elements.title.value
          : formatMessage({ id: 'LatestArticles.noTitleValue' });

      const imageLink =
        article.elements.teaserImage.value[0] !== undefined ? (
          <img
            alt={'Article ' + title}
            className="article-tile-image"
            src={article.elements.teaserImage.value[0].url}
            title={'Article ' + title}
            data-kontent-element-codename={
              contentTypes.article.elements.teaser_image.codename
            }
          />
        ) : (
          <div className="article-tile-image placeholder-tile-image">
            {formatMessage({ id: 'LatestArticles.noTeaserValue' })}
          </div>
        );

      const summary =
        article.elements.summary.value.trim().length > 0
          ? article.elements.summary.value
          : formatMessage({ id: 'LatestArticles.noSummaryValue' });

      const link = `/${language.toLowerCase()}/articles/${article.system.id}`;

      return (
        <div className="col-md-3" key={index} data-kontent-item-id={article.system.id}>
          <div className="article-tile">
            <Link to={link}>{imageLink}</Link>
            <div
              className="article-tile-date"
              data-kontent-element-codename={
                contentTypes.article.elements.post_date.codename
              }
            >
              <FormattedDate
                value={article.elements.postDate.value!!}
                day="numeric"
                month="long"
              />
            </div>
            <div className="article-tile-content">
              <h2 className="h4">
                <Link
                  to={link}
                  data-kontent-element-codename={
                    contentTypes.article.elements.title.codename
                  }
                >
                  {title}
                </Link>
              </h2>
              <p
                className="article-tile-text"
                data-kontent-element-codename={
                  contentTypes.article.elements.summary.codename
                }
              >
                {summary}
              </p>
            </div>
          </div>
        </div>
      );
    });

  const { system, elements: articleElements } = props.articles[0];

  const title =
    articleElements.title.value.trim().length > 0
      ? articleElements.title.value
      : formatMessage({ id: 'LatestArticles.noTitleValue' });

  const imageLink =
    articleElements.teaserImage.value[0] !== undefined ? (
      <img
        alt={'Article ' + title}
        className="article-tile-image"
        src={articleElements.teaserImage.value[0].url}
        title={'Article ' + title}
        data-kontent-element-codename={
          contentTypes.article.elements.teaser_image.codename
        }
      />
    ) : (
      <div className="article-tile-image placeholder-tile-image">
        {formatMessage({ id: 'LatestArticles.noTeaserValue' })}
      </div>
    );

  const summary =
    articleElements.summary.value.trim().length > 0
      ? articleElements.summary.value
      : formatMessage({ id: 'noSummaryValue' });

  const link = `/${language.toLowerCase()}/articles/${system.id}`;
  const tabTitle = formatMessage({ id: 'LatestArticles.title' });

  return (
    <div className="row" data-kontent-element-codename={contentTypes.home.elements.articles.codename}>
      <h1 className="title-tab">{tabTitle}</h1>
      <div className="article-tile article-tile-large" data-kontent-item-id={system.id}>
        <div className="col-md-12 col-lg-6">
          <Link to={link}>{imageLink}</Link>
        </div>
        <div className="col-md-12 col-lg-6">
          <div
            className="article-tile-date"
            data-kontent-element-codename={
              contentTypes.article.elements.post_date.codename
            }
          >
            <FormattedDate
              value={articleElements.postDate.value!!}
              day="numeric"
              month="long"
            />
          </div>
          <div className="article-tile-content">
            <h2>
              <Link
                to={link}
                data-kontent-element-codename={
                  contentTypes.article.elements.title.codename
                }
              >
                {title}
              </Link>
            </h2>
            <p
              className="article-tile-text lead-paragraph"
              data-kontent-element-codename={
                contentTypes.article.elements.summary.codename
              }
            >
              {summary}
            </p>
          </div>
        </div>
      </div>
      {otherArticles}
    </div>
  );
};

export default LatestArticles;
