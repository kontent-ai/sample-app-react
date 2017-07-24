import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class Article extends ContentItem {
   constructor(){
        super({
            propertyResolver: ((fieldName) => {
                
                if (fieldName === 'teaser_image'){
                    return 'teaserImage';
                }

                if (fieldName === 'post_date'){
                    return 'postDate';
                }

                if (fieldName === 'body_copy'){
                    return 'bodyCopy';
                }

                if (fieldName === 'related_articles'){
                    return 'relatedArticles';
                }

                if (fieldName === 'meta_keywords'){
                    return 'metaKeywords';
                }

                if (fieldName === 'meta_description'){
                    return 'metaDescription';
                }

                if (fieldName === 'url_pattern'){
                    return 'urlPattern';
                }

            })
        })    
    }
    
}