import React from 'react';
import { withRouter } from 'react-router';
import { resolveContentLink } from '../Utilities/ContentLinks';

function handleClick(element, router, e) {
  if (e.target.tagName === "A" && e.target.hasAttribute("data-item-id")) {
    e.preventDefault();

    const id = e.target.getAttribute("data-item-id");
    const link = element.links[id];

    if (link) {
      const path = resolveContentLink(link);
      if (path) {
        router.push(path);
      }
    }
  }
}

const RichTextElement = (props) => {
  return (
    <div className={props.className} dangerouslySetInnerHTML={{ __html: props.element.value }} onClick={(e) => handleClick(props.element, props.router, e)} />
  );
};

export default withRouter(RichTextElement);