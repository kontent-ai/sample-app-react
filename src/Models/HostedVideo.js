import {  ContentItem } from 'kentico-cloud-delivery-typescript-sdk';
import {  resolveContentLink } from '../Utilities/ContentLinks';

export class HostedVideo extends ContentItem {
    
    constructor(){
        super({
            richTextResolver: video => {               
                if (video.videoHost.value.find(item => item.codename === "vimeo")) {
                    return `<iframe class="hosted-video__wrapper"
                                src="https://player.vimeo.com/video/${video.videoId.value}?title =0&byline =0&portrait =0"
                                width="640"
                                height="360"
                                frameborder="0"
                                webkitallowfullscreen
                                mozallowfullscreen
                                allowfullscreen
                                >
                        </iframe>`;
                }
                else if (video.videoHost.value.find(item => item.codename === "youtube")) {
                    return `<iframe class="hosted-video__wrapper"
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/${video.videoId.value}"
                                frameborder="0"
                                allowfullscreen
                                >
                        </iframe>`;
                }                
            },
            propertyResolver: (fieldName => {
                
                if (fieldName === 'video_id'){
                    return 'videoId';
                }

                if (fieldName === 'video_host'){
                    return 'videoHost';
                }
            }),
            linkResolver: (link) => resolveContentLink(link)
        })    
    }
    
}