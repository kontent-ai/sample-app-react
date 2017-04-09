import React, { Component } from 'react';
import ArticleStore from '../Stores/Article';
import RichTextElement from '../Components/RichTextElement';
import dateFormat from 'dateformat';

let getState = (props) => {
  return {
    article: ArticleStore.getArticle(props.params.articleSlug)
  };
};

class Article extends Component {

  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ArticleStore.addChangeListener(this.onChange);
    ArticleStore.provideArticle(this.props.params.articleSlug);
  }

  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let article = this.state.article;

    if (!article) {
      return (
        <div className="container"></div>
      );
    }

    let formatDate = (value) => {
      return dateFormat(value, "dddd, mmmm d, yyyy");
    };

    let e = article.elements;
    let title = e.title.value;
    let imageLink = e.teaser_image.value[0].url;
    let postDate = formatDate(e.post_date.value);
    let bodyCopyElement = e.body_copy;

    return (
      <div className="container">
        <article className="article-detail col-lg-9 col-md-12 article-detail-related-box">
          <h2>{title}</h2>
          <div className="article-detail-datetime">
            {postDate}
          </div>
          <div className="row">
            <div className="article-detail-image col-md-push-2 col-md-8">
              <img alt={title} className="img-responsive" src={imageLink} title={title} />
            </div>
          </div>
          <div className="row">
            <RichTextElement className="article-detail-content" element={bodyCopyElement} />
          </div>
        </article>
      </div>
    );
  }
}

export default Article;