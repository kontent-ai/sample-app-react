import React, { Component } from 'react';
import dateFormat from 'dateformat';

import { ArticleStore } from '../Stores/Article';
import RichTextElement from '../Components/RichTextElement';
import { dateFormats } from '../Utilities/LanguageCodes';
import Metadata from '../Components/Metadata';

let getState = props => {
  return {
    article: ArticleStore.getArticle(
      props.match.params.articleId,
      props.language
    )
  };
};

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
    dateFormat.i18n = dateFormats[props.language] || dateFormats[0];
  }

  componentDidMount() {
    ArticleStore.addChangeListener(this.onChange);
    ArticleStore.provideArticle(
      this.props.match.params.articleId,
      this.props.language
    );
  }

  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.onChange);
    ArticleStore.unsubscribe();
  }

  //TODO: Method will be removed in React 17, will need to be rewritten if still required.
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language) {
      ArticleStore.provideArticle(
        this.props.match.params.articleId,
        nextProps.language
      );
      dateFormat.i18n = dateFormats[nextProps.language] || dateFormats[0];
    }
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let article = this.state.article;

    if (!article) {
      return <div className="container" />;
    }

    let formatDate = value => {
      return dateFormat(value, 'dddd, mmmm d, yyyy');
    };

    let title = article.title.value;
    let imageLink = article.teaserImage.value[0].url;
    let postDate = formatDate(article.postDate.value);
    let bodyCopyElement = article.bodyCopy;

    return (
      <div className="container">
        <Metadata
          title={article.metadataMetaTitle}
          description={article.metadataMetaDescription}
          ogTitle={article.metadataOgTitle}
          ogImage={article.metadataOgImage}
          ogDescription={article.metadataOgDescription}
          twitterTitle={article.metadataMetaTitle}
          twitterSite={article.metadataTwitterSite}
          twitterCreator={article.metadataTwitterCreator}
          twitterDescription={article.metadataTwitterDescription}
          twitterImage={article.metadataTwitterImage}
        />
        <article className="article-detail col-lg-9 col-md-12 article-detail-related-box">
          <h2>{title}</h2>
          <div className="article-detail-datetime">{postDate}</div>
          <div className="row">
            <div className="article-detail-image col-md-push-2 col-md-8">
              <img
                alt={title}
                className="img-responsive"
                src={imageLink}
                title={title}
              />
            </div>
          </div>
          <div className="row">
            <RichTextElement
              className="article-detail-content"
              element={bodyCopyElement}
            />
          </div>
        </article>
      </div>
    );
  }
}

export default Article;
