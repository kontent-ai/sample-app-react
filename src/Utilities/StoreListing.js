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

export {
    formatPrice,
    renderProductStatus
}
