import React, { Component } from 'react';
import { BrewerStore } from "../Stores/Brewer";
import RichTextElement from '../Components/RichTextElement';

let getState = (props) => {
  return {
    brewer: BrewerStore.getBrewer(props.match.params.brewerSlug, props.language)
  };
};

class Brewer extends Component {

  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    BrewerStore.addChangeListener(this.onChange);
    BrewerStore.provideBrewer(this.props.match.params.brewerSlug, this.props.language);
  }

  componentWillUnmount() {
    BrewerStore.removeChangeListener(this.onChange);
    BrewerStore.unsubscribe();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.language !== nextProps.language || this.props.match.params.brewerSlug !== nextProps.match.params.brewerSlug) {
      BrewerStore.provideBrewer(this.props.match.params.brewerSlug, nextProps.language);
    }
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    if (!this.state.brewer) {
      return (
        <div className="container"></div>
      );
    }

    let brewer = this.state.brewer;
    let name = brewer.productName.value;
    let imageLink = brewer.image.value[0].url;
    let descriptionElement = brewer.longDescription;

    return (
      <div className="container">
        <article className="product-detail">
          <div className="row">
            <div className="col-md-12">
              <header>
                <h2>{name}</h2>
              </header>
            </div>
          </div>
          <div className="row-fluid">
            <div className="col-lg-7 col-md-6">
              <figure className="image">
                <img alt={name} className="" src={imageLink} title={name} />
              </figure>
              <div className="description">
                <RichTextElement element={descriptionElement} />
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Brewer;