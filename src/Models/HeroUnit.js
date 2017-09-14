import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class HeroUnit extends ContentItem {
    
    constructor(){
        super({
            propertyResolver: ((fieldName) => {
                
                if (fieldName === 'marketing_message'){
                    return 'marketingMessage';
                }

            })
        })    
    }
    
}