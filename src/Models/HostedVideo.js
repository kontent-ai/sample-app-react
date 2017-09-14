import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class HostedVideo extends ContentItem {
    
    constructor(){
        super({
            propertyResolver: ((fieldName) => {
                
                if (fieldName === 'video_id'){
                    return 'videoId';
                }

                if (fieldName === 'video_host'){
                    return 'videoHost';
                }
            })
        })    
    }
    
}