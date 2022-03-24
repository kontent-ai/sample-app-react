const createCafeModel = cafe => {
    let model = {
        name: cafe.system.name,
        imageLink: 'url(' + cafe.elements.photo.value[0].url + ')',
        street: cafe.elements.street.value,
        city: cafe.elements.city.value,
        zipCode: cafe.elements.zipCode.value,
        country: cafe.elements.country.value,
        state: cafe.elements.state.value,
        phone: cafe.elements.phone.value
    };
    model.dataAddress = model.city + ', ' + model.street;
    model.countryWithState =
        model.country + (model.state ? ', ' + model.state : '');
    model.location = model.city + ', ' + model.countryWithState;

    return model;
};

export {
    createCafeModel
}