import { createRichTextHtmlResolver } from '@kentico/kontent-delivery';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { getLanguageCode } from '../Utilities/LanguageCodes';

const RichTextElement = props => {
  const resolvedRichText = createRichTextHtmlResolver().resolveRichText({
    element: props.element,
    // TODO fix linked items (and pass where necessary)
    linkedItems: props.linkedItems || [],
    imageResolver: (imageId, image) => {
      return {
        imageHtml: `<img class="xImage" src="${image?.url}">`,
        // alternatively you may return just url
        imageUrl: 'customUrl'
      };
    },
    urlResolver: (_linkId, _linkText, link) => {
      const path = resolveContentLink(link);
      const language = getLanguageCode(props.match).toLowerCase();
      return {
        // linkHtml: `<a class="xLink">${link?.link?.urlSlug}</a>`,
        // alternatively you may return just url
        linkUrl: `/${language}${path}`
      };
    },
    contentItemResolver: (itemId, contentItem) => {
      const contentItemType = contentItem ? contentItem.system.type : '';
      switch (contentItemType) {
        case 'tweet': {
          let tweetLink = contentItem.elements.tweetLink.value;
          let tweetID = tweetLink.match('^.*twitter.com/.*/(\\d+)/?.*$')[1];

          let selectedTheme = contentItem.elements.theme.value[0].codename;
          selectedTheme = selectedTheme ? selectedTheme : 'light';

          window.twttr.widgets.createTweet(
            tweetID,
            document.getElementById(`tweet${tweetID}`),
            {
              theme: selectedTheme
            }
          );
          return {
            contentItemHtml: `<div id="tweet${tweetID}"></div>`
          };
        }
        case 'hosted_video': {
          if (contentItem.elements.videoHost.value.find(item => item.codename === 'vimeo')) {
            return {
              contentItemHtml: `<iframe class="hosted-video__wrapper"
                                  src="https://player.vimeo.com/video/${contentItem.elements.videoId.value
                }?title=0&byline=0&portrait=0"
                                  width="640"
                                  height="360"
                                  frameborder="0"
                                  webkitallowfullscreen
                                  mozallowfullscreen
                                  allowfullscreen
                                  >
                          </iframe>`};
          } else if (
            contentItem.elements.videoHost.value.find(item => item.codename === 'youtube')
          ) {
            return {
              contentItemHtml: `<iframe class="hosted-video__wrapper"
                                  width="560"
                                  height="315"
                                  src="https://www.youtube.com/embed/${contentItem.elements.videoId.value
                }"
                                  frameborder="0"
                                  allowfullscreen
                                  >
                          </iframe>`
            };
          } else {
            return {
              contentItemHtml: '<div>Content item not supported</div>'
            };
          }
        }
        default:
          return {
            contentItemHtml: '<div>Content item not supported</div>'
          };
      }
    }
  });
  return (
    <div
      className={props.className}
      // see https://github.com/Kentico/kontent-delivery-sdk-js/issues/332
      dangerouslySetInnerHTML={{ __html: resolvedRichText.html.replace(/<object[^>]*>(.*)<\/object*>/g, '$1') }}
    // onClick={e => handleClick(props.element, props.history, props.match, e)}
    />
  );
};

export default withRouter(RichTextElement);
