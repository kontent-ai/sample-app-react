import { Link } from "react-router-dom";
import { translate } from "react-translate";
import { resolveContentLink } from "../Utilities/ContentLinks";

const BrewerStoreListing = ({ brewers, language, t }) => {

  const formatPrice = (price, language) => {
    return price.toLocaleString(language, {
      style: 'currency',
      currency: 'USD'
    });
  };

  const renderProductStatus = productStatus => {
    if (productStatus.value.length === 0) {
      return <span />;
    }

    const text = productStatus.value.map(x => x.name).join(', ');

    return <span className="product-tile-status">{text}</span>;
  };

  const brewersComponents = brewers.map((brewer) => {
    const price =
      brewer.elements.price.value !== null
        ? formatPrice(brewer.elements.price.value, language)
        : t('noPriceValue');

    const name =
      brewer.elements.productName.value.trim().length > 0
        ? brewer.elements.productName.value
        : t('noNameValue');

    const imageLink =
      brewer.elements.image.value[0] !== undefined ? (
        <img alt={name} src={brewer.elements.image.value[0].url} title={name} />
      ) : (
        <div
          style={{ height: '257.15px' }}
          className="placeholder-tile-image"
        >
          {t('noTeaserValue')}
        </div>
      );

    const status = renderProductStatus(brewer.elements.productStatus);
    const link = resolveContentLink(
      { type: 'brewer', urlSlug: brewer.elements.urlPattern.value },
      language
    );

    return (
      <div className="col-md-6 col-lg-4" key={brewer.system.codename}>
        <article className="product-tile">
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
}

export default translate("BrewerStoreListing")(BrewerStoreListing);