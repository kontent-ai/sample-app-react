import { createRichTextHtmlResolver, linkedItemsHelper } from '@kentico/kontent-delivery';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { getLanguageCode } from '../Utilities/LanguageCodes';

const RichTextElement = props => {

  const resolvedRichText = createRichTextHtmlResolver().resolveRichText({
    element: props.element,
    // TODO fix linked items (and pass where necessary)
    linkedItems: linkedItemsHelper.convertLinkedItemsToArray(props.linkedItems || {}),
    imageResolver: (imageId, image) => {
        return {
            imageHtml: `<img class="xImage" src="${image?.url}">`,
            // alternatively you may return just url
            url: 'customUrl'
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
        // if (contentItem && contentItem.system.type === 'actor') {
        //     return {
        //         contentItemHtml: `<div class="xClass">${actor.elements.firstName.value}</div>`
        //     };
        // }

        return {
            contentItemHtml: ''
        };
    }
});
  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: resolvedRichText.html }}
      // onClick={e => handleClick(props.element, props.history, props.match, e)}
    />
  );
};

export default withRouter(RichTextElement);
