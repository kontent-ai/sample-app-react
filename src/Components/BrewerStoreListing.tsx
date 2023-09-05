import React from 'react';
import { Link } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { formatPrice, renderProductStatus } from '../Utilities/StoreListing';
import { useIntl } from 'react-intl';
import { Brewer } from '../Models/content-types/brewer';
import { contentTypes } from '../Models';

interface BrewerStoreListingProps {
  brewers: Brewer[];
}

const BrewerStoreListing: React.FC<BrewerStoreListingProps> = ({ brewers }) => {
  const { locale: language, formatMessage } = useIntl();

  const brewersComponents = brewers.map((brewer) => {
    const price =
      brewer.elements.price.value !== null
        ? formatPrice(brewer.elements.price.value, language)
        : formatMessage({ id: 'BrewerStoreListing.noPriceValue' });

    const name =
      brewer.elements.productName.value.trim().length > 0
        ? brewer.elements.productName.value
        : formatMessage({ id: 'BrewerStoreListing.noNameValue' });

    const imageLink =
      brewer.elements.image.value[0] !== undefined ? (
        <img
          alt={name}
          src={brewer.elements.image.value[0].url}
          title={name}
        />
      ) : (
        <div style={{ height: '257.15px' }} className="placeholder-tile-image">
          {formatMessage({ id: 'BrewerStoreListing.noTeaserValue' })}
        </div>
      );

    const status = renderProductStatus(brewer.elements.productStatus);
    const link = resolveContentLink(
      { type: 'brewer', urlSlug: brewer.elements.urlPattern.value },
      language
    );

    return (
      <div className="col-md-6 col-lg-4" key={brewer.system.codename}>
        <article
          className="product-tile"
          data-kontent-item-id={brewer.system.id}
          data-kontent-element-codename={
            contentTypes.brewer.elements.product_name.codename
          }
        >
          <Link to={link}>
            <h1 className="product-heading">{name}</h1>
            {status}
            <figure className="product-tile-image">{imageLink}</figure>
            <div className="product-tile-info">
              <span className="product-tile-price">{price}</span>
            </div>
          </Link>
        </article>
      </div>
    );
  });

  return (
    <div id="product-list" className="col-md-8 col-lg-9 product-list">
      {brewersComponents}
    </div>
  );
};

export default BrewerStoreListing;
