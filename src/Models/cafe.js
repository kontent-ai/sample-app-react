import { ContentItem } from 'kentico-cloud-delivery';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class Cafe extends ContentItem {
  constructor() {
    super({
      propertyResolver: fieldName => {
        if (fieldName === 'zip_code') {
          return 'zipCode';
        }
        if (fieldName === 'conversion_name') {
          return 'conversionName';
        }
        return fieldName;
      },
      linkResolver: link => resolveContentLink(link)
    });
  }
}
