import Article from './Article';

import React, { Component } from 'react';
import config from './deliveryClientConfig';
import withDeliveryClient from './withDeliveryClient';

class ArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: undefined
    };
  }

  componentDidMount() {
    this.subscription = this.props.client
      .item(this.props.codeName)
      .getObservable()
      .subscribe(response => {
        this.setState({
          article: response.item
        });
      });
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  render() {
    if (!this.state.article) {
      return <Article />;
    }

    const { title, summary, bodyCopy } = this.state.article;
    const teaserAlt = this.state.article.teaserImage.assets[0].description;
    const teaserUrl = this.state.article.teaserImage.assets[0].url;

    return (
      <Article
        title={title.value}
        summary={summary.value}
        bodyCopy={bodyCopy.value}
        teaserImageAlt={teaserAlt}
        teaserImageSrc={teaserUrl}
      />
    );
  }
}

export default withDeliveryClient(config)(ArticleContainer);
