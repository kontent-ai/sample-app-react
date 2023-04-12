import React from 'react';
import {
  ElementModels,
  Elements,
} from '@kontent-ai/delivery-sdk';
import { PortableText, PortableTextReactComponents, toPlainText } from '@portabletext/react';
import { browserParse, nodeParse, resolveTable, transform } from '@pokornyd/kontent-ai-rich-text-parser';

interface RichTextProps {
  element: Elements.RichTextElement;
  className?: string;
}

const RichText: React.FC<RichTextProps> = (props) => {

  const portableTextComponents: Partial<PortableTextReactComponents> = {
    types: {
      component: (block) => {
        const linkedItem = props.element.linkedItems.find(item => item.system.codename === block.value.component._ref);
        const contentItemType = linkedItem ? linkedItem.system.type : '';

        switch (contentItemType) {
          case 'tweet': {
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

            return <div id={`tweet${tweetID}`}></div>;
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
              return <div>Content item not supported</div>;
            }
          }
          default:
            return <div>Content item not supported</div>;
        }
      },
      table: ({ value }) => {
        const tableString = resolveTable(value, toPlainText);
        return <>{tableString}</>;
      }
    },
    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
          <a href={value?.href} target={target} rel={value?.rel} title={value?.title} data-new-window={value['data-new-window']}>
            {children}
          </a>
        )
      },
      internalLink: ({ value, children }) => {
        const item = props.element.linkedItems.find(item => item.system.id === value.reference._ref);
        return (
          <a href={"https://somerandomwebsite.xyz/" + item?.system.codename}>
            {children}
          </a>
        )
      }
    }
  }

  const parsedTree = browserParse(props.element.value);
  const nodeParsedTree = nodeParse(props.element.value);
  const portableText = transform(parsedTree);
  const transformedNodeParsedTree = transform(nodeParsedTree);

  return (
    <div className={props.className}>
      <PortableText value={portableText} components={portableTextComponents} />
      
      <h4>parsedTree - Browser</h4>
      <details>
        <pre>{JSON.stringify(parsedTree, undefined, 2)}</pre>
      </details>

      <h4>parsedTree - Node</h4>
      <details>
        <pre>{JSON.stringify(nodeParsedTree, undefined, 2)}</pre>
      </details>

      <h4>portable text from browser parser</h4>
      <details>
        <pre>{JSON.stringify(portableText, undefined, 2)}</pre>
      </details>

      <h4>portable text from Node parser</h4>
      <details>
        <pre>{JSON.stringify(transformedNodeParsedTree, undefined, 2)}</pre>
      </details>
    </div>
  );
};

export default RichText;
