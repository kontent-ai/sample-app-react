import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class Coffee extends ContentItem {
    
    constructor(){
        super({
            propertyResolver: ((fieldName) => {
                
                if (fieldName === 'product_name'){
                    return 'productName';
                }

                if (fieldName === 'short_description'){
                    return 'shortDescription';
                }

                if (fieldName === 'long_description'){
                    return 'longDescription';
                }

                if (fieldName === 'product_status'){
                    return 'productStatus';
                }

                if (fieldName === 'url_pattern'){
                    return 'urlPattern';
                }

            })
        })    
    }
    
}