import { ContentItem } from 'kentico-cloud-delivery';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class FactAboutUs extends ContentItem {
  constructor() {
    super({
      linkResolver: link => resolveContentLink(link)
    });
  }
}
