import React from 'react';
import { IContentItemSystemAttributes } from '@kentico/kontent-delivery';

import Link from '../Components/LowerCaseUrlLink';
import { FormattedDate, useIntl } from 'react-intl';
import { Article, IArticleElement } from '../Models/article';

interface MapObjectType {
  system: IContentItemSystemAttributes,
  elements: IArticleElement
}

interface LatestArticlesProps {
  articles: Article[],
  language: string,
}

const LatestArticles: React.FC<LatestArticlesProps> = props => {
  const {formatMessage} = useIntl();
  if (props.articles.length === 0) {
    return <div className="row" />;
  }

  var otherArticles = props.articles.slice(1).map(({ system, elements: articleElements }: MapObjectType, index: number) => {
    let title =
      articleElements.title.value.trim().length > 0
        ? articleElements.title.value
        : formatMessage({id: 'LatestArticles.noTitleValue'});

    let imageLink =
      articleElements.teaserImage.value[0] !== undefined ? (
        <img
          alt={'Article ' + title}
          className="article-tile-image"
          src={articleElements.teaserImage.value[0].url}
          title={'Article ' + title}
        />
      ) : (
        <div className="article-tile-image placeholder-tile-image">
          { formatMessage({id: 'LatestArticles.noTeaserValue'}) }
        </div>
      );

    let summary =
      articleElements.summary.value.trim().length > 0
        ? articleElements.summary.value
        : formatMessage({ id: 'LatestArticles.noSummaryValue' });

    let link = `/${props.language.toLowerCase()}/articles/${system.id}`;

    return (
      <div className="col-md-3" key={index}>
        <div className="article-tile">
          <Link to={link}>{imageLink}</Link>
          <div className="article-tile-date">
            <FormattedDate
            value={articleElements.postDate.value!!}
            day="numeric"
            month="long"
          />
          </div>
          <div className="article-tile-content">
            <h2 className="h4">
              <Link to={link}>{title}</Link>
            </h2>
            <p className="article-tile-text">{summary}</p>
          </div>
        </div>
      </div>
    );
  });

  let { system, elements: articleElements } = props.articles[0];

  let title =
    articleElements.title.value.trim().length > 0
      ? articleElements.title.value
      : formatMessage({ id: 'LatestArticles.noTitleValue' });

  let imageLink =
    articleElements.teaserImage.value[0] !== undefined ? (
      <img
        alt={'Article ' + title}
        className="article-tile-image"
        src={articleElements.teaserImage.value[0].url}
        title={'Article ' + title}
      />
    ) : (
      <div className="article-tile-image placeholder-tile-image">
        {formatMessage({id: 'LatestArticles.noTeaserValue'})}
      </div>
    );

  //let postDate = formatDate(articleElements.postDate.value);

  let summary =
    articleElements.summary.value.trim().length > 0
      ? articleElements.summary.value
      : formatMessage({ id:'noSummaryValue'} );

  let link = `/${props.language.toLowerCase()}/articles/${system.id}`;
  let tabTitle = formatMessage({ id: 'LatestArticles.title' });

  return (
    <div className="row">
      <h1 className="title-tab">{tabTitle}</h1>
      <div className="article-tile article-tile-large">
        <div className="col-md-12 col-lg-6">
          <Link to={link}>{imageLink}</Link>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="article-tile-date">
            <FormattedDate
              value={articleElements.postDate.value!!}
              day="numeric"
              month="long"
            />
            </div>
          <div className="article-tile-content">
            <h2>
              <Link to={link}>{title}</Link>
            </h2>
            <p className="article-tile-text lead-paragraph">{summary}</p>
          </div>
        </div>
      </div>
      {otherArticles}
    </div>
  );
};

export default LatestArticles;
