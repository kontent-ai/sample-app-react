import {
  DomElementOptionsType,
  ResolversType,
  RichTextElement,
} from '@kontent-ai/react-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';
import {
  ElementModels,
  Elements,
  IContentItem,
  ILink,
  IRichTextImage,
} from '@kontent-ai/delivery-sdk';
import { RichTextResolver } from 'kontent-rich-text-to-json-converter';
import { IOutputResult } from 'kontent-rich-text-to-json-converter/src/IResolver';
import { useEffect } from 'react';
import { IDomNode } from 'kontent-rich-text-to-json-converter/src/IDomNode';

interface RichTextProps {
  element: Elements.RichTextElement;
  className?: string;
}

const RichText: React.FC<RichTextProps> = (props) => {

  const [richText, setRichText] = useState<IOutputResult<JSX.Element | string> | null>(null);
  const [richTextResolved, setRichTextResolved] = useState<JSX.Element | null>(null);

  // useEffect(() => {
  //   const resolver = new RichTextResolver();
  //   resolver.resolveAsync({
  //     value: "",
  //     images: {},
  //     links: {},
  //     modular_content: []
  //   }).then(result => {
  //     const link = (domNode: IDomNode): any => {
  //       if (domNode.type === 'tag') {
  //         // There could be any resolution
  //         return domNode.children.map(child => link(child));
  //       }
  //       else if (domNode.type === 'text') {
  //         {
  //           // There could be any resolution
  //         }
  //       }
  //       result.childrenNodes.map(child => link(child));

  //     }
  //   });
  // }, [props.element])

  useEffect(() => {
    const resolver = new RichTextResolver<JSX.Element | string>();

    resolver.resolveAsync({
      value: "",
      images: {},
      links: {},
      modular_content: []
    }).then(result => {

      const link = (domNode: IDomNode): any => {
        if (domNode.type === 'tag') {
          // </p>
          return domNode.children.map(child => link(child));
        }
        else if (domNode.type === 'text') {

        }
      }
      result.childrenNodes.map(child => link(child));
    });

    resolver.resolveAsync({
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
    }, {}
      // {
      //   resolveDomNode: ((domNode) => {
      //     let resolvedNode: JSX.Element | string | null = null;
      //     switch (domNode.type) {
      //       case 'tag':
      //         resolvedNode = React.createElement(domNode.tagName, { ...domNode.attributes })
      //         break;
      //       case 'text':
      //         resolvedNode = domNode.content
      //         break
      //       default:
      //         break;
      //     }
      //     if (resolvedNode !== null) {
      //       return Promise.resolve(resolvedNode);
      //     }
      //     else {
      //       return Promise.reject()
      //     }
      //   })
      // }
    )
      .then((value) => {
        debugger;
        setRichText(value);

        const link = (domNode: IDomNode): JSX.Element => {
          if (domNode.type === 'tag') {
            // TODO "key properies"
            const childElements = domNode.children.map(node => link(node));
            // TODO For non-pair element like <br/> to avoid error
            const children = childElements.length === 0 ? undefined : childElements;

            // It is possible to make the resolution here
            const element = React.createElement(domNode.tagName, { ...domNode.attributes }, children);
            return element;
          }

          if (domNode.type === 'text') {
            // TODO - is there other way that using pseudo element?
            return <>{domNode.content}</>
          }

          throw new Error("Undefined state")
        }

        const element = React.createElement("div", undefined, value.childrenNodes.map(link));
        setRichTextResolved(element);

      });
  }, [props.element]);





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
      <div><pre>{JSON.stringify(richText, undefined, 2)}</pre></div>
      {richTextResolved}
      <RichTextElement richTextElement={props.element} resolvers={resolvers} />
    </div>
  );
};

export default RichText;
