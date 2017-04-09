import React, { Component } from 'react';
import ArticleStore from '../Stores/Article';
import { Link } from 'react-router'
import dateFormat from 'dateformat';

const articleCount = 5;

let getState = (props) => {
  return {
    articles: ArticleStore.getArticles(articleCount)
  };
};

class LatestArticles extends Component {
  constructor(props) {
    super(props);

    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ArticleStore.addChangeListener(this.onChange);
    ArticleStore.provideArticles(articleCount);
  }

  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState());
  }

  render() {
    if (this.state.articles.length === 0) {
      return (
        <div className="row" />
      );
    }

    let formatDate = (value) => {
      return dateFormat(value, "mmmm d");
    };

    var otherArticles = this.state.articles.slice(1).map((article, index) => {
      let e = article.elements;
      let title = e.title.value;
      let imageLink = e.teaser_image.value[0].url;
      let postDate = formatDate(e.post_date.value);
      let summary = e.summary.value;
      let link = "/articles/" + article.elements.url_pattern.value;

      return (
        <div className="col-md-3" key={index}>
          <div className="article-tile">
            <Link to={link}>
              <img alt={"Article " + title} className="article-tile-image" src={imageLink} title={"Article " + title} />
            </Link>
            <div className="article-tile-date">
              {postDate}
            </div>
            <div className="article-tile-content">
              <h2 className="h4">
                <Link to={link}>{title}</Link>
              </h2>
              <p className="article-tile-text">
                {summary}
              </p>
            </div>
          </div>
        </div>
      );
    });

    let article = this.state.articles[0];
    let e = article.elements;
    let title = e.title.value;
    let imageLink = e.teaser_image.value[0].url;
    let postDate = formatDate(e.post_date.value);
    let summary = e.summary.value;
    let link = "/articles/" + article.elements.url_pattern.value;

    return (
      <div className="row">
        <h1 className="title-tab">Latest article</h1>
        <div className="article-tile article-tile-large">
          <div className="col-md-12 col-lg-6">
            <Link to={link}>
              <img alt={title} className="article-tile-image" src={imageLink} title={title} />
            </Link>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="article-tile-date">
              {postDate}
            </div>
            <div className="article-tile-content">
              <h2>
                <Link to={link}>{title}</Link>
              </h2>
              <p className="article-tile-text lead-paragraph">
                {summary}
              </p>
            </div>
          </div>
        </div>
        {otherArticles}
      </div>
    );
  }
}

export default LatestArticles;