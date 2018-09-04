import { ContentItem } from 'kentico-cloud-delivery';
import { resolveContentLink } from '../Utilities/ContentLinks';

export class Coffee extends ContentItem {
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
        if (fieldName === 'product_status') {
          return 'productStatus';
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
        if (fieldName === 'short_description') {
          return 'shortDescription';
        }
        if (fieldName === 'metadata__twitter_description') {
          return 'metadataTwitterDescription';
        }
        if (fieldName === 'metadata__og_image') {
          return 'metadataOgImage';
        }
        if (fieldName === 'long_description') {
          return 'longDescription';
        }
        if (fieldName === 'product_name') {
          return 'productName';
        }
        return fieldName;
      },
      linkResolver: link => resolveContentLink(link)
    });
  }
}
