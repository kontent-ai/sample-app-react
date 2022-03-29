const matchesTaxonomy = (item, filter, elementName) => {
    if (filter.length === 0) {
        return true;
    }
    const codenames = item.elements[elementName].value.map(x => x.codename);
    return codenames.some(x => filter.includes(x));
};

export {
    matchesTaxonomy
}