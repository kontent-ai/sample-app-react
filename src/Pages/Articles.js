import React, { Component } from 'react';
import { ArticleStore } from '../Stores/Article';
import Link from '../Components/LowerCaseUrlLink';
import dateFormat from 'dateformat';

import { dateFormats } from '../Utilities/LanguageCodes';
import { translate } from 'react-translate';

let articleCount = 10;

let getState = props => {
  return {
    articles: ArticleStore.getArticles(articleCount, props.language)
  };
};

class Articles extends Component {
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.language) {
      ArticleStore.provideArticles(nextProps.language);
      dateFormat.i18n = dateFormats[nextProps.language] || dateFormats[0];
      return {
        language: nextProps.language
      };
    }
    return null;
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let formatDate = value => {
      return dateFormat(value, 'mmmm d');
    };

    let counter = 0;

    let articles = this.state.articles.reduce((result, article, index) => {
      if (index % 4 === 0) {
        result.push(<div className="clear" key={counter++} />);
      }

      let title =
        article.title.value.trim().length > 0
          ? article.title.value
          : this.props.t('noTitleValue');

      let postDate = formatDate(article.postDate.value);

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
            {this.props.t('noTeaserValue')}
          </div>
        );

      let summary =
        article.summary.value.trim().length > 0
          ? article.summary.value
          : this.props.t('noSummaryValue');

      let link = `/${this.props.language}/articles/${article.system.id}`;

      result.push(
        <div className="col-md-3" key={counter++}>
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

      return result;
    }, []);
    return <div className="container">{articles}</div>;
  }
}

export default translate('Articles')(Articles);
