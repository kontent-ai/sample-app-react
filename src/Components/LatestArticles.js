import React from 'react';
import dateFormat from 'dateformat';
import { translate } from 'react-translate';

import Link from '../Components/LowerCaseUrlLink';

const LatestArticles = props => {
  if (props.articles.length === 0) {
    return <div className="row" />;
  }

  let formatDate = value => {
    return dateFormat(value, 'mmmm d');
  };

  var otherArticles = props.articles.slice(1).map((article, index) => {
    let title =
      article.title.value.trim().length > 0
        ? article.title.value
        : props.t('noTitleValue');

    let imageLink =
      article.teaserImage.value[0] !== undefined ? (
        <img
          alt={'Article ' + title}
          className="article-tile-image"
          src={article.teaserImage.value[0].url}
          title={'Article ' + title}
        />
      ) : (
        <div className="article-tile-image placeholder-tile-image">
          {props.t('noTeaserValue')}
        </div>
      );

    let postDate = formatDate(article.postDate.value);

    let summary =
      article.summary.value.trim().length > 0
        ? article.summary.value
        : props.t('noSummaryValue');

    let link = `/${props.language.toLowerCase()}/articles/${article.system.id}`;

    return (
      <div className="col-md-3" key={index}>
        <div className="article-tile">
          <Link to={link}>{imageLink}</Link>
          <div className="article-tile-date">{postDate}</div>
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

  let article = props.articles[0];

  let title =
    article.title.value.trim().length > 0
      ? article.title.value
      : props.t('noTitleValue');

  let imageLink =
    article.teaserImage.value[0] !== undefined ? (
      <img
        alt={'Article ' + title}
        className="article-tile-image"
        src={article.teaserImage.value[0].url}
        title={'Article ' + title}
      />
    ) : (
      <div className="article-tile-image placeholder-tile-image">
        {props.t('noTeaserValue')}
      </div>
    );

  let postDate = formatDate(article.postDate.value);

  let summary =
    article.summary.value.trim().length > 0
      ? article.summary.value
      : props.t('noSummaryValue');

  let link = `/${props.language.toLowerCase()}/articles/${article.system.id}`;
  let tabTitle = props.t('title');

  return (
    <div className="row">
      <h1 className="title-tab">{tabTitle}</h1>
      <div className="article-tile article-tile-large">
        <div className="col-md-12 col-lg-6">
          <Link to={link}>{imageLink}</Link>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="article-tile-date">{postDate}</div>
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

export default translate('LatestArticles')(LatestArticles);
