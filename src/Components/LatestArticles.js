import React, { Component } from 'react';
import { ArticleStore } from '../Stores/Article';
import dateFormat from 'dateformat';
import { translate } from 'react-translate';

import { dateFormats } from '../Utilities/LanguageCodes';
import Link from '../Components/LowerCaseUrlLink';

const articleCount = 5;

let getState = props => {
  return {
    articles: ArticleStore.getArticles(articleCount, props.language)
  };
};

class LatestArticles extends Component {
  constructor(props) {
    super(props);
    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
    dateFormat.i18n = dateFormats[props.language] || dateFormats[0];
  }

  componentDidMount() {
    ArticleStore.addChangeListener(this.onChange);
    ArticleStore.provideArticles(this.props.language);
  }

  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.onChange);
    ArticleStore.unsubscribe();
  }

  //TODO: Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      ArticleStore.provideArticles(nextProps.language);
      dateFormat.i18n = dateFormats[nextProps.language] || dateFormats[0];
    }
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    if (this.state.articles.length === 0) {
      return <div className="row" />;
    }

    let formatDate = value => {
      return dateFormat(value, 'mmmm d');
    };

    var otherArticles = this.state.articles.slice(1).map((article, index) => {
      let title = article.title.value;
      let imageLink = article.teaserImage.value[0].url;
      let postDate = formatDate(article.postDate.value);
      let summary = article.summary.value;
      let link = `/${this.props.language.toLowerCase()}/articles/${
        article.system.id
      }`;

      return (
        <div className="col-md-3" key={index}>
          <div className="article-tile">
            <Link to={link}>
              <img
                alt={'Article ' + title}
                className="article-tile-image"
                src={imageLink}
                title={'Article ' + title}
              />
            </Link>
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

    let article = this.state.articles[0];
    let title = article.title.value;
    let imageLink = article.teaserImage.value[0].url;
    let postDate = formatDate(article.postDate.value);
    let summary = article.summary.value;
    let link = `/${this.props.language.toLowerCase()}/articles/${
      article.system.id
    }`;
    let tabTitle = this.props.t('title');

    return (
      <div className="row">
        <h1 className="title-tab">{tabTitle}</h1>
        <div className="article-tile article-tile-large">
          <div className="col-md-12 col-lg-6">
            <Link to={link}>
              <img
                alt={title}
                className="article-tile-image"
                src={imageLink}
                title={title}
              />
            </Link>
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
  }
}

export default translate('LatestArticles')(LatestArticles);
