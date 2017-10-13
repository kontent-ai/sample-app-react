import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import {  resolveContentLink } from '../Utilities/ContentLinks';

export class Office extends ContentItem {

    constructor(){
        super({
            propertyResolver: ((fieldName) => {
                
                if (fieldName === 'zip_code'){
                    return 'zipCode';
                }

            }),
            linkResolver: (link) => resolveContentLink(link)
        })    
    }
    
}