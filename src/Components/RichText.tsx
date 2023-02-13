import React, { useState } from 'react';
import {
  ElementModels,
  Elements,
} from '@kontent-ai/delivery-sdk';
import { RichTextResolver } from 'kontent-rich-text-to-json-converter';
import { useEffect } from 'react';
import { IDomHtmlNode, IDomNode } from 'kontent-rich-text-to-json-converter/src';

interface RichTextProps {
  element: Elements.RichTextElement;
  className?: string;
}

const isLinkedItem = (node: IDomHtmlNode): boolean => (
  node.tagName === 'object'
  && node.attributes.type === 'application/kenticocloud'
);

const RichText: React.FC<RichTextProps> = (props) => {
  const [richTextContent, setRichTextContent] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const resolver = new RichTextResolver();
    const parseResult = resolver.parse({
      value: props.element.value,
      // other way of transformation
      // images: props.element.images.reduce<IRichTextInput["images"]>((obj, value) => {
      //   obj[value.imageId] = {
      //     image_id: value.imageId,
      //     description: value.description || "",
      //     url: value.url,
      //     width: value.width || 0,
      //     height: value.height || 0
      //   }
      //   return obj;
      // }, {})
      images: Object.fromEntries(props.element.images.map(image => [image.imageId, {
        image_id: image.imageId,
        description: image.description,
        url: image.url,
        width: image.width || undefined,
        height: image.height || undefined
      }])),
      links: Object.fromEntries(props.element.links.map(link => [link.linkId, {
        codename: link.codename,
        type: link.type,
        url_slug: link.urlSlug
      }])),
      modular_content: props.element.linkedItemCodenames
    })

    const link = (domNode: IDomNode): JSX.Element => {
      if (domNode.type === 'tag') {

        // TODO Recursion vs. cycle
        const childElements = domNode.children.map(node => link(node));

        // Resolution
        if (isLinkedItem(domNode)) {
          const itemCode = domNode.attributes['data-codename'];
          // TODO Provide a way to get the item by default
          const linkedItem = props.element.linkedItems.find(item => item.system.codename === itemCode);

          switch (linkedItem?.system.type) {
            case 'tweet': {
              // TODO test out external call
              let tweetLink = linkedItem?.elements.tweetLink.value;
              let tweetID = tweetLink.match('^.*twitter.com/.*/(\\d+)/?.*$')[1];

              let selectedTheme = linkedItem?.elements.theme.value[0].codename;
              selectedTheme = selectedTheme ? selectedTheme : 'light';

              setTimeout(() => {
                window.twttr.widgets.createTweet(
                  tweetID,
                  document.getElementById(`tweet${tweetID}`),
                  {
                    theme: selectedTheme,
                  }
                );
              }, 100);
              return <div key={crypto.randomUUID().toString()} style={{ backgroundColor: 'red' }} id={`tweet${tweetID}`}>TWEET {tweetID}</div>;
            }
            case 'hosted_video': {
              if (
                linkedItem?.elements.videoHost.value.find(
                  (item: ElementModels.MultipleChoiceOption) =>
                    item.codename === 'vimeo'
                )
              ) {
                return (
                  <iframe
                    key={crypto.randomUUID().toString()}
                    className="hosted-video__wrapper"
                    src={`https://player.vimeo.com/video/${linkedItem.elements.videoId.value}?title=0&byline=0&portrait=0`}
                    width="640"
                    height="360"
                    frameBorder="0"
                    allowFullScreen
                    title={`Vimeo video ${linkedItem.elements.videoId.value}`}
                  ></iframe>
                );
              } else if (
                linkedItem?.elements.videoHost.value.find(
                  (item: ElementModels.MultipleChoiceOption) =>
                    item.codename === 'youtube'
                )
              ) {
                return (
                  <iframe
                    key={crypto.randomUUID().toString()}
                    className="hosted-video__wrapper"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${linkedItem.elements.videoId.value}`}
                    frameBorder="0"
                    allowFullScreen
                    title={`Youtube video ${linkedItem.elements.videoId.value}`}
                  ></iframe>
                );
              } else {
                return <div key={crypto.randomUUID().toString()}>Content item not supported</div>;
              }
            }
            default:
              return <div key={crypto.randomUUID().toString()}>Content item not supported</div>;
          }
        }

        // TODO For non-pair element like <br/> to avoid error
        const children = childElements.length === 0 ? undefined : childElements;

        // Fallback without resolution
        // TODO think of the key resolution
        const attributes = { ...domNode.attributes, key: crypto.randomUUID().toString() };
        const element = React.createElement(domNode.tagName, attributes, children);
        console.log(element);

        return element;
      }

      if (domNode.type === 'text') {
        // TODO - is there other way that using pseudo element?
        return <span key={crypto.randomUUID().toString()}>{domNode.content}</span>
      }

      throw new Error("Undefined state")
    }

    // TODO keys
    const result = parseResult.childNodes.map(link);
    setRichTextContent(result);
  }, [props.element]);

  return (
    <div className={props.className}>
      {richTextContent}
    </div>
  );
};

export default RichText;
