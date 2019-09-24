import { ContentItem } from '@kentico/kontent-delivery';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class FactAboutUs extends ContentItem {
  constructor() {
    super({
      linkResolver: link => resolveContentLink(link)
    });
  }
}
