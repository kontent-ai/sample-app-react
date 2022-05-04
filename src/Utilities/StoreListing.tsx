import React from 'react';
import { Elements } from '@kentico/kontent-delivery';

const formatPrice = (price: number, language: string): string => {
  return price.toLocaleString(language, {
    style: 'currency',
    currency: 'USD',
  });
};

const renderProductStatus = (
  productStatus: Elements.TaxonomyElement
): React.ReactNode => {
  if (productStatus.value.length === 0) {
    return <span />;
  }

  const text = productStatus.value.map((x) => x.name).join(', ');
  return <span className="product-tile-status">{text}</span>;
};

export { formatPrice, renderProductStatus };
