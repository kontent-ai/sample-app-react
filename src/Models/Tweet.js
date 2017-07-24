import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';

export class Tweet extends ContentItem {
    constructor(){
        super({
            propertyResolver: ((fieldName) => {
                
                if (fieldName === 'tweet_link'){
                    return 'tweetLink';
                }

                if (fieldName === 'display_options'){
                    return 'displayOptions';
                }
            })
        })    
    }
    
}