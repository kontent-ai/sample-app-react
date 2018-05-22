import React from 'react';
import { withRouter } from 'react-router-dom';
import { getLanguageCode } from '../Utilities/LanguageCodes'


function handleClick(element, history, match, e) {
  if (e.target.tagName === "A" && e.target.hasAttribute("data-item-id")) {
    e.preventDefault();

    const link = e.target.getAttribute("href");
    if (link) {
      const language = getLanguageCode(match).toLowerCase();;

      if (language) {
        history.push(`/${language}${link}`);
      }
    }
  }
}

const RichTextElement = (props) => {
  return (
    <div className={props.className} dangerouslySetInnerHTML={{ __html: props.element.getHtml() }} onClick={(e) => handleClick(props.element, props.history, props.match, e)} />
  );
};

export default withRouter(RichTextElement);