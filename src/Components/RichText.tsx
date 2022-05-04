import {
  DomElementOptionsType,
  ResolversType,
  RichTextElement,
} from '@simply007org/kontent-react-components/dist/components/rich-text-element';
import React from 'react';
import { Link } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';
import {
  ElementModels,
  Elements,
  IContentItem,
  ILink,
  IRichTextImage,
} from '@kentico/kontent-delivery';

interface RichTextProps {
  element: Elements.RichTextElement;
  className?: string;
}

const RichText: React.FC<RichTextProps> = (props) => {
  const resolvers: ResolversType = {
    resolveLinkedItem: (
      linkedItem: IContentItem | undefined,
      domOptions: DomElementOptionsType
    ) => {
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
    resolveLink: (link: ILink, domOptions: DomElementOptionsType) => {
      const path = resolveContentLink(link);

      return (
        <Link to={path}>
          {domOptions.domToReact(domOptions.domElement.children)}
        </Link>
      );
    },
    resolveImage: (
      image: IRichTextImage,
      domOptions: DomElementOptionsType
    ) => {
      return (
        <img
          className="xImage"
          src={`${image.url}`}
          alt={`${image.description || `image with id: ${image.imageId}`}`}
        />
      );
    },
    resolveDomNode: undefined,
  };

  return (
    <div className={props.className}>
      <RichTextElement richTextElement={props.element} resolvers={resolvers} />
    </div>
  );
};

export default RichText;
