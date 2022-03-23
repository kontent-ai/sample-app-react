import { RichTextElement } from '@simply007org/kontent-react-components/dist/components/rich-text-element';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { resolveContentLink } from '../Utilities/ContentLinks';
import { getLanguageCode } from '../Utilities/LanguageCodes';

const RichText = props => {

  return (
    <RichTextElement
      richTextElement={props.element}
      className={props.className}
      resolveLinkedItem={(linkedItem, _domNode, _domToReact) => {
        const contentItemType = linkedItem ? linkedItem.system.type : '';

        switch (contentItemType) {
          case 'tweet': {
            let tweetLink = linkedItem.elements.tweetLink.value;
            let tweetID = tweetLink.match('^.*twitter.com/.*/(\\d+)/?.*$')[1];

            let selectedTheme = linkedItem.elements.theme.value[0].codename;
            selectedTheme = selectedTheme ? selectedTheme : 'light';

            setTimeout(
              () => {
                window.twttr.widgets.createTweet(
                  tweetID,
                  document.getElementById(`tweet${tweetID}`),
                  {
                    theme: selectedTheme
                  }
                );
              },
              100
            )

            return (
              <div id={`tweet${tweetID}`}>
              </div>
            );
          }
          case 'hosted_video': {
            if (linkedItem.elements.videoHost.value.find(item => item.codename === 'vimeo')) {
              return (
                <iframe className="hosted-video__wrapper"
                  src={`https://player.vimeo.com/video/${linkedItem.elements.videoId.value}?title=0&byline=0&portrait=0`}
                  width="640"
                  height="360"
                  frameBorder="0"
                  webkitAllowFullScreen
                  mozAllowFullScreen
                  allowFullScreen
                  title={`Vimeo video ${linkedItem.elements.videoId.value}`}
                >
                </iframe>
              )
            } else if (
              linkedItem.elements.videoHost.value.find(item => item.codename === 'youtube')
            ) {
              return (
                <iframe className="hosted-video__wrapper"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${linkedItem.elements.videoId.value}`}
                  frameBorder="0"
                  allowFullScreen
                  title={`Youtube video ${linkedItem.elements.videoId.value}`}
                >
                </iframe>);
            } else {
              return <div>Content item not supported</div>;
            }
          }
          default:
            return <div>Content item not supported</div>;
        }
      }

      }
      resolveLink={(link, domNode, domToReact) => {
        const path = resolveContentLink(link);
        const language = getLanguageCode(props.match).toLowerCase();
        return (
          <Link to={`/${language}${path}`}>
            {domToReact(domNode.children)}
          </Link>
        );
      }}
      resolveImage={(image, _domNode, _domToReact) => {
        <img
          class="xImage"
          src={`${image.url}`}
          alt={`${image.description || `image with id: ${image.imageId}`}`}
        />
      }}
    />);
}

export default withRouter(RichText);
