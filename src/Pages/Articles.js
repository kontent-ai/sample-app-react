import React, { Component } from 'react';
import { ArticleStore } from '../Stores/Article';
import Link from '../Components/LowerCaseUrlLink';
import dateFormat from 'dateformat';

import { dateFormats } from '../Utilities/LanguageCodes';

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
    let formatDate = value => {
      return dateFormat(value, 'mmmm d');
    };

    let counter = 0;

    let articles = this.state.articles.reduce((result, article, index) => {
      if (index % 4 === 0) {
        result.push(<div className="clear" key={counter++} />);
      }

      let title = article.title.value;
      let imageLink = article.teaserImage.value[0].url;
      let postDate = formatDate(article.postDate.value);
      let summary = article.summary.value;
      let link = `/${this.props.language}/articles/${article.system.id}`;

      result.push(
        <div className="col-md-3" key={counter++}>
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

      return result;
    }, []);
    return <div className="container">{articles}</div>;
  }
}

export default Articles;
