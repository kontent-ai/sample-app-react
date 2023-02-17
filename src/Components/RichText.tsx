import React, { useState } from 'react';
import {
  ElementModels,
  Elements,
} from '@kontent-ai/delivery-sdk';
import { RichTextBrowserParser, IDomNode, isText, isUnPairedElement, isLinkedItem } from '@pokornyd/kontent-ai-rich-text-parser';
import { useEffect } from 'react';

interface RichTextProps {
  element: Elements.RichTextElement;
  className?: string;
}

const RichText: React.FC<RichTextProps> = (props) => {
  const [richTextContent, setRichTextContent] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    const parser = new RichTextBrowserParser();
    const parseResult = parser.parse(props.element.value);

    const link = (domNode: IDomNode, index: number): JSX.Element => {
      if (domNode.type === 'tag') {

        const childElements = domNode.children.map(node => link(node, index));

        // Resolution
        if (isLinkedItem(domNode)) {
          const itemCode = domNode.attributes['data-codename'];
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
              return <div key={index} style={{ backgroundColor: 'red' }} id={`tweet${tweetID}`}>TWEET {tweetID}</div>;
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
                    key={index}
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
                    key={index}
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
                return <div key={index}>Content item not supported</div>;
              }
            }
            default:
              return <div key={index}>Content item not supported</div>;
          }
        }

        const attributes = { ...domNode.attributes, key: index };

        if(isUnPairedElement(domNode)) {
          return React.createElement(domNode.tagName, attributes);
        }

        // Fallback without resolution       
        const element = React.createElement(domNode.tagName, attributes, childElements);
        console.log(element);

        return element;
      }

      if (isText(domNode)) {
        return <span key={index}>{domNode.content}</span>
      }

      throw new Error("Undefined state")
    }

    const result = parseResult.children.map((node, index) => link(node, index));
    setRichTextContent(result);
  }, [props.element]);

  return (
    <div className={props.className}>
      {richTextContent}
    </div>
  );
};

export default RichText;
