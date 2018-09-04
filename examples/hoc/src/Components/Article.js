import React, { Component } from 'react';

class Article extends Component {
  render() {
    return (
      <article>
        <header>
          <h1>{this.props.title}</h1>
        </header>
        <img
          alt={this.props.teaserImageAlt}
          src={this.props.teaserImageSrc}
          width="500"
        />
        <p>{this.props.summary}</p>
        <div dangerouslySetInnerHTML={{ __html: this.props.bodyCopy }} />
      </article>
    );
  }
}

export default Article;
