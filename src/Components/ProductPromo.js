import React from 'react';

const ProductPromo = props => {
  const value =
    props.product && props.product.value && JSON.parse(props.product.value);

  if (!value) {
    return null;
  }

  const imageLink = value.previewUrl ? (
    <img alt={value.title} src={value.previewUrl} title={value.title} />
  ) : (
    <div style={{ height: '257.15px' }} className="placeholder-tile-image">
      {this.props.t('noTeaserValue')}
    </div>
  );

  const storeFrontUrl = `https://dancing-goat-sample.myshopify.com/products/${
    value.handle
  }`;

  return (
    <div className="row">
      <h2>Featured product</h2>
      <div className="col-md-6 col-lg-4">
        <div className="product-tile">
          <h1 className="product-heading">{value.title}</h1>
          <figure className="product-tile-image">{imageLink}</figure>
          <div className="product-tile-info">
            <a className="btn btn-secondary" href={storeFrontUrl}>
              See more details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPromo;
