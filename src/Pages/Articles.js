import React, { Component } from 'react';
import ArticleStore from '../Stores/Article';
import { Link } from 'react-router'
import dateFormat from 'dateformat';

let articleCount = 10;

let getState = () => {
  return {
    articles: ArticleStore.getArticles(articleCount)
  };
};

class Articles extends Component {

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
    let formatDate = (value) => {
      return dateFormat(value, "mmmm d");
    };

    let counter = 0;

    let articles = this.state.articles.reduce((result, article, index) => {
      if (index % 4 === 0) {
        result.push(
          <div className="clear" key={counter++}></div>
        );
      }

      let e = article.elements;
      let title = e.title.value;
      let imageLink = e.teaser_image.value[0].url;
      let postDate = formatDate(e.post_date.value);
      let summary = e.summary.value;
      let link = "/articles/" + article.elements.url_pattern.value;

      result.push(
        <div className="col-md-3" key={counter++}>
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

      return result;
    }, []);

    return (
      <div className="container">
        {articles}
      </div>
    );
  }
}

export default Articles;