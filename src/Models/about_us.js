import { ContentItem } from '@kentico/kontent-delivery';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class AboutUs extends ContentItem {
  constructor() {
    super({
      propertyResolver: fieldName => {
        if (fieldName === 'metadata__og_description') {
          return 'metadataOgDescription';
        }
        if (fieldName === 'metadata__meta_title') {
          return 'metadataMetaTitle';
        }
        if (fieldName === 'metadata__og_title') {
          return 'metadataOgTitle';
        }
        if (fieldName === 'metadata__meta_description') {
          return 'metadataMetaDescription';
        }
        if (fieldName === 'metadata__twitter_site') {
          return 'metadataTwitterSite';
        }
        if (fieldName === 'url_pattern') {
          return 'urlPattern';
        }
        if (fieldName === 'metadata__twitter_image') {
          return 'metadataTwitterImage';
        }
        if (fieldName === 'metadata__twitter_creator') {
          return 'metadataTwitterCreator';
        }
        if (fieldName === 'metadata__twitter_title') {
          return 'metadataTwitterTitle';
        }
        if (fieldName === 'metadata__twitter_description') {
          return 'metadataTwitterDescription';
        }
        if (fieldName === 'metadata__og_image') {
          return 'metadataOgImage';
        }
        return fieldName;
      },
      linkResolver: link => resolveContentLink(link)
    });
  }
}
