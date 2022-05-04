import { Cafe } from '../Models/cafe';
import { CafeModel } from '../ViewModels/CafeModel';

const createCafeModel = (cafe: Cafe): CafeModel => {
  const model = {
    name: cafe.system.name,
    email: cafe.elements.email.value,
    imageLink: 'url(' + cafe.elements.photo.value[0].url + ')',
    street: cafe.elements.street.value,
    city: cafe.elements.city.value,
    zipCode: cafe.elements.zipCode.value,
    country: cafe.elements.country.value,
    state: cafe.elements.state.value,
    phone: cafe.elements.phone.value,
  };

  const addressModel = {
    dataAddress: model.city + ', ' + model.street,
    countryWithState: model.country + (model.state ? ', ' + model.state : ''),
  };

  const locationModel = {
    location: model.city + ', ' + addressModel.countryWithState,
  };

  return { ...model, ...addressModel, ...locationModel };
};

export { createCafeModel };
