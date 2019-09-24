import { ContentItem } from '@kentico/kontent-delivery';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class HeroUnit extends ContentItem {
  constructor() {
    super({
      propertyResolver: fieldName => {
        if (fieldName === 'marketing_message') {
          return 'marketingMessage';
        }
        return fieldName;
      },
      linkResolver: link => resolveContentLink(link)
    });
  }
}
