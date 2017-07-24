import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class AboutUs extends ContentItem {
    constructor(){
        super({
            propertyResolver: ((fieldName) => {                
                if (fieldName === 'url_pattern'){
                    return 'urlPattern';
                }
            })
        })    
    }
    
}