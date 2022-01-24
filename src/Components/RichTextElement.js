import { createRichTextHtmlResolver, linkedItemsHelper } from '@kentico/kontent-delivery';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { getLanguageCode } from '../Utilities/LanguageCodes';

function handleClick(element, history, match, e) {
  if (e.target.tagName === 'A' && e.target.hasAttribute('data-item-id')) {
    e.preventDefault();

    const id = e.target.getAttribute('data-item-id');
    const link = element.links.find(m => m.linkId === id);

    if (link) {
      const path = resolveContentLink(link);
      const language = getLanguageCode(match).toLowerCase();

      if (path) {
        history.push(`/${language}${path}`);
      }
    }
  }
}

const RichTextElement = props => {

  const resolvedRichText = createRichTextHtmlResolver().resolveRichText({
    element: props.element,
    linkedItems: linkedItemsHelper.convertLinkedItemsToArray(props.linkedItems || {}),
    imageResolver: (imageId, image) => {
        return {
            imageHtml: `<img class="xImage" src="${image?.url}">`,
            // alternatively you may return just url
            url: 'customUrl'
        };
    },
    // urlResolver: (linkId, linkText, link) => {
    //     return {
    //         linkHtml: `<a class="xLink">${link?.link?.urlSlug}</a>`,
    //         // alternatively you may return just url
    //         url: 'customUrl'
    //     };
    // },
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
      onClick={e => handleClick(props.element, props.history, props.match, e)}
    />
  );
};

export default withRouter(RichTextElement);
