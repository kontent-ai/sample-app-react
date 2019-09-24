import { ContentItem } from '@kentico/kontent-delivery';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class Office extends ContentItem {
  constructor() {
    super({
      propertyResolver: fieldName => {
        if (fieldName === 'zip_code') {
          return 'zipCode';
        }
        return fieldName;
      },
      linkResolver: link => resolveContentLink(link)
    });
  }
}
