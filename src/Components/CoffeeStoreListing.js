import { Link } from "react-router-dom";
import { translate } from "react-translate";
import { resolveContentLink } from "../Utilities/ContentLinks";
import { formatPrice, renderProductStatus } from "../Utilities/StoreListing";

const CoffeeStoreListing = ({ coffees, language, t }) => {

  const coffeesComponents = coffees.map((coffee) => {
    const price =
      coffee.elements.price.value !== null
        ? formatPrice(coffee.elements.price.value, language)
        : t('noPriceValue');

    const name =
      coffee.elements.productName.value.trim().length > 0
        ? coffee.elements.productName.value
        : t('noNameValue');

    const imageLink =
      coffee.elements.image.value[0] !== undefined ? (
        <img
          alt={name}
          className=""
          src={coffee.elements.image.value[0].url}
          title={name}
        />
      ) : (
        <div
          style={{ height: '257.15px' }}
          className="product-tile-image placeholder-tile-image"
        >
          {t('noTeaserValue')}
        </div>
      );

    const status = renderProductStatus(coffee.elements.productStatus);
    const link = resolveContentLink(
      { type: 'coffee', urlSlug: coffee.elements.urlPattern.value },
      language
    );

    return (
      <div className="col-md-6 col-lg-4" key={coffee.system.codename}>
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
      {coffeesComponents}
    </div>
  );
}


export default translate('CoffeeStoreListing')(CoffeeStoreListing);
